from app.models import db, Trophy, environment, SCHEMA

def seed_trophies():
    trophies = [
        {"trophy_name": "Obelisk Oracle", "user_id": 13},
        {"trophy_name": "Antimatter Maestro", "user_id": 13},
        {"trophy_name": "Obelisk Oracle", "user_id": 13},

        {"trophy_name": "Master Blaster", "user_id": 14},
        {"trophy_name": "Obelisk Oracle", "user_id": 14},
        {"trophy_name": "Antimatter Maestro", "user_id": 14},

        {"trophy_name": "Master Blaster", "user_id": 15},
        {"trophy_name": "Obelisk Oracle", "user_id": 15},
        {"trophy_name": "Treasure Tactician", "user_id": 15},
        {"trophy_name": "Antimatter Maestro", "user_id": 15},

        {"trophy_name": "Master Blaster", "user_id": 16},
        {"trophy_name": "Obelisk Oracle", "user_id": 16},
        {"trophy_name": "Treasure Tactician", "user_id": 16},
        {"trophy_name": "Antimatter Maestro", "user_id": 16},
        {"trophy_name": "Alphabet Architect", "user_id": 16},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 16},

        {"trophy_name": "Master Blaster", "user_id": 17},
        {"trophy_name": "Obelisk Oracle", "user_id": 17},
        {"trophy_name": "Treasure Tactician", "user_id": 17},
        {"trophy_name": "Antimatter Maestro", "user_id": 17},

        {"trophy_name": "Master Blaster", "user_id": 18},
        {"trophy_name": "Obelisk Oracle", "user_id": 18},
        {"trophy_name": "Treasure Tactician", "user_id": 18},
        {"trophy_name": "Antimatter Maestro", "user_id": 18},
        {"trophy_name": "Alphabet Architect", "user_id": 18},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 18},

        {"trophy_name": "Master Blaster", "user_id": 19},
        {"trophy_name": "Obelisk Oracle", "user_id": 19},
        {"trophy_name": "Treasure Tactician", "user_id": 19},
        {"trophy_name": "Antimatter Maestro", "user_id": 19},
        {"trophy_name": "Alphabet Architect", "user_id": 19},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 19},

        {"trophy_name": "Master Blaster", "user_id": 20},
        {"trophy_name": "Obelisk Oracle", "user_id": 20},
        {"trophy_name": "Treasure Tactician", "user_id": 20},
        {"trophy_name": "Antimatter Maestro", "user_id": 20},
        {"trophy_name": "Alphabet Architect", "user_id": 20},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 20},

        {"trophy_name": "Master Blaster", "user_id": 21},
        {"trophy_name": "Obelisk Oracle", "user_id": 21},
        {"trophy_name": "Treasure Tactician", "user_id": 21},
        {"trophy_name": "Antimatter Maestro", "user_id": 21},
        {"trophy_name": "Alphabet Architect", "user_id": 21},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 21},

        {"trophy_name": "Master Blaster", "user_id": 22},
        {"trophy_name": "Obelisk Oracle", "user_id": 22},
        {"trophy_name": "Treasure Tactician", "user_id": 22},
        {"trophy_name": "Antimatter Maestro", "user_id": 22},
        {"trophy_name": "Alphabet Architect", "user_id": 22},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 22},

        {"trophy_name": "Master Blaster", "user_id": 23},
        {"trophy_name": "Obelisk Oracle", "user_id": 23},
        {"trophy_name": "Treasure Tactician", "user_id": 23},
        {"trophy_name": "Antimatter Maestro", "user_id": 23},
        {"trophy_name": "Alphabet Architect", "user_id": 23},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 23},

        {"trophy_name": "Master Blaster", "user_id": 24},
        {"trophy_name": "Obelisk Oracle", "user_id": 24},
        {"trophy_name": "Treasure Tactician", "user_id": 24},
        {"trophy_name": "Antimatter Maestro", "user_id": 24},
        {"trophy_name": "Alphabet Architect", "user_id": 24},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 24},

        {"trophy_name": "Master Blaster", "user_id": 25},
        {"trophy_name": "Obelisk Oracle", "user_id": 25},
        {"trophy_name": "Treasure Tactician", "user_id": 25},
        {"trophy_name": "Antimatter Maestro", "user_id": 25},
        {"trophy_name": "Alphabet Architect", "user_id": 25},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 25},

        {"trophy_name": "Master Blaster", "user_id": 26},
        {"trophy_name": "Obelisk Oracle", "user_id": 26},
        {"trophy_name": "Treasure Tactician", "user_id": 26},
        {"trophy_name": "Antimatter Maestro", "user_id": 26},
        {"trophy_name": "Alphabet Architect", "user_id": 26},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 26},
        {"trophy_name": "Cosmic Intellect", "user_id": 26},

        {"trophy_name": "Master Blaster", "user_id": 27},
        {"trophy_name": "Obelisk Oracle", "user_id": 27},
        {"trophy_name": "Treasure Tactician", "user_id": 27},
        {"trophy_name": "Antimatter Maestro", "user_id": 27},
        {"trophy_name": "Alphabet Architect", "user_id": 27},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 27},
        {"trophy_name": "Cosmic Intellect", "user_id": 27},

        {"trophy_name": "Master Blaster", "user_id": 28},
        {"trophy_name": "Obelisk Oracle", "user_id": 28},
        {"trophy_name": "Treasure Tactician", "user_id": 28},
        {"trophy_name": "Antimatter Maestro", "user_id": 28},
        {"trophy_name": "Alphabet Architect", "user_id": 28},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 28},
        {"trophy_name": "Cosmic Intellect", "user_id": 28},

        {"trophy_name": "Master Blaster", "user_id": 29},
        {"trophy_name": "Obelisk Oracle", "user_id": 29},
        {"trophy_name": "Treasure Tactician", "user_id": 29},
        {"trophy_name": "Antimatter Maestro", "user_id": 29},
        {"trophy_name": "Alphabet Architect", "user_id": 29},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 29},
        {"trophy_name": "Cosmic Intellect", "user_id": 29},

        {"trophy_name": "Master Blaster", "user_id": 30},
        {"trophy_name": "Obelisk Oracle", "user_id": 30},
        {"trophy_name": "Treasure Tactician", "user_id": 30},
        {"trophy_name": "Antimatter Maestro", "user_id": 30},
        {"trophy_name": "Alphabet Architect", "user_id": 30},
        {"trophy_name": "Vengeant Vanquisher", "user_id": 30},
        {"trophy_name": "Cosmic Intellect", "user_id": 30},

        # # New Trophy Testing Seeders
        # {"trophy_name": "Master Blaster", "user_id": 32},
        # {"trophy_name": "Obelisk Oracle", "user_id": 33},
        # {"trophy_name": "Treasure Tactician", "user_id": 34},
        # {"trophy_name": "Alphabet Architect", "user_id": 35},
        # {"trophy_name": "Antimatter Maestro", "user_id": 36},
        # {"trophy_name": "Vengeant Vanquisher", "user_id": 37}
    ]

    db.session.add_all([Trophy(**trophy) for trophy in trophies])
    db.session.commit()

def undo_trophies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.trophies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM trophies")
        
    db.session.commit()