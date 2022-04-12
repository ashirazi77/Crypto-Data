import os
from re import template
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import redirect
from api.data_routes import data_routes
from api.search_routes import search_routes
from api.analytics_routes import analytics_routes
from flask_cors import CORS, cross_origin

#make the server
app = Flask(__name__)
cors = CORS(app)

#Set the environment
app.config['TESTING'] = True

#Define apis
app.register_blueprint(data_routes, url_prefix="/api/data")
app.register_blueprint(search_routes,url_prefix="/api/search")
app.register_blueprint(analytics_routes,url_prefix="/api/analytics")

if __name__ == '__main__':
    app.run(debug=True)