from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column
from sqlalchemy.types import String

class League(db.Model):
    __tablename__ = 'leagues'

    league_name = Column(String, primary_key=True, nullable=False, unique=True)

    ranked_players = relationship("User", back_populates="league")

    def to_dict(self):
        return {
            'league_name': self.league_name,
            'players': [player.to_safe_dict() for player in self.ranked_players]
        }