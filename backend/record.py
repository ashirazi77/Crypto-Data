from functools import reduce
from backend.record_spec import record_spec

class record:
    def __init__(self, data):
        self.data = data
        self.validate() 

    
    def validate(self):
        for key in record_spec:
            if self.data.get(key) == None:
                raise Exception("Record field missing: {}".format(key))

            if not isinstance(self.data[key], record_spec[key]['type']):
                raise Exception("Record field of incorrect type")

            for validator in record_spec[key]['validators']:
                if not validator(self.data[key]):
                    raise Exception("Record field failed validation")

    def json(self):
        return '{' + reduce(
                lambda s, i: f"{s}, {i}",
                map(
                    lambda k: f'"{k}": "{record_spec[k]["serialize"](self.data[k])}"',
                    record_spec.keys())
                ) + '}'
            
    
    
class record_builder():

    def __init__(self, old_record=None):

        self.wip_record = {}
              
        for key in record_spec:

            if old_record != None:
                self.wip_record[key] = old_record.data[key]

            def make_setter(key):
                return lambda v : self.setter(key,v)

            setattr(self, 'set_' + key, make_setter(key) )

    def build(self):
        return record(self.wip_record)

    def setter(self, key, value):
        
        column_spec = record_spec.get(key)

        if value == None \
        or column_spec == None:
            return

        object = column_spec['constructor'](value)
        self.wip_record.update({key: object})
    
        return self
    
    def set_string_dict(self, dict = {}):
        for key in dict:
            if key in record_spec:
                self.setter(key, dict[key])
        return self

    def set_csv(self, line):
        values = map(str, line.split(","))
        for key, value in zip(record_spec.keys(), values):
            self.setter(key,value)
        return self
