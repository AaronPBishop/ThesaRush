from app.models import db, League, environment, SCHEMA

def seed_leagues():
    bronze = League(league_name='Bronze')
    silver = League(league_name='Silver')
    gold = League(league_name='Gold')
    ethereal = League(league_name='Ethereal')
    galaxy = League(league_name='Galaxy')
    astral = League(league_name='Astral')

    db.session.add(bronze)
    db.session.add(silver)
    db.session.add(gold)
    db.session.add(ethereal)
    db.session.add(galaxy)
    db.session.add(astral)

    db.session.commit()

def undo_leagues():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.leagues RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM leagues")
        
    db.session.commit()