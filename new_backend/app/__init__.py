from flask import Flask
from flask_migrate import Migrate

from .routes import users
from .models import db

import os

app = Flask(__name__)

app.config.from_mapping({
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})

app.register_blueprint(users.bp)

db.init_app(app)

Migrate(app, db)