from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []

    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')

    return errorMessages


# ? User authentication ************************************************************
@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()

    return {'errors': ['Unauthorized']}


# ? User login *********************************************************************
@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # if form.validate_on_submit():
    user = User.query.filter(User.user_email == form.data['email']).first()
    login_user(user)

    return {'id': user.id, 'status': 200}, 200

    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ? User logout ********************************************************************
@auth_routes.route('/logout')
def logout():
    logout_user()

    return {'message': 'User logged out'}


# ? User signup ********************************************************************
@auth_routes.route('/signup', methods=['POST'])
def create_new_user():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_user = User(
            user_name = form.data['user_name'],
            user_email = form.data['email'],
            user_password = form.data['password'],
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

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ? User unauthorized ****************************************************************
@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401