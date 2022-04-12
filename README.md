
<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.pinimg.com/736x/a9/72/fd/a972fd3dc2d0de900fa73c491847d5a8.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Team Surf</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)

</div>

---



## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Write about 1-2 paragraphs describing the purpose of your project.

As students, a cryptocurrency allows us to be able to invest and play around with stocks without the risk of losing as much money compared to stocks or bonds. It is a more straight forward concept that we can see change on a daily basis. With this in mind we create our webpage to be able to track 23 cryptocurrencies. The whole purpose behind this webpage is so that students are able to learn about cryto currency easier and perhaps begin investing themselves because investing can be utilized to access financial security. What we did with our project is made a website UI that is easy to access and understand, so that students such as myself can learn about crytpo currencies trends and the reasonings behind their prices through statistics about their volume, market cap and price trends since the beginning of their existance. The datasets included in our project will include, the date, name, symbol, high/low prices, open/close prices, volume and marketcap of the 23 cryptocurrencies used. Our website also gives a visual representation to those who learn easier by seeing, so that they can access the same statistics, but instead of numbers, they will see charts. 

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.


### Prerequisites

We believe that using a source code editor called VSCode would be the easiest way to access our website because it is avaialble for Windows, Linux and macOS. Some applications installed through the web browser and within VSCode itself would be Flask, React, language libraries that include Python, JavaScript, HTML, and CSS. Going to our Github, you should be able to access our code, so that any user themselves, can edit and play around with our code to see how it works.

- [VSCode](https://code.visualstudio.com/download) - VSCode Download
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/) - Flask Installation Guide
- [React](https://reactjs.org/tutorial/tutorial.html) - React Installation Guide
- [Python](https://www.python.org/downloads/) - Python Download; You can also download the library within VSCode
- [JavaScript](https://www.javascript.com/) - JavaScript Tutorial; You can download the library within VSCode
- [HTML/CSS](https://www.w3schools.com/css/) - HTML/CSS Guide; You can download the library within VSCode
### Installing

A step by step series of examples that tell you how to get a development env running.

Now lets setup the backend and frontend. 
```
apt install -y build-essential npm python3 python3-pip ;
pip3 install flask flask-cors numpy ;
git clone $GIT_URI && cd cs180project-021-team-surf ;
cd react-front-end && npm install && cd .. ;

```

Once you do the installation then we can now run the two servers on seperate terminals. On one terminal do this:

First we run this onto the terminal for directory called ```./cs180project```
```
python3 -m flask run -p 8080
```
Then open a another turminal and enter:
```
cd react-front-end
```
```
npm start
```
Note: you might have to run  ```npm install```  beforehand if you have not already done it.

Now the frontend and backend should be up and running.


## 🔧 Running the tests <a name = "tests"></a>
```
For test cases, we were unable to configure unit tests with our program, so instead we tested the code by sending get and post requests on postman. An example of those would be pm.test("average cap calculation", avg_cap() {
    coin_name = request.json.get('Name')
    _list = coins[coin_name]
    first_date = datetime.fromisoformat( request.json.get('Start') ) 
    last_date = datetime.fromisoformat( request.json.get('Stop') ) 
    delta= last_date-first_date
    avgcap=cap=0

    for i in _list:
        if i.data['Date'] >= first_date and i.data['Date'] <= last_date:
            cap+= i.data['Marketcap']
    
    avgcap=cap/delta.days
    pm.expect(pm.avgcap.to.equal(###); //number we expect is in place of the ###
});

volume is similar
pm.test("average volume calculation", avg_vol() {
    coin_name = request.json.get('Name')
    _list = coins[coin_name]
    first_date = datetime.fromisoformat( request.json.get('Start') ) 
    last_date = datetime.fromisoformat( request.json.get('Stop') ) 
    delta= last_date-first_date
    avgvol=vol=0

    for i in _list:
        if i.data['Date'] >= first_date and i.data['Date'] <= last_date:
            cap+= i.data['Marketcap']
    
    avgvol=vol/delta.days
    pm.expect(pm.avg_vol.to.equal(###); //number we expect is in place of the ###
});

We also have other tested for SNo, Name, Symbol, Date, High, Low, Open, Close, Volume or Marketcap.
pm.test("name", create_new_record()) {
    new_record = record_builder()\
    .set_SNo("100")      \
    .set_Name("100")     \
    .set_Symbol("100")   \
    .set_Date("2013-04-30 23:59:59") \
    .set_High("100")      \
    .set_Low("100")     \
    .set_Open("100")     \
    .set_Close("100")   \
    .set_Volume("100")     \
    .set_Marketcap("100")   \
    .set_string_dict(request.json)\
    .build()
     pm.expect(pm.new_record.Symbol.to.equal(100); 
});
```
There are more test cases that apply for each analytic we use that goes from moving average, volatility, volume ratio, growth_decline.
### Break down into end to end tests

Explain what these tests test and why
When we access the local host website, we have functionalities of our program in which we can test to see if they are working correctly. For example, we have a database full of the price actions on cryptocurrencies where we can add, delete or edit data in case of changes. The way we check whether or not these are working correctly is by going to our CSV files and check to see the updated values. In our CSV file, it shows all the data of cryptocurrency from the day it was created to 2020, so we can navigate through the data, either by SNo, Name, Symbol, Date, High, Low, Open, Close, Volume or Marketcap.
Another test that we can check for are graphs. Obviously graphs can be hard to tell whether the dataset is wrong, so we made sure that our graph is working correctly by putting outlier values for prices at each end of the data and in the middle to see if the graph is accurately updating with data that is being added, edited, or even deleted.
```
```

## 🎈 Usage <a name="usage"></a>

Once the user has connect the frontend and back the webpage will open up in their preferred browser.

- The user is prompted with a main menu which will allow the user to select different ways to look at the data. 
- The first option "[Search/Edit App](https://cdn.discordapp.com/attachments/688494389449982002/916458425754468392/unknown.png)" will allow allow 4 task for the user :  “Search Cyrpto from dataset", [“Insert a New Cryopto data”, “Update a data set”, “Delete a set of Data”](https://cdn.discordapp.com/attachments/688494389449982002/916458613327925308/unknown.png)
```
The files we use for this App function includes.
    CS180PROJECT-021-Team-Surf/api:
        search_routes.py
        data_routes.py
    CS180PROJECT-021-Team-Surf/data/CVS
        coin_Aave.csv|
        coin_BinanceCoin.csv
        coin_Bitcoin.csv
    CS180PROJECT-021-Team-Surf/react-front-end/scr:
        App.js
        App.css
        data.js
        Record.js   
```
- Search task will allow the user to enter select given name of a crypto to display the result in a data table.
  - Also you can minimize the search how the coin the user is looking for. 
- Insert a data new data allows the user to create a new row of data.
  - Task creation allows the user to insert crypto Name, symbol, price, volume, marketcap, and date.
- Delete a task allows the user to remove a task from the data table.
- Viewing all the dataset in a table will displays.
  - Displays simply to the server.
- Update task will allows to change detail of an one specific row of data 
  - The user can update the crypto Name, symbol, price, volume, marketcap, and date.

Another function the main screen drop down option take you is "[Quick Results App](https://cdn.discordapp.com/attachments/688494389449982002/916457578869981224/unknown.png)"
```
The files we use for this App function includes.
    CS180PROJECT-021-Team-Surf/api:
        analytics_routes.py
    CS180PROJECT-021-Team-Surf/data/CVS
        coin_Aave.csv|
        coin_BinanceCoin.csv
        coin_Bitcoin.csv
    CS180PROJECT-021-Team-Surf/react-front-end/scr:
        App2.js
        App.css

```
- Will calculate the 7 implementation which are Volatility, Growth, Decline, Moving Average, Average Volume, Average Marketcap, and Ratio of Marketcap to Volume.
- You will select what cyrpto curency coin you want to get the results of. Then select the start date and end date to get a range for the calculation. 
- Then you will be able select what calculation button to get a display of our results.
- Their is incremental analytics on the the calculation for Average Volume, Average Marketcap, and Ratio of Marketcap to Volume. 



On the main screen you also can look at the a the graph from the data in the drop down option "[Graph/Chart App](https://cdn.discordapp.com/attachments/688494389449982002/916137687415660564/unknown.png)"
```
The files we use for this App function includes.
    CS180PROJECT-021-Team-Surf/api:
        search_routes.py
    CS180PROJECT-021-Team-Surf/data/CVS
        coin_Aave.csv|
        coin_BinanceCoin.csv
        coin_Bitcoin.csv
    CS180PROJECT-021-Team-Surf/react-front-end/scr/components:
        SearchChart.js
    CS180PROJECT-021-Team-Surf/react-front-end/scr/pages:
        search.js   
```
- we have a drop down menu that will let you choose a given coin to look at in this 
case we have: Aave, BiannceCoin and Bitcoin.
- Here we can see that we have the dates for the Cryptocurrency that was choosen which will be on the x-axis.
- On the y-axis we have price and volume.
- In the middle of the screen we have an option called "insert the number period" which will let you zoom into the section of the graph and the user will be able to increase the value or decrease it.
- there are six options a user can select or unselect with will display all six options or display the options the user choose not to toggle off.
- the six options are: High, Volume, Low, High Moving Average, Volume Moving Average, and low Moving Average


## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

screenshots or snipshot goes here

## ⛏️ Built Using <a name = "built_using"></a>

- [Kaggle: Cryptocurrency](https://www.kaggle.com/sudalairajkumar/cryptocurrencypricehistory) - Database
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) - Web Framework for Backend
- [ReactJs](https://reactjs.org/) - Web Framework for Frontend
- The langauges we used: Python, HTML, CSS and JavaScript


## ✍️ Authors <a name = "authors"></a>
>  [Giovanni Costagliola](), [Daniel Fitchmun](), [Ryan Ly](), [Amirreza Shirazi](), [Alexander Silva]()
