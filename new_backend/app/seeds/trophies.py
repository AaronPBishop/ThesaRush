from app.models import db, Trophy, environment, SCHEMA

def seed_trophies():
    trophies = [
        {"trophy_name": "Obelisk Oracle", "user_id": 13},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 13},
        {"trophy_name": "Obelisk Oracle", "user_id": 13},

        {"trophy_name": "Master Blaster", "user_id": 14},
        {"trophy_name": "Obelisk Oracle", "user_id": 14},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 14},

        {"trophy_name": "Master Blaster", "user_id": 15},
        {"trophy_name": "Obelisk Oracle", "user_id": 15},
        {"trophy_name": "King Midas", "user_id": 15},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 15},

        {"trophy_name": "Master Blaster", "user_id": 16},
        {"trophy_name": "Obelisk Oracle", "user_id": 16},
        {"trophy_name": "King Midas", "user_id": 16},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 16},

        {"trophy_name": "Master Blaster", "user_id": 17},
        {"trophy_name": "Obelisk Oracle", "user_id": 17},
        {"trophy_name": "King Midas", "user_id": 17},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 17},

        {"trophy_name": "Master Blaster", "user_id": 18},
        {"trophy_name": "Obelisk Oracle", "user_id": 18},
        {"trophy_name": "King Midas", "user_id": 18},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 18},

        {"trophy_name": "Master Blaster", "user_id": 19},
        {"trophy_name": "Obelisk Oracle", "user_id": 19},
        {"trophy_name": "King Midas", "user_id": 19},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 19},

        {"trophy_name": "Master Blaster", "user_id": 20},
        {"trophy_name": "Obelisk Oracle", "user_id": 20},
        {"trophy_name": "King Midas", "user_id": 20},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 20},

        {"trophy_name": "Master Blaster", "user_id": 21},
        {"trophy_name": "Obelisk Oracle", "user_id": 21},
        {"trophy_name": "King Midas", "user_id": 21},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 21},

        {"trophy_name": "Master Blaster", "user_id": 22},
        {"trophy_name": "Obelisk Oracle", "user_id": 22},
        {"trophy_name": "King Midas", "user_id": 22},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 22},

        {"trophy_name": "Master Blaster", "user_id": 23},
        {"trophy_name": "Obelisk Oracle", "user_id": 23},
        {"trophy_name": "King Midas", "user_id": 23},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 23},

        {"trophy_name": "Master Blaster", "user_id": 24},
        {"trophy_name": "Obelisk Oracle", "user_id": 24},
        {"trophy_name": "King Midas", "user_id": 24},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 24},

        {"trophy_name": "Master Blaster", "user_id": 25},
        {"trophy_name": "Obelisk Oracle", "user_id": 25},
        {"trophy_name": "King Midas", "user_id": 25},
        {"trophy_name": "Antimatter Virtuoso", "user_id": 25},
    ]

    db.session.add_all([Trophy(**trophy) for trophy in trophies])
    db.session.commit()

def undo_trophies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.trophies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM trophies")
        
    db.session.commit()