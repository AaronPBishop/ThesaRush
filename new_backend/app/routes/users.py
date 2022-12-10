from flask import Blueprint, request, jsonify

from app.models import User, db

bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route('/<id>', methods=['GET'])
def fetch_user_data(id):
    queried_user = User.query.get_or_404(id)

    res_data = {
        'user_id': queried_user.id,
        'user_name': queried_user.user_name,
        'points': queried_user.points,
        'points_balance': queried_user.points_balance,
        'words': queried_user.words,
        'longest_word': queried_user.longest_word,
        'tiles_cleared': queried_user.tiles_cleared,
        'badges': queried_user.badges,
        'lives': queried_user.lives
    }
    
    return jsonify(res_data)


@bp.route('/<id>', methods=['PUT'])
def update_user_scores(id):
    req_data = request.json
    print(req_data)
    queried_user = User.query.get_or_404(id)

    queried_user.points += req_data['points']
    queried_user.words += req_data['words']
    if len(req_data['longest_word']) > len(queried_user.longest_word):
        queried_user.longest_word = req_data['longest_word']
    queried_user.tiles_cleared += req_data['tiles_cleared']
    queried_user.badges += req_data['badges']

    db.session.commit()

    res_data = {
        'points': queried_user.points,
        'words': queried_user.words,
        'longest_word': queried_user.longest_word,
        'tiles_cleared': queried_user.tiles_cleared,
        'badges': queried_user.badges,
    }
    
    return jsonify(res_data)


@bp.route('/new', methods=['POST'])
def create_new_user():
    req_data = request.json
    status = 202

    new_user = User()

    new_user.user_name = req_data['user_name']
    new_user.user_email = req_data['email']
    new_user.user_password = req_data['password']

    db.session.add(new_user)
    db.session.commit()

    res_data = {
        'id': new_user.id,
        'status': status
    }

    return jsonify(res_data)


@bp.route('/login', methods=['POST'])
def login_user():
    req_data = request.json
    status = 200

    email = req_data['email']
    password = req_data['password']
    
    users = User.query.all()
    for user in users:
        if user.user_email == email:
            if password == user.user_password:
                res_data = {
                    'id': user.id,
                    'status': status
                }

                return jsonify(res_data)
            else:
                if password != user.user_password:
                    status = 404
                    return jsonify(status)