from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

profile_pages = Blueprint('profile', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@profile_pages.route("/profile", methods = ["POST"])
@login_required
def profile_post():

    return post_with_searchbar()

@profile_pages.route("/profile")
@login_required
def profile():

    loggedinuser = current_user.username
    profilecreated1 = current_user.datetime
    profilecreated = profilecreated1.strftime("%Y %m %d")
    return render_template("profile.html", loggedinuser=loggedinuser, profilecreated = profilecreated, isadmin = current_user.isadmin, items = items)