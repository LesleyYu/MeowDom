import os
import secrets
from PIL import Image
from flask import render_template, url_for, flash, redirect, request, abort
# from flaskblog import app, db, bcrypt, find_db, session0, session1
from flaskblog import app, db, find_db, session0, session1
from flaskblog.forms import RegistrationForm, PostForm
from flaskblog.models import User, Post, Item
from sqlalchemy.orm import joinedload


@app.route("/")
@app.route("/home")
def home():

    # posts = Post.query.all()  # grab all posts
    posts0 = session0().query(User.username, User.phone, User.email, User.city, User.state, Post.title, Post.content,
                            Post.post_date, Item.category, Item.name, Item.brand, Item.condition,
                            Item.original_price, Item.selling_price, Post.post_id).join(User, User.username == Post.username). \
        join(Item, User.username == Item.username).all()

    posts1 = session1().query(User.username, User.phone, User.email, User.city, User.state, Post.title, Post.content,
                            Post.post_date, Item.category, Item.name, Item.brand, Item.condition,
                            Item.original_price, Item.selling_price, Post.post_id).join(User, User.username == Post.username). \
        join(Item, User.username == Item.username).all()

    posts = posts0 + posts1
    postList = [0] * len(posts)

    for i, post in enumerate(posts):
        # print("\n\n post: \n", post)
        jsonObj = {
            "username": post[0],
            "userPhone": post[1],
            "userEmail": post[2],
            "userCity": post[3],
            "userState": post[4],
            "title": post[5],
            "content": post[6],
            "post_date": post[7],
            "category": post[8],
            "itemName": post[9],
            "itemBrand": post[10],
            "itemCondition": post[11],
            "original_price": post[12],
            "selling_price": post[13],
            "post_id": post[14]
        }
        # print("\n\njsonObj: \n", jsonObj)
        postList[i] = jsonObj
        result = {'posts': postList}

    return result
#     render_template('home.html', posts=posts)


@app.route("/about")
def about():
    return render_template('about.html', title='About')


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data, phone=form.phone.data, address=form.address.data,
                    city=form.city.data, state=form.state.data, zipcode=form.zipcode.data)
        cur_session = find_db(form.username.data)
        cur_session.add(user)
        cur_session.commit()
        flash('You have successfully become a Meowdom member today!', 'success')
        return redirect(url_for('postNow'))
    return render_template('register.html', title='Register', form=form)


@app.route("/postNow", methods=['GET', 'POST'])
def postNow():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(username=form.username.data, title=form.title.data, content=form.content.data)
        item = Item(username=form.username.data, name=form.name.data, category=form.category.data,
                    original_price=form.original_price.data, selling_price=form.selling_price.data,
                    condition=form.condition.data, brand=form.brand.data)
        cur_session = find_db(form.username.data)
        cur_session.add(post)
        cur_session.add(item)
        cur_session.commit()
        flash('You have successfully become a Meowdom member today!', 'success')
        return redirect(url_for('home'))
    return
#     render_template('postNow.html', title='Post', form=form)
