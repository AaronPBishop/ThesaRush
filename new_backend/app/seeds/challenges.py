from app.models import db, Challenge, environment, SCHEMA

def seed_challenges():
    challenges = [
        # Sent/Pending
        {"time": 60000, "sender_score": 94, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 30, "receiver_id": 29},
        {"time": 180000, "sender_score": 283, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 30, "receiver_id": 14},
        {"time": 120000, "sender_score": 155, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 30, "receiver_id": 20},
        {"time": 60000, "sender_score": 119, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 30, "receiver_id": 26},

        # Sent/Completed
        {"time": 60000, "sender_score": 99, "receiver_score": 107, "completed": True, "redeemed": False, "sender_id": 30, "receiver_id": 23},
        {"time": 120000, "sender_score": 176, "receiver_score": 172, "completed": True, "redeemed": False, "sender_id": 30, "receiver_id": 28},
        {"time": 60000, "sender_score": 131, "receiver_score": 113, "completed": True, "redeemed": False, "sender_id": 30, "receiver_id": 20},
        {"time": 180000, "sender_score": 302, "receiver_score": 244, "completed": True, "redeemed": False, "sender_id": 30, "receiver_id": 8},

        #Received/Pending
        {"time": 60000, "sender_score": 117, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 15, "receiver_id": 30},
        {"time": 120000, "sender_score": 188, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 28, "receiver_id": 30},
        {"time": 180000, "sender_score": 309, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 7, "receiver_id": 30},
        {"time": 60000, "sender_score": 122, "receiver_score": None, "completed": False, "redeemed": False, "sender_id": 26, "receiver_id": 30},

        #Received/Completed
        {"time": 120000, "sender_score": 202, "receiver_score": 235, "completed": True, "redeemed": False, "sender_id": 16, "receiver_id": 30},
        {"time": 60000, "sender_score": 157, "receiver_score": 133, "completed": True, "redeemed": False, "sender_id": 5, "receiver_id": 30},
        {"time": 180000, "sender_score": 327, "receiver_score": 380, "completed": True, "redeemed": False, "sender_id": 18, "receiver_id": 30},
        {"time": 60000, "sender_score": 138, "receiver_score": 173, "completed": True, "redeemed": False, "sender_id": 19, "receiver_id": 30},
    ]

    db.session.add_all([Challenge(**challenge) for challenge in challenges])
    db.session.commit()

def undo_challenges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM challenges")
        
    db.session.commit()