from flask import Flask
from flask import jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import sqlite3

DB_FILE = "./db/dev.db"
db_url = "sqlite:///dev/dev.db"

app = Flask(__name__)
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

@app.route('/users/<id>')
def get_user(id):
    status = 200
    
    with engine.connect() as connection:
        result = connection.execute("""
        """)

    error = {'error': 'no data found'}

    data = {
        'id': id
    }

    if not len(data):
        status = 404
        return jsonify(error), status

    return jsonify(data), status


@app.route('/users/<id>', methods=['PUT'])
def update_user(id, points, words, longestWord, tiles_cleared, badges):
    status = 202
    
    with engine.connect() as connection:
        result = connection.execute("""
        """)


@app.route('/users/new', methods=['POST'])
def new_user(user_name, email, password):
    status = 202
    
    with engine.connect() as connection:
        result = connection.execute("""
        """)


engine.dispose()