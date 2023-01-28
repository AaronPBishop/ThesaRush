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
        db.session.execute(f"TRUNCATE table {SCHEMA}.trophies RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenges RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.leagues RESTART IDENTITY CASCADE;")

        db.session.commit()
    else:
        undo_leagues()
        undo_users()
        undo_challenges()
        undo_trophies()

    seed_leagues()
    seed_users()
    seed_challenges()
    seed_trophies()


@seed_commands.command('undo')
def undo():
    undo_leagues()
    undo_users()
    undo_challenges()
    undo_trophies()