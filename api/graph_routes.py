from flask import Blueprint
from flask import request

analytics_routes = Blueprint('graph', __name__)

#importing main coins dict
from api.data_routes import coins


@search_routes.route('/search', methods=["POST"])
def search_search():
    name = request.json.get('coin')
    
    dateStart = request.json.get('dateStart')
    dateStop = request.json.get('dateStop')

    

@analytics_routes.route("/exchange_rates", methods=["POST"])
def exchange_rates():
    start = ""
    stop = ""
    from_coin = ""
    to_coin = ""

@analytics_routes.route("/liquidity", methods=["POST"])
def liquidity():
    start = ""
    stop = ""
    coin = ""

@analytics_routes.route("/most_popular", methods=["POST"])
def most_popular():
    start = ""
    stop = ""

def data_point(coin, date):

def moving_average(coin, start_date, stop_date, period):