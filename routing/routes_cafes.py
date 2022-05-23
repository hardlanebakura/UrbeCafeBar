from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

cafes_pages = Blueprint('cafes', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@cafes_pages.route("/cafes", methods = ["POST"])
def cafes_post():
    return post_with_searchbar()

@cafes_pages.route("/cafes")
def cafes():

    if current_user.is_anonymous:
        return render_template("cha.html", items = items)
    loggedinuser = current_user.username
    return render_template("cafes.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)