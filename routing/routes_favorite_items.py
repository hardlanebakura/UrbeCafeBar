from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

favorite_items_pages = Blueprint('favorites', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@favorite_items_pages.route("/fav", methods = ["POST"])
def favorite_items_post():
        return post_with_searchbar()

@favorite_items_pages.route("/fav")
def favorite_items():
    if current_user.is_anonymous:
        return render_template("fav.html", items = items)
    loggedinuser = current_user.username
    return render_template("fav.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)