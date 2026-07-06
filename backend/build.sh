#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files for Django Admin
python manage.py collectstatic --noinput

# Run migrations to update SQLite/PostgreSQL schemas
python manage.py migrate
