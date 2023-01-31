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
        'bombardier': ['Master Blaster', 4000],
        'stone_crusher': ['Obelisk Oracle', 3000],
        'gold_miner': ['Treasure Tactician', 3000],
        'word_smith': ['Alphabet Architect', 8000],
        'void_master': ['Antimatter Maestro', 4000],
        'wins': ['Vengeant Vanquisher', 9000]
    }

    for key, val in trophies.items():
        attr = getattr(queried_user, key)

        if attr >= 50 and queried_user.has_trophy(val[0]) == False:
            new_trophy = Trophy(
                trophy_name=val[0],
                user_id=queried_user.id
            )

            queried_user.points += val[1]
            queried_user.points_balance += val[1]
    
            db.session.add(new_trophy)

    queried_user.level = math.floor(queried_user.points / 2000)
    if queried_user.level > 50:
        queried_user.level = 50

    if queried_user.level == 50 and queried_user.has_trophy('Cosmic Intellect') == False:
        new_trophy = Trophy(
            trophy_name='Cosmic Intellect',
            user_id=queried_user.id
        )

        queried_user.points += 10000
        queried_user.points_balance += 10000

        db.session.add(new_trophy)

    db.session.add(queried_user)
    db.session.commit()
    
    return queried_user.to_dict()


@user_routes.route('/<id>', methods=['DELETE'])
def delete_user_data(id):
    queried_user = User.query.get_or_404(id)

    db.session.delete(queried_user)
    db.session.commit()

    return {'status': 200}, 200


@user_routes.route('/edit/<id>', methods=['PUT'])
def edit_account_info(id):
    req_data = request.json

    all_users = User.query.all()
    queried_user = User.query.get_or_404(id)
    
    for user in all_users:
        if user != queried_user:
            for key, val in req_data.items():
                if key != 'password':
                    attr = getattr(user, key).lower()

                    if key == 'user_name' and attr == val.lower():
                        return {'errors': 'This Username is Already Taken'}, 400

                    if key == 'user_email' and attr == val.lower():
                        return {'errors': 'This Email is Already Taken'}, 400

    for key, val in req_data.items():
        if len(val) > 0:
            setattr(queried_user, key, val)

    db.session.commit()
    
    return queried_user.to_dict()


@user_routes.route('/place_league/<id>', methods=['GET'])
def place_user_league(id):
    queried_user = User.query.get_or_404(id)

    leagues = {
        'Bronze': list(range(0, 5)),
        'Silver': list(range(5, 10)),
        'Gold': list(range(10, 15)),
        'Ethereal': list(range(15, 30)),
        'Galaxy': list(range(30, 50)),
        'Cosmic': [50]
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


@user_routes.route('/points/<id>', methods=['PUT'])
def use_points(id):
    req_data = request.json

    queried_user = User.query.get_or_404(id)

    queried_user.points_balance -= req_data['points']

    db.session.commit()
    
    return queried_user.to_dict(), 201


@user_routes.route('/lives/<id>', methods=['PUT'])
def add_life(id):
    queried_user = User.query.get_or_404(id)

    if queried_user.points_balance < 500:
        return {'error': 'Not enough points', 'status': 400}, 400

    if queried_user.points_balance >= 500:
        queried_user.points_balance -= 500
        queried_user.lives += 1

    db.session.commit()
    
    return {'points_balance': queried_user.points_balance, 'lives': queried_user.lives}, 201


@user_routes.route('/lives/use/<id>', methods=['PUT'])
def use_life(id):
    queried_user = User.query.get_or_404(id)

    queried_user.lives -= 1

    db.session.commit()
    
    return {'points_balance': queried_user.points_balance, 'lives': queried_user.lives}, 201