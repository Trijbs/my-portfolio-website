import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const sourceDir = path.join(publicDir, 'img');
const outputDir = path.join(publicDir, 'media');
const htmlEntryPath = path.join(publicDir, 'index.html');
const projectDetailsPath = path.join(publicDir, 'data', 'project-details.json');

const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const detailImageWidths = [768, 1280, 1600];
const checkMode = process.argv.includes('--check');

function normalizeSlashes(value) {
  return value.split(path.sep).join('/');
}

function getOriginalFormat(extension) {
  return extension === '.jpeg' ? 'jpg' : extension.slice(1);
}

function getOutputPath(relativePath, width, format) {
  const parsed = path.parse(relativePath);
  const filename = `${parsed.name}-${width}.${format}`;
  return path.join(outputDir, parsed.dir, filename);
}

async function walkDirectory(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return walkDirectory(entryPath);
    }
    return entryPath;
  }));

  return files.flat();
}

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

function getCandidateWidths(sourceWidth, preferredWidths) {
  const widths = Array.isArray(preferredWidths) ? [...preferredWidths] : [];
  const numericWidth = Number(sourceWidth);

  if (Number.isFinite(numericWidth) && numericWidth > 0) {
    const filteredWidths = widths.filter(width => width <= numericWidth);
    if (!filteredWidths.includes(numericWidth)) {
      filteredWidths.push(numericWidth);
    }
    return Array.from(new Set(filteredWidths)).sort((left, right) => left - right);
  }

  return Array.from(new Set(widths)).sort((left, right) => left - right);
}

function addWidths(targetMap, relativePath, widths) {
  if (!relativePath || !Array.isArray(widths) || !widths.length) {
    return;
  }

  const resolvedWidths = targetMap.get(relativePath) ?? new Set();
  widths.forEach(width => {
    const numericWidth = Number(width);
    if (Number.isFinite(numericWidth) && numericWidth > 0) {
      resolvedWidths.add(numericWidth);
    }
  });
  targetMap.set(relativePath, resolvedWidths);
}

function toSourceRelativePath(assetPath) {
  if (!assetPath || typeof assetPath !== 'string') {
    return null;
  }

  const normalizedPath = assetPath.replace(/^\/+/, '');
  if (!normalizedPath.startsWith('img/')) {
    return null;
  }

  return normalizedSlashes(normalizedPath.slice(4));
}

function normalizedSlashes(value) {
  return normalizeSlashes(value);
}

function mergeRequirementMaps(...maps) {
  const merged = new Map();

  maps.forEach(requirementMap => {
    requirementMap.forEach((widths, relativePath) => {
      addWidths(merged, relativePath, Array.from(widths));
    });
  });

  return merged;
}

async function buildSourceIndex() {
  const files = await walkDirectory(sourceDir);
  const imageFiles = files
    .filter(file => supportedExtensions.has(path.extname(file).toLowerCase()))
    .sort();

  if (!imageFiles.length) {
    throw new Error(`No source images found in ${sourceDir}`);
  }

  const sourceByBasePath = new Map();
  imageFiles.forEach(file => {
    const relativePath = normalizeSlashes(path.relative(sourceDir, file));
    const parsed = path.parse(relativePath);
    const basePath = normalizeSlashes(path.join(parsed.dir, parsed.name));

    if (sourceByBasePath.has(basePath)) {
      throw new Error(`Duplicate source basename detected for ${basePath}`);
    }

    sourceByBasePath.set(basePath, relativePath);
  });

  return sourceByBasePath;
}

async function collectHtmlRequirements(sourceIndex) {
  const html = await fs.readFile(htmlEntryPath, 'utf8');
  const mediaRequirementPattern = /\/?media\/([^"'()\s,]+)-(\d+)\.(?:avif|webp|png|jpg)\b/g;
  const requirements = new Map();
  let match;

  while ((match = mediaRequirementPattern.exec(html)) !== null) {
    const basePath = match[1];
    const width = Number(match[2]);
    const sourceRelativePath = sourceIndex.get(basePath);

    if (!sourceRelativePath) {
      throw new Error(`Unable to resolve HTML media reference: media/${basePath}-${width}`);
    }

    addWidths(requirements, sourceRelativePath, [width]);
  }

  return requirements;
}

function collectProjectItemRequirements(requirements, item) {
  if (!item || typeof item !== 'object') {
    return;
  }

  if (item.type === 'image') {
    const sourceRelativePath = toSourceRelativePath(item.src);
    if (sourceRelativePath) {
      addWidths(requirements, sourceRelativePath, getCandidateWidths(item.width, detailImageWidths));
    }
  }

  const posterRelativePath = toSourceRelativePath(item.poster);
  if (posterRelativePath) {
    addWidths(requirements, posterRelativePath, getCandidateWidths(item.posterWidth, detailImageWidths));
  }
}

async function collectProjectDetailRequirements() {
  const rawPayload = await fs.readFile(projectDetailsPath, 'utf8');
  const payload = JSON.parse(rawPayload);
  if (!Array.isArray(payload)) {
    throw new Error('Project details payload is invalid.');
  }

  const requirements = new Map();

  payload.forEach(project => {
    if (Array.isArray(project?.media)) {
      project.media.forEach(item => collectProjectItemRequirements(requirements, item));
    }

    if (Array.isArray(project?.collections)) {
      project.collections.forEach(collection => {
        if (Array.isArray(collection?.media)) {
          collection.media.forEach(item => collectProjectItemRequirements(requirements, item));
        }
      });
    }
  });

  return requirements;
}

async function writeVariant(inputFile, width, format, destinationFile) {
  const image = sharp(inputFile).rotate().resize({
    width,
    withoutEnlargement: true
  });

  switch (format) {
    case 'avif':
      await image.avif({ quality: 52, effort: 7 }).toFile(destinationFile);
      return;
    case 'webp':
      await image.webp({ quality: 74, effort: 6 }).toFile(destinationFile);
      return;
    case 'png':
      await image.png({
        compressionLevel: 9,
        effort: 10,
        palette: true
      }).toFile(destinationFile);
      return;
    case 'jpg':
      await image.jpeg({ quality: 78, mozjpeg: true }).toFile(destinationFile);
      return;
    default:
      throw new Error(`Unsupported output format: ${format}`);
  }
}

async function buildVariants(relativePath, widths) {
  const inputFile = path.join(sourceDir, relativePath);
  const extension = path.extname(relativePath).toLowerCase();
  const originalFormat = getOriginalFormat(extension);
  const formats = Array.from(new Set(['avif', 'webp', originalFormat]));
  const metadata = await sharp(inputFile).metadata();
  const sourceWidth = Number(metadata.width);
  const sortedWidths = Array.from(widths).sort((left, right) => left - right);
  const outputs = [];

  if (!sortedWidths.length) {
    return outputs;
  }

  if (Number.isFinite(sourceWidth) && sourceWidth > 0) {
    const invalidWidth = sortedWidths.find(width => width > sourceWidth);
    if (invalidWidth) {
      throw new Error(`Referenced width ${invalidWidth} exceeds source width ${sourceWidth} for ${relativePath}`);
    }
  }

  await Promise.all(sortedWidths.flatMap(width => formats.map(async format => {
    const outputPath = getOutputPath(relativePath, width, format);
    outputs.push(outputPath);

    if (checkMode) {
      try {
        await fs.access(outputPath);
      } catch {
        throw new Error(`Missing media variant: ${normalizeSlashes(path.relative(rootDir, outputPath))}`);
      }
      return;
    }

    await ensureDirectory(outputPath);
    await writeVariant(inputFile, width, format, outputPath);
  })));

  return outputs;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function runWorker() {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      results[index] = await worker(items[index]);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
  return results;
}

async function main() {
  const sourceIndex = await buildSourceIndex();
  const htmlRequirements = await collectHtmlRequirements(sourceIndex);
  const projectDetailRequirements = await collectProjectDetailRequirements();
  const requiredByImage = mergeRequirementMaps(htmlRequirements, projectDetailRequirements);
  const referencedImages = Array.from(requiredByImage.entries())
    .map(([relativePath, widths]) => [relativePath, Array.from(widths).sort((left, right) => left - right)])
    .sort(([left], [right]) => left.localeCompare(right));

  if (!referencedImages.length) {
    throw new Error('No referenced media requirements found.');
  }

  if (!checkMode) {
    await fs.rm(outputDir, { recursive: true, force: true });
  }

  const outputGroups = await mapWithConcurrency(referencedImages, 6, ([relativePath, widths]) =>
    buildVariants(relativePath, widths)
  );
  const variantCount = outputGroups.reduce((sum, outputs) => sum + outputs.length, 0);
  const modeLabel = checkMode ? 'verified' : 'generated';

  console.log(`${modeLabel} ${variantCount} media variants from ${referencedImages.length} referenced source images`);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
