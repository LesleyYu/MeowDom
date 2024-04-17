# initialize the application
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

'''
# use sqlite database (a file on the file system) for development, later post
app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
# /// relative path
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
'''


app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database0.db'
app.config['SQLALCHEMY_BINDS'] = {
    'db0': 'sqlite:///database0.db',
    'db1': 'sqlite:///database1.db'
}


db = SQLAlchemy(app)
db0 = 'sqlite:///DB0.db'
db1 = 'sqlite:///DB1.db'
engine0 = db.create_engine(db0)
engine1 = db.create_engine(db1)

session0 = db.sessionmaker(bind=engine0)
session1 = db.sessionmaker(bind=engine1)

'''
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
'''

# function for return the database according to the hash value of the username
def find_db(username):
    if len(username) % 2 == 0:
        return session0()
    else:
        return session1()

from flaskblog import routes
