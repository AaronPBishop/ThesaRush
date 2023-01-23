from app.models import db, User, environment, SCHEMA

def seed_users():
    users = [
        #1
        {"user_name": "Efaint", "user_email": "efaint@gmail.com", "password": "password", "level": "1", "high_score": "180", "points": "2200", "points_balance": "2200", "words": "164", "longest_word": "ENCRYPTION", "tiles_cleared": "480", "lives": "1", "wins": "2", "losses": "3", "bombardier": "4", "stone_crusher": "4", "gold_miner": "9", "word_smith": "2", "void_master": "3", "league_name": "Bronze"},

        #2
        {"user_name": "Oadamini", "user_email": "oadamini@gmail.com", "password": "password", "level": "2", "high_score": "190", "points": "4320", "points_balance": "4320", "words": "204", "longest_word": "TRENDING", "tiles_cleared": "680", "lives": "1", "wins": "3", "losses": "1", "bombardier": "6", "stone_crusher": "8", "gold_miner": "19", "word_smith": "3", "void_master": "9", "league_name": "Bronze"},

        #3
        {"user_name": "Poyley", "user_email": "poyley@gmail.com", "password": "password", "level": "3", "high_score": "202", "points": "6144", "points_balance": "6144", "words": "284", "longest_word": "STRUCTURE", "tiles_cleared": "920", "lives": "1", "wins": "6", "losses": "8", "bombardier": "10", "stone_crusher": "12", "gold_miner": "9", "word_smith": "7", "void_master": "6", "league_name": "Bronze"},

        #4
        {"user_name": "Androidus", "user_email": "androidus@gmail.com", "password": "password", "level": "4", "high_score": "189", "points": "8299", "points_balance": "8299", "words": "404", "longest_word": "CONTINGENCY", "tiles_cleared": "1160", "lives": "1", "wins": "5", "losses": "5", "bombardier": "13", "stone_crusher": "22", "gold_miner": "18", "word_smith": "12", "void_master": "10", "league_name": "Bronze"},

        #5
        {"user_name": "Roddling", "user_email": "roddling@gmail.com", "password": "password", "level": "4", "high_score": "243", "points": "9456", "points_balance": "9456", "words": "504", "longest_word": "DIVERSITY", "tiles_cleared": "1240", "lives": "1", "wins": "12", "losses": "9", "bombardier": "9", "stone_crusher": "17", "gold_miner": "20", "word_smith": "4", "void_master": "9", "league_name": "Bronze"},

        #6
        {"user_name": "WordShark", "user_email": "wordshark@gmail.com", "password": "password", "level": "5", "high_score": "286", "points": "10380", "points_balance": "10380", "words": "602", "longest_word": "CUSTOMERS", "tiles_cleared": "1416", "lives": "1", "wins": "14", "losses": "12", "bombardier": "20", "stone_crusher": "23", "gold_miner": "20", "word_smith": "10", "void_master": "19", "league_name": "Silver"},

        #7
        {"user_name": "Shackle", "user_email": "shackle@gmail.com", "password": "password", "level": "6", "high_score": "278", "points": "12482", "points_balance": "12482", "words": "676", "longest_word": "INTERFACING", "tiles_cleared": "1788", "lives": "1", "wins": "16", "losses": "17", "bombardier": "18", "stone_crusher": "26", "gold_miner": "14", "word_smith": "14", "void_master": "21", "league_name": "Silver"},

        #8
        {"user_name": "Cloaked", "user_email": "cloaked@gmail.com", "password": "password", "level": "7", "high_score": "306", "points": "14798", "points_balance": "14798", "words": "764", "longest_word": "ACCESSIBILITY", "tiles_cleared": "1868", "lives": "1", "wins": "10", "losses": "6", "bombardier": "26", "stone_crusher": "22", "gold_miner": "29", "word_smith": "13", "void_master": "30", "league_name": "Silver"},

        #9
        {"user_name": "Eforcade", "user_email": "eforcade@gmail.com", "password": "password", "level": "8", "high_score": "291", "points": "16554", "points_balance": "16554", "words": "878", "longest_word": "ASYMMETRIC", "tiles_cleared": "2256", "lives": "1", "wins": "24", "losses": "8", "bombardier": "31", "stone_crusher": "27", "gold_miner": "19", "word_smith": "18", "void_master": "29", "league_name": "Silver"},

        #10
        {"user_name": "Chaos", "user_email": "chaos@gmail.com", "password": "password", "level": "9", "high_score": "280", "points": "19744", "points_balance": "19744", "words": "931", "longest_word": "EXISTENTIALISM", "tiles_cleared": "2536", "lives": "1", "wins": "14", "losses": "12", "bombardier": "20", "stone_crusher": "23", "gold_miner": "20", "word_smith": "10", "void_master": "19", "league_name": "Silver"},

        #11
        {"user_name": "Hammer", "user_email": "hammer@gmail.com", "password": "password", "level": "10", "high_score": "273", "points": "20768", "points_balance": "20768", "words": "978", "longest_word": "DISINTERMEDIATE", "tiles_cleared": "2686", "lives": "1", "wins": "29", "losses": "33", "bombardier": "29", "stone_crusher": "33", "gold_miner": "24", "word_smith": "18", "void_master": "31", "league_name": "Gold"},

        #12
        {"user_name": "Ocossans", "user_email": "ocossans@gmail.com", "password": "password", "level": "11", "high_score": "329", "points": "23342", "points_balance": "23342", "words": "1184", "longest_word": "PROGRAMMABLE", "tiles_cleared": "3142", "lives": "1", "wins": "23", "losses": "9", "bombardier": "32", "stone_crusher": "38", "gold_miner": "36", "word_smith": "21", "void_master": "41", "league_name": "Gold"},

        #13
        {"user_name": "Matterface", "user_email": "matterface@gmail.com", "password": "password", "level": "12", "high_score": "488", "points": "24758", "points_balance": "24758", "words": "1224", "longest_word": "GENERATIONAL", "tiles_cleared": "3667", "lives": "1", "wins": "34", "losses": "30", "bombardier": "48", "stone_crusher": "53", "gold_miner": "44", "word_smith": "26", "void_master": "58", "league_name": "Gold"},

        #14
        {"user_name": "Static", "user_email": "static@gmail.com", "password": "password", "level": "13", "high_score": "464", "points": "27560", "points_balance": "27560", "words": "1376", "longest_word": "INTERMEDIARIES", "tiles_cleared": "4388", "lives": "1", "wins": "31", "losses": "37", "bombardier": "52", "stone_crusher": "68", "gold_miner": "49", "word_smith": "32", "void_master": "53", "league_name": "Gold"},

        #15
        {"user_name": "RedMachina", "user_email": "redmachina@gmail.com", "password": "password", "level": "14", "high_score": "518", "points": "28414", "points_balance": "28414", "words": "1532", "longest_word": "FUNCTIONALITIES", "tiles_cleared": "4698", "lives": "1", "wins": "45", "losses": "33", "bombardier": "66", "stone_crusher": "70", "gold_miner": "55", "word_smith": "41", "void_master": "66", "league_name": "Gold"},

        #16
        {"user_name": "Regex", "user_email": "regex@gmail.com", "password": "password", "level": "15", "high_score": "502", "points": "31866", "points_balance": "31866", "words": "1698", "longest_word": "ORGANIZATIONAL", "tiles_cleared": "4966", "lives": "1", "wins": "53", "losses": "51", "bombardier": "77", "stone_crusher": "84", "gold_miner": "71", "word_smith": "50", "void_master": "73", "league_name": "Ethereal"},

        #17
        {"user_name": "Buffering", "user_email": "buffering@gmail.com", "password": "password", "level": "16", "high_score": "483", "points": "32755", "points_balance": "32755", "words": "1930", "longest_word": "LIBRARIANS", "tiles_cleared": "5284", "lives": "1", "wins": "49", "losses": "20", "bombardier": "81", "stone_crusher": "87", "gold_miner": "63", "word_smith": "45", "void_master": "79", "league_name": "Ethereal"},

        #18
        {"user_name": "Mystical", "user_email": "mystical@gmail.com", "password": "password", "level": "18", "high_score": "542", "points": "37170", "points_balance": "37170", "words": "2266", "longest_word": "IMPLEMENTATIONS", "tiles_cleared": "5866", "lives": "1", "wins": "58", "losses": "32", "bombardier": "88", "stone_crusher": "92", "gold_miner": "75", "word_smith": "58", "void_master": "81", "league_name": "Ethereal"},

        #19
        {"user_name": "Gatterbury", "user_email": "gatterbury@gmail.com", "password": "password", "level": "22", "high_score": "618", "points": "44180", "points_balance": "44180", "words": "2974", "longest_word": "ORIENTATIONS", "tiles_cleared": "6974", "lives": "1", "wins": "66", "losses": "43", "bombardier": "101", "stone_crusher": "112", "gold_miner": "97", "word_smith": "62", "void_master": "93", "league_name": "Ethereal"},

        #20
        {"user_name": "Voidborn", "user_email": "voidborn@gmail.com", "password": "password", "level": "27", "high_score": "697", "points": "55106", "points_balance": "55106", "words": "3546", "longest_word": "ARCHITECTURAL", "tiles_cleared": "7884", "lives": "1", "wins": "72", "losses": "56", "bombardier": "138", "stone_crusher": "141", "gold_miner": "114", "word_smith": "68", "void_master": "107", "league_name": "Ethereal"},

        #21
        {"user_name": "Noctuary", "user_email": "noctuary@gmail.com", "password": "password", "level": "30", "high_score": "733", "points": "60299", "points_balance": "60299", "words": "4683", "longest_word": "PERSEVERANCE", "tiles_cleared": "12623", "lives": "1", "wins": "103", "losses": "70", "bombardier": "163", "stone_crusher": "188", "gold_miner": "190", "word_smith": "108", "void_master": "177", "league_name": "Galaxy"},

        #22
        {"user_name": "Hypnagog", "user_email": "hypnagog@gmail.com", "password": "password", "level": "34", "high_score": "648", "points": "68233", "points_balance": "68233", "words": "5709", "longest_word": "DECENTRALIZATION", "tiles_cleared": "13398", "lives": "1", "wins": "94", "losses": "31", "bombardier": "197", "stone_crusher": "204", "gold_miner": "183", "word_smith": "103", "void_master": "195", "league_name": "Galaxy"},

        #23
        {"user_name": "Kerplunk", "user_email": "kerplunk@gmail.com", "password": "password", "level": "37", "high_score": "785", "points": "74056", "points_balance": "74056", "words": "7267", "longest_word": "EXTRAPLANETARY", "tiles_cleared": "15048", "lives": "1", "wins": "139", "losses": "94", "bombardier": "240", "stone_crusher": "267", "gold_miner": "239", "word_smith": "148", "void_master": "203", "league_name": "Galaxy"},

        #24
        {"user_name": "Nefandous", "user_email": "nefandous@gmail.com", "password": "password", "level": "41", "high_score": "935", "points": "82393", "points_balance": "82393", "words": "9655", "longest_word": "HORIZONTALLY", "tiles_cleared": "19839", "lives": "1", "wins": "153", "losses": "109", "bombardier": "283", "stone_crusher": "302", "gold_miner": "276", "word_smith": "134", "void_master": "272", "league_name": "Galaxy"},

        #25
        {"user_name": "Epitonic", "user_email": "epitonic@gmail.com", "password": "password", "level": "46", "high_score": "876", "points": "92754", "points_balance": "92754", "words": "14543", "longest_word": "INCREMENTALLY", "tiles_cleared": "31894", "lives": "1", "wins": "165", "losses": "88", "bombardier": "473", "stone_crusher": "566", "gold_miner": "438", "word_smith": "214", "void_master": "483", "league_name": "Galaxy"},

        #26
        {"user_name": "Roctopi", "user_email": "roctopi@gmail.com", "password": "password", "level": "50", "high_score": "949", "points": "102343", "points_balance": "102343", "words": "18636", "longest_word": "ADMINISTRATIONS", "tiles_cleared": "36233", "lives": "1", "wins": "143", "losses": "127", "bombardier": "263", "stone_crusher": "288", "gold_miner": "290", "word_smith": "208", "void_master": "277", "league_name": "Astral"},

        #27
        {"user_name": "Deadbot", "user_email": "deadbot@gmail.com", "password": "password", "level": "50", "high_score": "1128", "points": "110009", "points_balance": "110009", "words": "23166", "longest_word": "VINDICATION", "tiles_cleared": "52304", "lives": "1", "wins": "188", "losses": "100", "bombardier": "297", "stone_crusher": "304", "gold_miner": "283", "word_smith": "203", "void_master": "295", "league_name": "Astral"},

        #28
        {"user_name": "Thesanaut", "user_email": "thesanaut@gmail.com", "password": "password", "level": "50", "high_score": "1033", "points": "118492", "points_balance": "118492", "words": "26166", "longest_word": "TRANSITIONAL", "tiles_cleared": "70484", "lives": "1", "wins": "239", "losses": "194", "bombardier": "340", "stone_crusher": "367", "gold_miner": "339", "word_smith": "248", "void_master": "303", "league_name": "Astral"},

        #29
        {"user_name": "Verona", "user_email": "verona@gmail.com", "password": "password", "level": "50", "high_score": "1287", "points": "133678", "points_balance": "133678", "words": "30912", "longest_word": "FLEXIBILITY", "tiles_cleared": "88399", "lives": "1", "wins": "397", "losses": "231", "bombardier": "383", "stone_crusher": "402", "gold_miner": "376", "word_smith": "234", "void_master": "372", "league_name": "Astral"},

        #30
        {"user_name": "Webula", "user_email": "webula@gmail.com", "password": "password", "level": "50", "high_score": "2487", "points": "159713", "points_balance": "159713", "words": "43219", "longest_word": "CRYPTOGRAPHICAL", "tiles_cleared": "138948", "lives": "1", "wins": "254", "losses": "88", "bombardier": "573", "stone_crusher": "689", "gold_miner": "538", "word_smith": "314", "void_master": "583", "league_name": "Astral"}
    ]

    db.session.add_all([User(**user) for user in users])
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()