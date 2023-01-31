from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.user_name == username).first()

    if user:
        raise ValidationError('This username has already been taken.')


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.user_email == email).first()

    if user:
        raise ValidationError('This email has already been taken.')


class SignUpForm(FlaskForm):
    user_name = StringField('user_name')
    user_email = StringField('user_email')
    password = StringField('password')