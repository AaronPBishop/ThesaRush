from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user

auth_routes = Blueprint('auth', __name__)


# ? User authentication ************************************************************
@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()

    return {'status': 200}, 200


# ? User login *********************************************************************
@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    email = form.data['user_email']
    password = form.data['password']

    user = User.query.filter(User.user_email == email).first()

    if not user:
        return {'errors': 'No Such User Exists'}, 401
    if not user.check_password(password):
        return {'errors': 'Password Entered was Incorrect'}, 401

    login_user(user)

    return {'id': user.id}, 200


# ? User logout ********************************************************************
@auth_routes.route('/logout')
def logout():
    logout_user()

    return {'status': 200}, 200


# ? User signup ********************************************************************
@auth_routes.route('/signup', methods=['POST'])
def create_new_user():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    username = form.data['user_name']
    email = form.data['user_email']

    all_users = User.query.all()

    for user in all_users:
        attr = getattr(user, 'user_name')
        if attr.lower() == username.lower():
            return {'errors': 'This Username is Already Taken'}, 400

    email_exists = User.query.filter(User.user_email == email).first()

    if email_exists:
        return {'errors': 'This Email is Already Taken'}, 401

    new_user = User(
        user_name = form.data['user_name'],
        user_email = form.data['user_email'],
        password = form.data['password'],
        level = 0,
        high_score = 0,
        points = 0,
        points_balance = 0,
        words = 0,
        longest_word = '',
        tiles_cleared = 0,
        lives = 1,
        bombardier = 0,
        stone_crusher = 0,
        gold_miner = 0,
        word_smith = 0,
        void_master = 0,
        league_name = 'Bronze',
        wins=0,
        losses=0
    )

    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)

    return {'id': new_user.id, 'status': 200}, 200


# ? User unauthorized ****************************************************************
@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401