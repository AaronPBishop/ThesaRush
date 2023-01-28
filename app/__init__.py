from flask import Flask, request, redirect
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS
from flask_login import LoginManager

from .models import db, User
from .seeds import seed_commands
from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.league_routes import league_routes
from .api.challenge_routes import challenge_routes
from .seeds import seed_commands

import os

app = Flask(__name__, static_url_path='/')

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.config.from_mapping({
  'SECRET_KEY': os.environ.get('SECRET_KEY'),
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False,
  'SQLALCHEMY_ECHO': True
})

app.cli.add_command(seed_commands)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(league_routes, url_prefix='/api/leagues')
app.register_blueprint(challenge_routes, url_prefix='/api/challenges')

db.init_app(app)

Migrate(app, db, compare_type=True)

CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')