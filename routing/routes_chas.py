from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

chas_pages = Blueprint('chas', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@chas_pages.route("/cha", methods = ["POST"])
def chas_post():
    return post_with_searchbar()

@chas_pages.route("/cha")
def chas():

    if current_user.is_anonymous:
        return render_template("cha.html", items = items)
    loggedinuser = current_user.username
    return render_template("cha.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)