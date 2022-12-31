from flask import Blueprint, request

from app.models import User, Challenge, db

challenge_routes = Blueprint("challenges", __name__)


@challenge_routes.route('/<id>', methods=['PUT'])
def update_challenge(id):
    req_data = request.json

    queried_challenge = Challenge.query.get_or_404(id)

    if req_data['senderScore'] != None:
        queried_challenge.sender_score = req_data['senderScore']
    if req_data['receiverScore'] != None:
        queried_challenge.receiver_score = req_data['receiverScore']

    if queried_challenge.sender_score != None and queried_challenge.receiver_score != None:
        data = queried_challenge.to_dict()

        if queried_challenge.sender_score > queried_challenge.receiver_score:
            queried_challenge.winner = data['sender']['id']

            db.session.commit()
            return queried_challenge.to_dict()

        if queried_challenge.sender_score < queried_challenge.receiver_score:
            queried_challenge.winner = data['receiver']['id']

            db.session.commit()
            return queried_challenge.to_dict()

    db.session.commit()
    return queried_challenge.to_dict()


@challenge_routes.route('/<id>', methods=['DELETE'])
def delete_challenge(id):
    queried_challenge = Challenge.query.get_or_404(id)

    if queried_challenge.winner != None:
        db.session.delete(queried_challenge)
        db.session.commit()

    return {'Status': 'Challenge completed'}, 202


@challenge_routes.route('/new', methods=['POST'])
def create_new_challenge():
    req_data = request.json

    sender = User.query.get_or_404(req_data['senderId'])
    receiver = User.query.get_or_404(req_data['receiverId'])

    new_challenge = Challenge(
        time=req_data['time'],
        sender_id=sender.id,
        receiver_id=receiver.id
    )

    sender.sent_challenges.append(new_challenge)
    receiver.received_challenges.append(new_challenge)

    db.session.add(new_challenge)
    db.session.commit()
   
    return sender.to_dict()