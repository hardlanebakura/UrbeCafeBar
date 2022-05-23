from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

emporio_pages = Blueprint('emporio', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@emporio_pages.route("/emporio", methods = ["POST"])
def emporio_post():

    return post_with_searchbar()

@emporio_pages.route("/emporio")
def emporio():

    if current_user.is_anonymous:
        return render_template("emporio.html", items = items)
    loggedinuser = current_user.username
    return render_template("emporio.html", loggedinuser=loggedinuser, isadmin=current_user.isadmin, items = items)