from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer

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