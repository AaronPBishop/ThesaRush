from flask import Blueprint, request, jsonify

from app.models import User, db

bp = Blueprint("users", __name__, url_prefix="/users")

@bp.route('/<email>/<password>', methods=['GET'])
def login_user(email, password):
    status = 200
    
    queried_user = User.query.filter(email=email).filter(password=password).one()
    
    return jsonify(queried_user), status


@bp.route('/<id>', methods=['GET'])
def fetch_user_data(id):
    status = 202
    
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
def create_new_user():
    user_data = request.json
    status = 202

    new_user = User(
        user_name=user_data['user_name'],
        user_email=user_data['email'],
        user_password=user_data['password']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user, status)