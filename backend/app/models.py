from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

db = SQLAlchemy()

Base = declarative_base()

friends = Table(
    "friends",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("friend_id", ForeignKey("users.id"), primary_key=True))

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(14))
    user_email = Column(String(255))
    user_password = Column(String(20))
    points = Column(Integer)
    words = Column(Integer) 
    longest_word = Column(String(40))
    tiles_cleared =  Column(Integer)
    badges = Column(Integer)

    trophies = relationship("Trophy", back_populates="users")


class Trophy(Base):
    __tablename__ = 'trophies'

    id = Column(Integer, primary_key=True)
    trophy_name = Column(String(100))

    user = relationship("User", back_populates="trophies")