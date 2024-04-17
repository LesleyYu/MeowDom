from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from flaskblog.models import User
from flaskblog import app, db, session0, session1


class RegistrationForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=200)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    phone = IntegerField('Phone', validators=[DataRequired()])
    address = TextAreaField('Address',  validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zipcode = IntegerField('Zipcode', validators=[DataRequired()])
    submit = SubmitField('Sign Up')

    def validate_username(self, username):
        user1 = session0().query(User).filter_by(username=username.data).first()
        user2 = session1().query(User).filter_by(username=username.data).first()

        # user = User.query.filter_by(username=username.data).first()
        if user1 or user2:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user1 = session0().query(User).filter_by(email=email.data).first()
        user2 = session1().query(User).filter_by(email=email.data).first()
        # user = User.query.filter_by(email=email.data).first()
        if user1 or user2:
            raise ValidationError('That email is taken. Please choose a different one.')


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    original_price = FloatField('Original Price', validators=[DataRequired()])
    selling_price = FloatField('Selling Price', validators=[DataRequired()])
    category = StringField('Category', validators=[DataRequired()])
    condition = StringField('Condition', validators=[DataRequired()])
    name = StringField('Item Name', validators=[DataRequired()])
    brand = StringField('Brand', validators=[DataRequired()])
    submit = SubmitField('Post')
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=200)])

    def validate_username(self, username):
        user1 = session0().query(User).filter_by(username=username.data).first()
        user2 = session1().query(User).filter_by(username=username.data).first()

        # user = User.query.filter_by(username=username.data).first()
        if not(user1) and not(user2):
            raise ValidationError('Not a Moewdomer? Please be a member with us first!')
