from flask import Blueprint, request
import math

from app.models import League, User, Trophy, db

user_routes = Blueprint("users", __name__)


@user_routes.route('/<id>', methods=['GET'])
def fetch_user_data(id):
    queried_user = User.query.get_or_404(id)

    return queried_user.to_dict()


@user_routes.route('/<id>', methods=['PUT'])
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

    trophies = {
        'bombardier': 'Master Blaster',
        'stone_crusher': 'Obelisk Oracle',
        'gold_miner': 'King Midas',
        'void_master': 'Antimatter Virtuoso'
    }

    for key, val in trophies.items():
        attr = getattr(queried_user, key)

        if attr >= 50 and queried_user.has_trophy(val) == False:
            new_trophy = Trophy(
                trophy_name=val,
                user_id=queried_user.id
            )

            queried_user.points += 5000
            queried_user.points_balance += 5000
    
            db.session.add(new_trophy)

    queried_user.level = math.floor(queried_user.points / 1000)
    if queried_user.level > 30:
        queried_user.level = 30

    db.session.add(queried_user)
    db.session.commit()
    
    return queried_user.to_dict()


@user_routes.route('/new', methods=['POST'])
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
        level = 0,
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
        void_master = 0,
        league_name = 'Bronze'
    )

    db.session.add(new_user)
    db.session.commit()

    return {'id': new_user.id, 'status': 200}, 200


@user_routes.route('/login', methods=['POST'])
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


@user_routes.route('/place_league/<id>', methods=['GET'])
def place_user_league(id):
    queried_user = User.query.get_or_404(id)

    leagues = {
        'Bronze': [0, 1, 2, 3, 4],
        'Silver': [5, 6, 7, 8, 9],
        'Gold': [10, 11, 12, 13, 14],
        'Ethereal': [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        'Galaxy': [30]
    }

    for key, val in leagues.items():
        for num in val:
            if queried_user.level == num:
                queried_league = League.query.get_or_404(key)
                queried_user.league_name = key

                queried_league.ranked_players.append(queried_user)

                db.session.add(queried_user)
                db.session.add(queried_league)

                db.session.commit()

                return queried_user.to_dict()


@user_routes.route('/lives/<id>', methods=['PUT'])
def add_life(id):
    queried_user = User.query.get_or_404(id)

    if queried_user.points_balance < 1000:
        return {'error': 'Not enough points', 'status': 400}, 400

    if queried_user.points_balance >= 1000:
        queried_user.points_balance -= 1000
        queried_user.lives += 1

    db.session.commit()
    
    return {'points_balance': queried_user.points_balance, 'lives': queried_user.lives}, 201


@user_routes.route('/lives/use/<id>', methods=['PUT'])
def use_life(id):
    queried_user = User.query.get_or_404(id)

    queried_user.lives -= 1

    db.session.commit()
    
    return {'points_balance': queried_user.points_balance, 'lives': queried_user.lives}, 201