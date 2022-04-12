from datetime import datetime

string_spec = {
        'type': str,
        'validators': [],
        'constructor': str,
        'serialize': lambda x: x }

int_spec = {
        'type': int,
        'validators': [],
        'constructor': int,
        'serialize': lambda x: "{}".format(x) }

float_spec = {
        'type': float,
        'validators': [],
        'constructor': float,
        'serialize': lambda x: "{}".format(x) }

date_spec = {
        'type': datetime,
        'validators': [],
        'constructor': datetime.fromisoformat,
        'serialize': lambda x: x.strftime('%Y-%m-%d %H:%M:%S') }


record_spec = {
    'SNo': int_spec,
    'Name': string_spec,
    'Symbol': string_spec,
    'Date': date_spec,
    'High': float_spec,
    'Low': float_spec,
    'Open': float_spec,
    'Close': float_spec,
    'Volume': float_spec,
    'Marketcap': float_spec}