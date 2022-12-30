from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer


class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = Column(Integer, primary_key=True)
    
    time = Column(Integer)
    player_1_score = Column(Integer, nullable=True)
    player_2_score = Column(Integer, nullable=True)

    associations = relationship("PlayerChallenge", back_populates="challenge")

    def to_dict(self):
        return {
            'challenge_id': self.id,
            'time': self.time,
            'player_1_score': self.player_1_score,
            'player_2_score': self.player_2_score,
            'player_data': self.associations.to_player_dict()
        }