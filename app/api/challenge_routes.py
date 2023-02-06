from flask import Blueprint, request

from app.models import User, Challenge, db

challenge_routes = Blueprint("challenges", __name__)


@challenge_routes.route('/<id>', methods=['PUT'])
def update_challenge(id):
    req_data = request.json

    queried_challenge = Challenge.query.get_or_404(id)

    queried_challenge.receiver_score = req_data['score']
    queried_challenge.completed = True

    if queried_challenge.sender_score > queried_challenge.receiver_score:
        queried_challenge.sender.wins += 1
        queried_challenge.receiver.losses += 1

    if queried_challenge.sender_score < queried_challenge.receiver_score:
        queried_challenge.receiver.wins += 1
        queried_challenge.sender.losses += 1

    db.session.commit()

    return queried_challenge.to_dict()


@challenge_routes.route('/new', methods=['POST'])
def create_new_challenge():
    req_data = request.json

    sender = User.query.get_or_404(req_data['senderId'])
    receiver = User.query.get_or_404(req_data['receiverId'])

    new_challenge = Challenge(
        time=req_data['time'],
        difficulty=req_data['difficulty'],
        sender_score=req_data['score'],
        completed=False,
        redeemed=False,
        sender_id=sender.id,
        receiver_id=receiver.id
    )

    sender.sent_challenges.append(new_challenge)
    receiver.received_challenges.append(new_challenge)

    db.session.add(new_challenge)
    db.session.commit()
   
    return sender.to_dict()


@challenge_routes.route('/redeem', methods=['PUT'])
def redeem_challenge():
    req_data = request.json

    queried_challenge = Challenge.query.get_or_404(req_data['challengeId'])
    queried_user = User.query.get_or_404(req_data['playerId'])

    points_dict = {
        60000: {
            'medium': 400,
            'hard': 500,
            'rush': 600
        },
        120000: {
            'medium': 600,
            'hard': 700,
            'rush': 800
        },
        180000: {
            'medium': 800,
            'hard': 900,
            'rush': 1000
        }
    }

    if not queried_challenge.difficulty:
        queried_challenge.difficulty = 'rush'

    queried_user.points += points_dict[queried_challenge.time][queried_challenge.difficulty]
    queried_user.points_balance += points_dict[queried_challenge.time][queried_challenge.difficulty]
    queried_challenge.redeemed = True

    db.session.commit()

    return {'points': points_dict[queried_challenge.time][queried_challenge.difficulty]}


@challenge_routes.route('/edit/<id>', methods=['PUT'])
def edit_recipient(id):
    req_data = request.json

    all_users = User.query.all()
    queried_challenge = Challenge.query.get_or_404(id)

    new_receiver = None

    for user in all_users:
        attr = getattr(user, 'user_name')
        if attr.lower() == req_data['new_recipient'].lower():
            new_receiver = user.id

    if new_receiver == None:
        return {'errors': 'User does not exist.'}

    queried_challenge.receiver_id = new_receiver

    db.session.commit()

    return queried_challenge.to_dict()


@challenge_routes.route('/delete/<id>', methods=['DELETE'])
def delete_challenge(id):
    queried_challenge = Challenge.query.get_or_404(id)

    db.session.delete(queried_challenge)
    db.session.commit()

    return {'status': 200}, 200