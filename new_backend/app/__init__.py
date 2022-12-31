from flask import Flask
from flask_migrate import Migrate

from .models import db
from .seeds import seed_commands
from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.league_routes import league_routes
from .api.challenge_routes import challenge_routes

import os

app = Flask(__name__, static_url_path='/')

app.config.from_mapping({
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False
})

app.cli.add_command(seed_commands)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(league_routes, url_prefix='/api/leagues')
app.register_blueprint(challenge_routes, url_prefix='/api/challenges')

db.init_app(app)

Migrate(app, db)