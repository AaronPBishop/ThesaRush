from flask import Flask
from .config import Configuration
from .models import db
from .routes import users

app = Flask(__name__)

app.config.from_object(Configuration)

app.register_blueprint(users.bp)

db.init_app(app)