from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

db = SQLAlchemy()

Base = declarative_base()

friends = Table(
    "friends",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("friend_id", Integer, ForeignKey("users.id"), primary_key=True)
)


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    
    user_name = Column(String(14), nullable=False)
    user_email = Column(String(250), nullable=False)
    user_password = Column(String(20), nullable=False)

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

    trophies = relationship("Trophy", back_populates="user", cascade="all, delete")

    def to_dict(self):
        return {
            'user_id': self.id,
            'user_name': self.user_name,
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
            'trophies': [trophy.to_dict() for trophy in self.trophies]
        }

    def to_safe_dict(self):
        return {
            'points': self.points,
            'words': self.words,
            'longest_word': self.longest_word,
            'tiles_cleared': self.tiles_cleared,
            'bombardier': self.bombardier,
            'stone_crusher': self.stone_crusher,
            'gold_miner': self.gold_miner,
            'word_smith': self.word_smith,
            'void_master': self.void_master,
            'trophies': [trophy.to_dict() for trophy in self.trophies]
        }

    def has_trophy(self, trophy_type):
        has_trophy = False

        for trophy in self.trophies:
            curr_trophy = trophy.to_dict()

            if curr_trophy['trophy_name'] == trophy_type:
                has_trophy = True

        return has_trophy



class Trophy(db.Model):
    __tablename__ = 'trophies'

    id = Column(Integer, primary_key=True)
    trophy_name = Column(String(100))
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", back_populates="trophies")

    def to_dict(self):

        return {
            'trophy_id': self.id,
            'trophy_name': self.trophy_name,
            'user_id': self.user_id
        }