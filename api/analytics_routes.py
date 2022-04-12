from datetime import datetime, timedelta
from flask import Blueprint
from api.data_routes import coins
from api.data_routes import cache
from flask import request
import numpy as np


#blueprint for API
analytics_routes = Blueprint('analytics', __name__)



#this function computes the percentage of growth or delince of a coin over a given month" 
@analytics_routes.route("/growthdecline", methods=["POST"])
def growth_decline():

    coin_name = request.json.get('Name')
    _list = coins[coin_name]
    first_date = datetime.fromisoformat( request.json.get('Start') ) 
    last_date = datetime.fromisoformat( request.json.get('Stop') ) 
    o=c=dif=change=0

    
    for i in _list:
        if i.data['Date'].date() == first_date.date():
            o = i.data['Open']
        if i.data['Date'].date() == last_date.date():
            c = i.data['Close'] 
        
    dif=c-o
    change=dif/o *100

    #testing on the backend
    word = "growth"
    if change<0:
        word = "decline"


    result = "{}, had {:0.2f} % {} during that month".format(coin_name, change, word)
   
    print(result)
    
    return result

#this function computes the average volume of a given coin over a given month
@analytics_routes.route("/avgvol", methods=["POST"])
def avg_vol():


    coin_name = request.json.get('Name')
    _list = coins[coin_name]
    first_date = datetime.fromisoformat( request.json.get('Start') ) 
    last_date = datetime.fromisoformat( request.json.get('Stop') ) 
    delta= last_date-first_date

    #checking if data in cache
    check_coin = coin_name + "avgvol"
    check_date= first_date.strftime("%Y")+first_date.strftime("%m")+ first_date.strftime("%d")+last_date.strftime("%Y") + last_date.strftime("%m")+ last_date.strftime("%d")

    if check_coin in cache:
        if check_date in cache[check_coin]:
            print("cache hit")
            avgvol=cache[check_coin][check_date]
            return "The average Volume for {} was {:0.2f}".format(coin_name, avgvol)

    avgvol=vol=0

    #if doesnt exist in cache calculate
    for i in _list:
        if i.data['Date'] >= first_date and i.data['Date'] <= last_date:
            vol+= i.data['Volume']
    
    avgvol=vol/delta.days

    #storing data in cache dictionary
    cache[coin_name+"avgvol"][first_date.strftime("%Y")+first_date.strftime("%m")+ first_date.strftime("%d")+last_date.strftime("%Y")
    + last_date.strftime("%m")+ last_date.strftime("%d")]=avgvol
    #print("cache:    ",cache)

    #testing on the backend
    print("The average Volume for",coin_name,"was {:0.2f}".format(avgvol))
    return "The average Volume for {} was {:0.2f}".format(coin_name, avgvol)

@analytics_routes.route("/avgcap", methods=["POST"])
def avg_cap():

    coin_name = request.json.get('Name')
    _list = coins[coin_name]
    first_date = datetime.fromisoformat( request.json.get('Start') ) 
    last_date = datetime.fromisoformat( request.json.get('Stop') ) 
    delta= last_date-first_date

    #checking if data in cache
    check_coin = coin_name + "avgcap"
    check_date= first_date.strftime("%Y")+first_date.strftime("%m")+ first_date.strftime("%d")+last_date.strftime("%Y") + last_date.strftime("%m")+ last_date.strftime("%d")

    if check_coin in cache:
        if check_date in cache[check_coin]:
            print("cache hit")
            avgcap=cache[check_coin][check_date]
            return "The average Marketcap for {} was {:0.2f}".format(coin_name, avgcap)

    avgcap=cap=0
    #if doesnt exist in cache calculate
    for i in _list:
        if i.data['Date'] >= first_date and i.data['Date'] <= last_date:
            cap+= i.data['Marketcap']
    
    avgcap=cap/delta.days

    #storing data in cache dictionary
    cache[coin_name+"avgcap"][first_date.strftime("%Y")+first_date.strftime("%m")+ first_date.strftime("%d")+last_date.strftime("%Y")
    + last_date.strftime("%m")+ last_date.strftime("%d")]=avgcap

    #testing on the backend
    print("The average Marketcap for",coin_name,"was {:0.2f}".format(avgcap))
    return "The average Marketcap for {} was {:0.2f}".format(coin_name, avgcap)

@analytics_routes.route("/capvolratio", methods=["POST"])
def cap_vol_ratio():

    coin_name = request.json.get('Name')
    _list = coins[coin_name]
    first_date = datetime.fromisoformat( request.json.get('Start') ) 
    last_date = datetime.fromisoformat( request.json.get('Stop') ) 
    delta= last_date-first_date

    #checking if data in cache
    check_coin = coin_name + "cap_vol_ratio"
    check_date= first_date.strftime("%Y")+first_date.strftime("%m")+ first_date.strftime("%d")+last_date.strftime("%Y") + last_date.strftime("%m")+ last_date.strftime("%d")

    if check_coin in cache:
        if check_date in cache[check_coin]:
            print("cache hit")
            ratio=cache[check_coin][check_date]
            return "The ratio of Marketcap to Volume of {} was {:0.2f}".format(coin_name, ratio)


    avgcap=avgvol=ratio=cap=vol=0
    #if doesnt exist in cache calculate
    for i in _list:
        if i.data['Date'] >= first_date and i.data['Date'] <= last_date:
            cap+= i.data['Marketcap']
            vol+= i.data['Volume']
    
    avgcap=cap/delta.days
    avgvol=vol/delta.days
    ratio=avgcap/avgvol

    #storing data in cache dictionary
    cache[coin_name+"cap_vol_ratio"][first_date.strftime("%Y")+first_date.strftime("%m")+ first_date.strftime("%d")+last_date.strftime("%Y")
    + last_date.strftime("%m")+ last_date.strftime("%d")]=avgcap

    #testing on the backend
    print("The ratio of Marketcap to Volume of",coin_name,"was {:0.2f}".format(ratio))
    return "The ratio of Marketcap to Volume of {} was {:0.2f}".format(coin_name, ratio)



#this function computes moving average of the closing price ofa coin over a given period of time
@analytics_routes.route("/movingaverage", methods=["POST"])
def MA():

    coin_name = request.json.get('Name')
    period=request.json.get('Period', 10)
    _list = coins[coin_name]
    finish_date = datetime.fromisoformat( request.json.get('Stop') ) 

    begin_date = finish_date - timedelta(days=period-1)
    ma=sum=0

    for i in _list:
        if i.data['Date'] >= begin_date and i.data['Date'] <= finish_date:
            
            sum+=i.data['Close']

    ma=sum/period

    #testing on the backend
    result = "The moving average for the coin is ${:0.2f}".format(period,ma)
    print(result)
    return result

#this function calculates annual volatility
@analytics_routes.route("/volatility", methods=["POST"])
def volatility():

   
    #coin_name= 'Bitcoin'
    coin_name = request.json.get('Name')
    begin_date = datetime.fromisoformat( request.json.get('Start') )
    end_date = datetime.fromisoformat( request.json.get('Stop'))
    days=(end_date-begin_date).days

    _list = coins[coin_name]

    #list that includes the close prices of the selected period
    daily_log_return=[]
    for i in _list:
        if i.data['Date'] >= begin_date and i.data['Date'] <= end_date:
            daily_log_return.append(np.log(i.data['Close']))

    #print("daily_log_return: ", daily_log_return)

    #caculating volatility
    daily_st_dev = np.std(daily_log_return)
    vola=daily_st_dev*days**.5

    #testing on the back end
    print("Daily STDV list: " + str(daily_st_dev))
    result = "Volatility of the asset over the selected period is ${:0.2f}".format(vola)

    print(result)
    return result

