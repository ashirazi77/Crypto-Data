from datetime import date, datetime
import json
from flask import Blueprint
from flask import request
from backend.record import record_builder
from backend.coin import read_all_coins, write_all_coins
from collections import defaultdict
#blueprint for API
data_routes = Blueprint('data', __name__)


cache=defaultdict(defaultdict)

coins=read_all_coins()

@data_routes.route('/list', methods=['GET'])
def list_coins():
    return json.dumps(list(coins.keys()))

@data_routes.route('/records', methods=['GET'])
def list_records():

    coin = request.args.get('coin')

    return json.dumps(
        list(
            map(
                lambda r: json.loads(r.json()),
                coins.get(coin, []))))


@data_routes.route('/create', methods=['POST'])
def create_new_record():
    new_record = record_builder()\
    .set_SNo("10")      \
    .set_Name("10")     \
    .set_Symbol("10")   \
    .set_Date("2013-04-30 23:59:59") \
    .set_High("10")      \
    .set_Low("10")     \
    .set_Open("10")     \
    .set_Close("10")   \
    .set_Volume("10")     \
    .set_Marketcap("10")   \
    .set_string_dict(request.json)\
    .build()
    #Default values

    name = new_record.data["Name"]
    
    if name in coins:
        coins[name].append(new_record)
    else:
        coins[name]=[new_record]
    #print(coins['Aave'][0].data)

    #resetting the cache if new 
    global cache
    cache=defaultdict(defaultdict)
    return ""



@data_routes.route('/update', methods=['POST'])
def update_record():

    name = request.json.get('Name')
    sno = int(request.json.get('SNo'))

    coin_data = coins.get(name, [])

    for index, record in enumerate(coin_data):
        if record.data["SNo"] == sno:
            coin_data[index] = record_builder(record)\
                .set_string_dict(request.json)\
                .build()
    global cache
    cache=defaultdict(defaultdict)
    return ""


#postman JSON body for PUT method 
# { 
#     "High": "61000",
#     "Low": "59000",
#     "Open": "60000",
#     "Close": "61000",
#     "Volume": "23000000",
#     "Marketcap": "4500000000"
# }

@data_routes.route('/delete', methods=['POST'])
def delete_record():

    #just for test purpose the value is hard coded, it has to be passed to the function as user input
    
    form  = request.json

    name = form.get('Name')
    sno = int(form.get('SNo'))

    coin_data = coins.get(name, [])

    for index, record in enumerate(coin_data):
        if record.data["SNo"] == sno:
            del coin_data[index]

    global cache
    cache=defaultdict(defaultdict)
    return ""


@data_routes.route("/export", methods=["POST"])
def export_records():
    write_all_coins(coins)
    return ""
    