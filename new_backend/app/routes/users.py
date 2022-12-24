from flask import Blueprint, request, jsonify

from app.models import User, Trophy, db

bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route('/<id>', methods=['GET'])
def fetch_user_data(id):
    queried_user = User.query.get_or_404(id)

    return queried_user.to_dict()


@bp.route('/<id>', methods=['PUT'])
def update_user_scores(id):
    req_data = request.json
    queried_user = User.query.get_or_404(id)

    if queried_user.high_score < req_data['points']:
        queried_user.high_score = req_data['points']

    queried_user.points_balance += req_data['points']

    if len(req_data['longest_word']) > len(queried_user.longest_word):
        queried_user.longest_word = req_data['longest_word']

    for key, val in req_data.items():
        if key != 'longest_word':
            attr = getattr(queried_user, key)
            setattr(queried_user, key, attr + val)

    if queried_user.bombardier >= 50:
        has_trophy = False
        for trophy in queried_user.trophies:
            curr_trophy = trophy.to_dict()

            if curr_trophy['trophy_name'] == 'Blast Master':
                has_trophy = True
        
        if has_trophy == False:
            new_trophy = Trophy(
                trophy_name='Blast Master',
                user_id=queried_user.id
            )

            queried_user.points += 5000
            queried_user.points_balance += 5000

            db.session.add(new_trophy)

    db.session.commit()
    
    return queried_user.to_dict()


@bp.route('/all', methods=['GET'])
def fetch_all_players():
    queried_users = User.query.all()

    users = {}
    for user in queried_users:
        users[user.id] = user.to_dict()

    return jsonify(users)


@bp.route('/new', methods=['POST'])
def create_new_user():
    req_data = request.json
    status = 202

    users = User.query.all()
    for user in users:
        if user.user_email == req_data['email']:
            return jsonify({'error': 'This email already exists', 'status': 400}), 400
        if user.user_name == req_data['user_name']:
            return jsonify({'error': 'This username is taken', 'status': 400}), 400

    new_user = User(
        user_name = req_data['user_name'],
        user_email = req_data['email'],
        user_password = req_data['password'],
        high_score = 0,
        points = 0,
        points_balance = 0,
        words = 0,
        longest_word = '',
        tiles_cleared = 0,
        lives = 1,
        bombardier = 0,
        stone_crusher = 0,
        gold_miner = 0,
        word_smith = 0,
        void_master = 0
    )

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
            if user.user_password == password:
                res_data = {
                    'id': user.id,
                    'status': status
                }

                return jsonify(res_data)
            else:
                if password != user.user_password:
                    status = 404
                    return jsonify(status)


@bp.route('/rankings', methods=['GET'])
def fetch_ranking_data():
    users = User.query.all()

    rankings = {}
    for user in users:
        rankings[user.high_score] = [user.user_name, user.id]
   
    return jsonify(rankings)


@bp.route('/lives/<id>', methods=['PUT'])
def add_life(id):
    queried_user = User.query.get_or_404(id)

    if queried_user.points_balance < 1000:
        return jsonify({'error': 'Not enough points', 'status': 400}), 400

    if queried_user.points_balance >= 1000:
        queried_user.points_balance -= 1000
        queried_user.lives += 1

    db.session.commit()

    res_data = {
        'points_balance': queried_user.points_balance,
        'lives': queried_user.lives
    }
    
    return jsonify(res_data)


@bp.route('/lives/use/<id>', methods=['PUT'])
def use_life(id):
    queried_user = User.query.get_or_404(id)

    queried_user.lives -= 1

    db.session.commit()

    res_data = {
        'points_balance': queried_user.points_balance,
        'lives': queried_user.lives
    }
    
    return jsonify(res_data)