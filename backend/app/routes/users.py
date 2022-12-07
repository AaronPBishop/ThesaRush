from flask import Blueprint, jsonify

bp = Blueprint("users", __name__, url_prefix="/users")

from app import app, db
from app.models import User

@bp.route('/<id>', methods=['GET'])
def get_user(id):
    status = 200
    
    with app.app_context():
        user_query = User.query.get_or_404(id)
        
        return jsonify(user_query), status


@bp.route('/<id>', methods=['PUT'])
def update_user(id, points, words, longest_word, tiles_cleared, badges):
    status = 202
    
    with app.app_context():
        user_query = User.query.get_or_404(id)

        user_query.points = points
        user_query.words = words
        user_query.longest_word = longest_word
        user_query.tiles_cleared = tiles_cleared
        user_query.badges = badges
        
        return jsonify(user_query), status


@bp.route('/new', methods=['POST'])
def new_user(user_name, email, password):
    status = 202
    
    with app.app_context():
        new_user = User(
            name=user_name,
            user_email=email,
            user_password = password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user, status)