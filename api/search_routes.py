from functools import reduce
from flask import Blueprint, request
from flask_cors import cross_origin
from datetime import datetime

#importing main coins dict
from api.data_routes import coins

# blueprint for API
search_routes = Blueprint('search', __name__)


def safefilter(value, cmp, default=True):
    def filter(record): 
        if (value == None) or (value == ""):
            return default
        else:
            return cmp(value, record.data)
    return filter

@search_routes.route('/search')
def search_search():
    names = request.args.get('coins', "")
    
    dateStart = request.args.get('dateStart', None)
    dateStop = request.args.get('dateStop', None)
    priceMin = request.args.get('priceMin', None)
    priceMax = request.args.get('priceMax', None)
    volumeMin = request.args.get('volumeMin', None)
    volumeMax = request.args.get('volumeMax', None)
    onlyLargest = request.args.get('onlyLargest', False)

    data = reduce(lambda r, l: r + l, map(lambda n: coins.get(n, []), names.split(",")))

    data  = filter(safefilter(dateStart, lambda s, d: d["Date"] > datetime.fromisoformat(s)), data) 
    data  = filter(safefilter(dateStop, lambda s, d: d["Date"] < datetime.fromisoformat(s)), data)         
    data  = filter(safefilter(priceMin, lambda s, d: float(d["High"]) > float(s)), data)        
    data  = filter(safefilter(priceMax, lambda s, d: float(d["High"]) < float(s)), data)   
    data  = filter(safefilter(volumeMin, lambda s, d: float(d["Volume"]) > float(s)), data)        
    data  = filter(safefilter(volumeMax, lambda s, d: float(d["Volume"]) < float(s)), data)   
    
    json = list(map(lambda r: r.json() ,data))
    print(json[0:10])
    return {'result': json } 


@search_routes.route('/highest/<date>')
def search_HighPriceofDay(date):
    # "Date":"2013-04-30 23:59:59

   #date = request.args.get("date", None)

    high_list= []

    def data_cmp(d):
        return d['High']

    for coin in coins.values():
        for data in coin:
            if data['Date'] == date:
                high_list.append(data)

                #print(coin)
            #print(coin[0]['Symbol'])

           
    high_list.sort(key=data_cmp)
    return {'coin with highest price during that day ': high_list[-1]}