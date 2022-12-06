from flask import Blueprint, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

bp = Blueprint('users', __name__, url_prefix='/users')

db_url = "sqlite:///dev/dev.db"

engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

@bp.route('/<id>', methods=['GET'])
def get_user(id):
    status = 200
    
    # with engine.connect() as connection:
    #     result = connection.execute("""
    #     """)

    error = {'error': 'no data found'}

    data = {
        'id': id
    }

    if not len(data):
        status = 404
        return jsonify(error), status

    return jsonify(data), status


@bp.route('/<id>', methods=['PUT'])
def update_user(id, points, words, longestWord, tiles_cleared, badges):
    status = 202
    
    with engine.connect() as connection:
        result = connection.execute("""
        """)
    
    data = {
        'id': id
    }

    return jsonify(data), status


@bp.route('/new', methods=['POST'])
def new_user(user_name, email, password):
    status = 202
    
    with engine.connect() as connection:
        result = connection.execute("""
        """)

    return status


engine.dispose()