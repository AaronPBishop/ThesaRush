from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    
    user_name = Column(String(14), nullable=False)
    user_email = Column(String(250), nullable=False)
    user_password = Column(String(20), nullable=False)

    level = Column(Integer)
    high_score = Column(Integer)
    points = Column(Integer)
    points_balance = Column(Integer)
    words = Column(Integer) 
    longest_word = Column(String(40))
    tiles_cleared =  Column(Integer)
    lives = Column(Integer)

    bombardier = Column(Integer)
    stone_crusher = Column(Integer)
    gold_miner = Column(Integer)
    word_smith = Column(Integer)
    void_master = Column(Integer)

    league_name = Column(String, ForeignKey('leagues.league_name'))

    league = relationship("League", back_populates="ranked_players")
    trophies = relationship("Trophy", back_populates="user", cascade="all, delete")

    sent_challenges = relationship("Challenge", foreign_keys="Challenge.sender_id", back_populates="sender", cascade="all, delete")
    received_challenges = relationship("Challenge", foreign_keys="Challenge.receiver_id", back_populates="receiver", cascade="all, delete")

    def to_dict(self):
        return {
            'user_id': self.id,
            'user_name': self.user_name,
            'level': self.level,
            'high_score': self.high_score,
            'points': self.points,
            'points_balance': self.points_balance,
            'words': self.words,
            'longest_word': self.longest_word,
            'tiles_cleared': self.tiles_cleared,
            'lives': self.lives,
            'bombardier': self.bombardier,
            'stone_crusher': self.stone_crusher,
            'gold_miner': self.gold_miner,
            'word_smith': self.word_smith,
            'void_master': self.void_master,
            'league': self.league_name,
            'trophies': [trophy.to_dict() for trophy in self.trophies],
            'sent_challenges': [challenge.to_dict() for challenge in self.sent_challenges],
            'received_challenges': [challenge.to_dict() for challenge in self.received_challenges]
        }

    def to_safe_dict(self):
        return {
            'high_score': self.high_score,
            'user_name': self.user_name,
            'level': self.level,
            'points': self.points,
            'words': self.words,
            'longest_word': self.longest_word,
            'tiles_cleared': self.tiles_cleared,
            'bombardier': self.bombardier,
            'stone_crusher': self.stone_crusher,
            'gold_miner': self.gold_miner,
            'word_smith': self.word_smith,
            'void_master': self.void_master,
            'league': self.league_name,
            'trophies': [trophy.to_dict() for trophy in self.trophies]
        }

    def has_trophy(self, trophy_type):
        has_trophy = False

        for trophy in self.trophies:
            curr_trophy = trophy.to_dict()

            if curr_trophy['trophy_name'] == trophy_type:
                has_trophy = True

        return has_trophy