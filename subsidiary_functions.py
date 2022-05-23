from flask import Flask, render_template, request, redirect, url_for, jsonify, session, flash, Blueprint
from config import *
from db_models import *
from log_config import logging
from operator import itemgetter
from create_app import create_app

app = create_app()

def post_with_searchbar():

    item1 = request.form['searchbar_content']
    item2 = request.form['searchbar_2_content']
    item3 = request.form['searchbar_3_content']
    item4 = request.form['searchbar_4_content']
    session['searchbar_content'] = item1
    session['searchbar_2_content'] = item2
    session['searchbar_3_content'] = item3
    session['searchbar_4_content'] = item4
    return redirect(item2)