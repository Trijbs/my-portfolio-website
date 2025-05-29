import os
import json
import sqlite3
from datetime import datetime
from flask import Flask, request, jsonify, render_template, send_from_directory

# Initialize Flask app
app = Flask(__name__, static_folder='../static', template_folder='../templates')

# Database setup
DB_PATH = os.path.join(os.path.dirname(__file__), 'portfolio.db')

def init_db():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create contact messages table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create newsletter subscribers table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Routes
@app.route('/')
def index():
    """Serve the main index.html file"""
    return send_from_directory('../', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('../', path)

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    data = request.json
    
    # Validate required fields
    if not all(key in data for key in ['name', 'email', 'message']):
        return jsonify({'success': False, 'error': 'Missing required fields'}), 400
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
            (data['name'], data['email'], data['message'])
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Your message has been sent successfully!'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/newsletter', methods=['POST'])
def newsletter():
    """Handle newsletter subscriptions"""
    data = request.json
    
    # Validate required fields
    if 'email' not in data:
        return jsonify({'success': False, 'error': 'Email is required'}), 400
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if email already exists
        cursor.execute('SELECT email FROM newsletter_subscribers WHERE email = ?', (data['email'],))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'error': 'Email already subscribed'}), 409
        
        # Add new subscriber
        cursor.execute(
            'INSERT INTO newsletter_subscribers (email) VALUES (?)',
            (data['email'],)
        )
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Thank you for subscribing to our newsletter!'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/admin/messages', methods=['GET'])
def get_messages():
    """Admin endpoint to retrieve contact messages"""
    # In a real app, this would require authentication
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM contact_messages ORDER BY created_at DESC')
        messages = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({'success': True, 'messages': messages}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/admin/subscribers', methods=['GET'])
def get_subscribers():
    """Admin endpoint to retrieve newsletter subscribers"""
    # In a real app, this would require authentication
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC')
        subscribers = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({'success': True, 'subscribers': subscribers}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
