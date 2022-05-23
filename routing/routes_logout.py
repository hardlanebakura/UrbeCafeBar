from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

logout_pages = Blueprint('logout', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@logout_pages.route("/logout")
@login_required
def logout():

    currentuser = current_user.username
    logout_user()
    return render_template("logout.html", currentuser=currentuser)