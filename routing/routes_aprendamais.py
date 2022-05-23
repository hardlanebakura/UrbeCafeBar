from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Blueprint, abort
from flask_cors import CORS, cross_origin
from subsidiary_functions import *
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from log_config import logging
from items import items, metodos
import time
import os

aprendamais_pages = Blueprint('aprendamais', __name__,
                        template_folder='Templates', static_folder='static', url_prefix = "/")

@aprendamais_pages.route("/aprendamais", methods = ["POST"])
def aprendamais_post():

    return post_with_searchbar()

@aprendamais_pages.route("/aprendamais")
def aprendamais():

    listofnewblogs = []
    j = -1
    for i in range(len(Blog.query.all())):
        if i == 3: break
        listofnewblogs.append([Blog.query.all()[j].title.capitalize(), Blog.query.all()[j].content.capitalize(),
                               Blog.query.all()[j].author])
        j = j - 1
    if current_user.is_anonymous:
        return render_template("aprendamais.html", listofnewblogs = listofnewblogs, items=items, metodos=metodos)
    loggedinuser = current_user.username
    return render_template("aprendamais.html", listofnewblogs = listofnewblogs, loggedinuser=loggedinuser, isadmin=current_user.isadmin, items=items, metodos=metodos)