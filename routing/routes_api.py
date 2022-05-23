from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

api_pages = Blueprint('api', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/api")

@api_pages.route("/")
def api():
    d = User.query.all()
    return jsonify({"All_users":d})