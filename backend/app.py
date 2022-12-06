# TO START: pipenv run flask run
from flask import Flask

from routes import users

DB_FILE = "./db/dev.db"

app = Flask(__name__)

app.register_blueprint(users.bp)