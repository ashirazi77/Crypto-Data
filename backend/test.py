from backend.record import record_builder
['SNo','Name','Symbol','Date','High','Low','Open','Close','Volume','Marketcap']
a = record_builder()    \
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

record_a = a.build()

b = record_builder(record_a).set_SNo("25")

print(record_a.data, b.build().data)

