from flask.cli import AppGroup
from .leagues import seed_leagues, undo_leagues

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')

def seed():
    if environment == 'production':

        undo_leagues()
    seed_leagues()


@seed_commands.command('undo')
def undo():
    undo_leagues()