from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from config import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    datetime = db.Column(db.DateTime, default = datetime.utcnow)
    isadmin = db.Column(db.Boolean, default = False)

    @staticmethod
    def find_all_filter(username):
        search_matches = db.session.query(User).filter_by(username = username).all()
        if len(search_matches) > 0:
            return search_matches
        else: return None

    @staticmethod
    def find_all():
        search_matches = []
        for item in User.query.all():
            d = {}
            for var in vars(item):
                if var != "_sa_instance_state" and var != "id" and var != "password":
                    d[var] = vars(item)[var]
            search_matches.append(d)

        return search_matches

    @staticmethod
    def delete_all():
        db.session.query(User).delete()
        db.session.commit()

    @staticmethod
    def delete_one(data):
        User.query.filter_by(date = data).delete()
        db.session.commit()

    def __repr__(self):
        return "User " + str(self.id)

class Blog(UserMixin, db.Model):
    __bind_key__ = "blogs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    datetime = db.Column(db.DateTime, default = datetime.utcnow)

    def __repr__(self):
        return "Blog " + str(self.id)

class Item(db.Model):
    __bind_key__ = "items"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    pricing = db.Column(db.String, nullable=False)
    imagesource = db.Column(db.String, nullable=False)

    def __repr__(self):
        return "Item " + str(self.id)

