from flask import Blueprint, jsonify

from app.models import User, db

bp = Blueprint("users", __name__, url_prefix="/users")

@bp.route('/<id>', methods=['GET'])
def get_user(id):
    status = 200
    
    queried_user = User.query.get_or_404(id)
    
    return jsonify(queried_user), status


@bp.route('/<id>', methods=['PUT'])
def update_user(id, points, words, longest_word, tiles_cleared, badges):
    status = 202
    
    queried_user = User.query.get_or_404(id)

    queried_user.points += points
    queried_user.words += words
    if len(longest_word) > len(queried_user.longest_word):
        queried_user.longest_word = longest_word
    queried_user.tiles_cleared += tiles_cleared
    queried_user.badges += badges
    
    return jsonify(queried_user), status


@bp.route('/new', methods=['POST'])
def new_user(user_name, email, password):
    status = 202
    

    new_user = User(
        name=user_name,
        user_email=email,
        user_password = password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user, status)