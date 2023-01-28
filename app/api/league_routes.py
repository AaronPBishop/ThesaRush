from flask import Blueprint

from app.models import League, db

league_routes = Blueprint("leagues", __name__)


@league_routes.route('/<league_name>', methods=['GET'])
def fetch_league_rankings(league_name):
    queried_league = League.query.get_or_404(league_name)
   
    return queried_league.to_dict()