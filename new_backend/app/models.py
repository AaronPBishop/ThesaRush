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

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    user_name = Column(String(14), nullable=False)
    user_email = Column(String(250), nullable=False)
    user_password = Column(String(20), nullable=False)
    points = Column(Integer, nullable=True)
    points_balance = Column(Integer, nullable=True)
    words = Column(Integer, nullable=True) 
    longest_word = Column(String(40), nullable=True)
    tiles_cleared =  Column(Integer, nullable=True)
    badges = Column(Integer, nullable=True)
    lives = Column(Integer, nullable=True)

    trophies = relationship("Trophy", back_populates="user", cascade="all, delete")
    # league = relationship("LeaderBoard", back_populates=("rankings"))


class Trophy(Base):
    __tablename__ = 'trophies'

    id = Column(Integer, primary_key=True)
    trophy_name = Column(String(100))
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", back_populates="trophies")


# class LeaderBoard(Base):
#     __tablename__ = 'leaderboard'

#     league = Column(String(40), primary_key=True)

#     rankings = relationship("User", back_populates="league")