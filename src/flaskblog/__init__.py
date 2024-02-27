# initialize the application
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# use sqlite database (a file on the file system) for development, later post

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
# /// relative path
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

from flaskblog import routes
