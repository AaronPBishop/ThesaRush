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

    queried_user.points += 500
    queried_user.points_balance += 500
    queried_challenge.redeemed = True

    db.session.commit()

    return queried_user.to_dict()


@challenge_routes.route('/delete/<id>', methods=['DELETE'])
def delete_challenge(id):
    queried_challenge = Challenge.query.get_or_404(id)

    db.session.delete(queried_challenge)
    db.session.commit()

    return {'status': 200}, 200