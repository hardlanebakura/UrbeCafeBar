from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

index_pages = Blueprint('index', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@index_pages.route("/", methods = ["POST"])
def index_post():

    if (request.form['submit'] == "LOGIN"):
        logging.debug("Redirecting via login form")
        su1 = request.form['username_1']
        sp1 = request.form['password_1']
        check_login = User.query.filter_by(username="%s" % su1).first()
        if (check_login == None):
            currentislogged_in = current_user.is_anonymous
            logging.debug(current_user.is_anonymous)
            if (current_user.is_anonymous): return render_template("index.html")
        passwords_match = check_login.password == sp1
        logging.debug(passwords_match)
        if (check_login):
            if not passwords_match:
                logging.debug("Passwords didnt match")
                listofnewblogs = []
                j = -1
                for i in range(len(Blog.query.all())):
                    if i == 3: break
                    listofnewblogs.append(Blog.query.all()[i])
                    j = j - 1
                #passwords didnt match
                return render_template("index.html", listofnewblogs=listofnewblogs, items = items)
            else:
                logging.debug("Passwords matching!")
                login_user(check_login)
                session['username'] = current_user.username
                listofnewblogs = []
                j = -1
                for i in range(len(Blog.query.all())):
                    if i == 3: break
                    listofnewblogs.append([Blog.query.all()[j].title.capitalize(), Blog.query.all()[j].content.capitalize(), Blog.query.all()[j].author])
                    j = j - 1
                    #user logged in
                return render_template("index.html", loggedinuser=current_user.username, listofnewblogs = listofnewblogs, isadmin = current_user.isadmin, items = items)
        return redirect("/")
    else:
        # posting via searchbar
        return post_with_searchbar()

@index_pages.route("/")
def index():

    listofnewblogs = []
    j = -1
    for i in range(len(Blog.query.all())):
        if i == 3: break
        listofnewblogs.append([Blog.query.all()[j].title.capitalize(), Blog.query.all()[j].content.capitalize(), Blog.query.all()[j].author])
        j = j - 1

    if current_user.is_anonymous:
        #get for non login
        return render_template("index.html", listofnewblogs = listofnewblogs, items = items)
    #get for login
    return render_template("index.html", loggedinuser=current_user.username, isadmin = current_user.isadmin, listofnewblogs = listofnewblogs, items = items)

@index_pages.route("/<int:id>", methods = ["GET", "POST"])
def item(id):

    if request.method == "POST":
        return post_with_searchbar()
    else:
        item1 = items[id]['title']
        item2 = id
        item3 = items[id]['pricing']
        item4 = items[id]['imagesource']
        if current_user.is_anonymous:
            # get for non login
            return render_template("item.html", items=items, item1 = item1, item2 = item2, item3 = item3, item4 = item4)
        # get for login
        return render_template("item.html", loggedinuser=current_user.username, isadmin=current_user.isadmin, items=items, item1 = item1, item2 = item2, item3 = item3, item4 = item4)