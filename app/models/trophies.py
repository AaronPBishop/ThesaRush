from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer

class Trophy(db.Model):
    __tablename__ = 'trophies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    trophy_name = Column(String(100))

    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = relationship("User", back_populates="trophies")

    def to_dict(self):
        return {
            'trophy_id': self.id,
            'trophy_name': self.trophy_name,
            'user_id': self.user_id
        }