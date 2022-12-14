from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, Boolean


class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = Column(Integer, primary_key=True)
    
    time = Column(Integer)
    sender_score = Column(Integer, nullable=True)
    receiver_score = Column(Integer, nullable=True)
    completed = Column(Boolean)
    redeemed = Column(Boolean)

    sender_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    receiver_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    sender = relationship("User", primaryjoin="User.id==Challenge.sender_id", back_populates="sent_challenges")
    receiver = relationship("User", primaryjoin="User.id==Challenge.receiver_id", back_populates="received_challenges")

    def to_dict(self):
        return {
            'challenge_id': self.id,
            'sender': {
                'id': self.sender.id,
                'user_name': self.sender.user_name,
                'score': self.sender_score
            },
            'receiver': {
                'id': self.receiver.id,
                'user_name': self.receiver.user_name,
                'score': self.receiver_score
            },
            'time': self.time,
            'completed': self.completed,
            'redeemed': self.redeemed
        }