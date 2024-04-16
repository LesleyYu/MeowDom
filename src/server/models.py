from datetime import datetime
from flaskblog import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(200), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)
    items = db.relationship('Item', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"


class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), db.ForeignKey('user.username'), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    post_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"


class Item(db.Model):
    item_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), db.ForeignKey('user.username'), unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(200), nullable=False)
    original_price = db.Column(db.Float, nullable=False)
    selling_price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(200), nullable=False)
    condition = db.Column(db.String(200), nullable=False)
    brand = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"Item('{self.item_id}', '{self.user_id}')"
