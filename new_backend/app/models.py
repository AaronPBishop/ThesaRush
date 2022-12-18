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

    # current_league = Column(String(40), ForeignKey('leaderboard.league'), nullable=True)

    trophies = relationship("Trophy", back_populates="user", cascade="all, delete")
    # league = relationship("LeaderBoard", back_populates=("rankings"))

    # def __getitem__(self, key):
    #     return getattr(self, key)

    # def __setitem__(self, key, value):
    #     self[key] += value

    def to_dict(self):
        # json_trophies = []
        # for trophy in self.trophies:
        #     json_trophies.append(trophy.to_dict())

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
            'void_master': self.void_master
            # 'trophies': json_trophies
        }


class Trophy(db.Model):
    __tablename__ = 'trophies'

    id = Column(Integer, primary_key=True)
    trophy_name = Column(String(100))
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", back_populates="trophies")


# class LeaderBoard(db.Model):
#     __tablename__ = 'leaderboard'
#     id = Column(Integer, primary_key=True)
#     league = Column(String(40))

#     rankings = relationship("User", back_populates="league")