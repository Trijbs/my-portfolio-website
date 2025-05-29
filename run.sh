#!/bin/bash

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install required packages
pip install flask gunicorn

# Create requirements.txt
pip freeze > requirements.txt

# Initialize database
python -c "from backend.app import init_db; init_db()"

# Run the Flask application
cd /home/ubuntu/website
export FLASK_APP=backend/app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
