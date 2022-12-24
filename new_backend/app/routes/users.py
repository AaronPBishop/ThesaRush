from flask import Blueprint, request

from app.models import User, Trophy, db

bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route('/<id>', methods=['GET'])
def fetch_user_data(id):
    queried_user = User.query.get_or_404(id)

    return queried_user.to_dict()


@bp.route('/<id>', methods=['PUT'])
def update_user_data(id):
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

    if queried_user.bombardier >= 50 and queried_user.has_trophy('Master Blaster') == False:
        new_trophy = Trophy(
            trophy_name='Master Blaster',
            user_id=queried_user.id
        )

        queried_user.points += 5000
        queried_user.points_balance += 5000

        db.session.add(new_trophy)

    if queried_user.stone_crusher >= 50 and queried_user.has_trophy('Obelisk Oracle') == False:
        new_trophy = Trophy(
            trophy_name='Obelisk Oracle',
            user_id=queried_user.id
        )

        queried_user.points += 5000
        queried_user.points_balance += 5000

        db.session.add(new_trophy)

    if queried_user.gold_miner >= 50 and queried_user.has_trophy('King Midas') == False:
        new_trophy = Trophy(
            trophy_name='King Midas',
            user_id=queried_user.id
        )

        queried_user.points += 5000
        queried_user.points_balance += 5000

        db.session.add(new_trophy)

    if queried_user.void_master >= 50 and queried_user.has_trophy('Antimatter Virtuoso') == False:
        new_trophy = Trophy(
            trophy_name='Antimatter Virtuoso',
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
        users[user.id] = user.to_safe_dict()

    return users


@bp.route('/new', methods=['POST'])
def create_new_user():
    req_data = request.json

    users = User.query.all()
    for user in users:
        if user.user_email == req_data['email']:
            return {'error': 'This email already exists', 'status': 400}, 400
        if user.user_name == req_data['user_name']:
            return {'error': 'This username is taken', 'status': 400}, 400

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
        'status': 200
    }

    return res_data


@bp.route('/login', methods=['POST'])
def login_user():
    req_data = request.json
    
    email = req_data['email']
    password = req_data['password']
    
    users = User.query.all()
    for user in users:
        if user.user_email == email:
            if user.user_password == password:
                return {'id': user.id, 'status': 200}, 200
            else:
                if password != user.user_password:
                    return {'error': 'Incorrect password', 'status': 400}, 400


@bp.route('/rankings', methods=['GET'])
def fetch_ranking_data():
    users = User.query.all()

    rankings = {}
    for user in users:
        rankings[user.high_score] = [user.user_name, user.id]
   
    return rankings


@bp.route('/lives/<id>', methods=['PUT'])
def add_life(id):
    queried_user = User.query.get_or_404(id)

    if queried_user.points_balance < 1000:
        return {'error': 'Not enough points', 'status': 400}, 400

    if queried_user.points_balance >= 1000:
        queried_user.points_balance -= 1000
        queried_user.lives += 1

    db.session.commit()
    
    return {'points_balance': queried_user.points_balance, 'lives': queried_user.lives}, 201


@bp.route('/lives/use/<id>', methods=['PUT'])
def use_life(id):
    queried_user = User.query.get_or_404(id)

    queried_user.lives -= 1

    db.session.commit()
    
    return {'points_balance': queried_user.points_balance, 'lives': queried_user.lives}, 201