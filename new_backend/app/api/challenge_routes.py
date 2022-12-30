from flask import Blueprint, request

from app.models import User, Challenge, PlayerChallenge, db

challenge_routes = Blueprint("challenges", __name__)


@challenge_routes.route('/new', methods=['POST'])
def create_new_challenge():
    req_data = request.json

    sender = User.query.get_or_404(req_data['receiverId'])
    receiver = User.query.get_or_404(req_data['senderId'])

    new_challenge = Challenge(time=req_data['time'])

    association = PlayerChallenge(
        player_1_id=sender.id,
        player_2_id=receiver.id,
        challenge_id=new_challenge.id,
        challenge_sender=sender,
        challenge_receiver=receiver,
        challenge=new_challenge
    )

    sender.sent_challenges.append(association)
    receiver.received_challenges.append(association)
    new_challenge.associations.append(association)

    db.session.add(association)
    db.session.commit()
   
    return sender.to_dict()