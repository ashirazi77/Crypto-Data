from functools import reduce
from backend.record import record, record_builder
from backend.record_spec import record_spec
from functools import reduce


def read_coin(coin): 
    f = open(f'data/CSV/coin_{coin.replace(" ", "")}.csv')
    lines = f.readlines()
    lines = lines[1:]
    
    coin_info = []
    
    for line in lines:
        coin_info.append(record_builder().set_csv(line).build())

    return coin_info

def write_coin(coin_info): 
    name = coin_info[0].data["Name"]

    f = open(f'data/CSV/coin_{name.replace(" ", "")}.csv', 'w')

    keys = record_spec.keys()

    f.write(
        reduce(
            lambda s, k: f'{s},{k}',
            keys)
        + '\n')

    for record in coin_info:
        f.write(
            reduce(
                lambda s, v: f"{s},{v}",
                map(
                    lambda k: record_spec[k]['serialize'](record.data[k]),
                    keys))
            + "\n" )
    f.close()

def write_all_coins(coins):
    for coin in coins:
        write_coin(coins[coin])

def read_all_coins():
    #the main coins dictionary
    #calling read_coin() to 
    coins =  {}
    #testing for only 3 coins for now
    for coin in ["Aave", "BinanceCoin", "Bitcoin"]:
        coins[coin] = read_coin(coin)

    return coins
