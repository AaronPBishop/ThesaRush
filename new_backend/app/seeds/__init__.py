from flask.cli import AppGroup
from .leagues import seed_leagues, undo_leagues
from .users import seed_users, undo_users
from .trophies import seed_trophies, undo_trophies
from .challenges import seed_challenges, undo_challenges

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_leagues()
        undo_users()
        undo_trophies()
        undo_challenges()
    seed_leagues()
    seed_users()
    seed_trophies()
    seed_challenges()


@seed_commands.command('undo')
def undo():
    undo_leagues()
    undo_users()
    undo_trophies()
    undo_challenges()