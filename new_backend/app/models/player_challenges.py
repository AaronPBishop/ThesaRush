from .db import db
from sqlalchemy.orm import relationship


class PlayerChallenge(db.Model):
    __tablename__ = "player_challenges"

    player_1_id = db.Column(db.ForeignKey("users.id"), primary_key=True)
    player_2_id = db.Column(db.ForeignKey("users.id"), primary_key=True)
    challenge_id = db.Column(db.ForeignKey("challenges.id"), primary_key=True)

    challenge_sender = relationship("User", back_populates="sent_challenges")
    challenge_receiver = relationship("User", back_populates="received_challenges")
    challenge = relationship("Challenge", back_populates="associations")

    def to_challenge_dict(self):
        return self.challenge.to_dict()

    def to_player_dict(self):
        return {
            'sender_id': self.challenge_sender.id,
            'sender_name': self.challenge_sender.user_name,
            'receiver_id': self.challenge_receiver.id,
            'receiver_name': self.challenge_receiver.user_name
        }