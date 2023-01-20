from flask import Blueprint

from app.models import League, db

league_routes = Blueprint("leagues", __name__)


@league_routes.route('/<league_name>', methods=['GET'])
def fetch_league_rankings(league_name):
    queried_league = League.query.get_or_404(league_name)
   
    return queried_league.to_dict()


# ? Initialize leagues
@league_routes.route('/initialize', methods=['GET'])
def populate_leagues():
    bronze = League(league_name='Bronze')
    silver = League(league_name='Silver')
    gold = League(league_name='Gold')
    ethereal = League(league_name='Ethereal')
    galaxy = League(league_name='Galaxy')

    db.session.add(bronze)
    db.session.add(silver)
    db.session.add(gold)
    db.session.add(ethereal)
    db.session.add(galaxy)

    db.session.commit()

    return None