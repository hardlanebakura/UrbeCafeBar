from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os
from dotenv import dotenv_values

ADMINS = dotenv_values("admins.env")["ADMINS"]

register_pages = Blueprint('register', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@register_pages.route("/register", methods = ["POST"])
def register_post():

    email = request.form['email']
    username = request.form['username_11']
    password = request.form['password_11']
    nu = User(email = email, username=username, password=password)
    if nu.username in ADMINS:
        nu.isadmin = True
    db.session.add(nu)
    db.session.commit()
    login_user(nu)
    session['username'] = current_user.username
    loggedinuser = current_user.username
    return redirect("/")

@register_pages.route("/register")
def register():

    return render_template("register.html")