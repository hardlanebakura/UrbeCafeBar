from flask import Flask, render_template, request, redirect, url_for, jsonify, session, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from datetime import datetime
from items import items, metodos
from config import *
from dotenv import dotenv_values
from log_config import logging
from subsidiary_functions import *
from routing.routes import index_pages
from routing.routes_cafes import cafes_pages
from routing.routes_chas import chas_pages
from routing.routes_emporio import emporio_pages
from routing.routes_aprendamais import aprendamais_pages
from routing.routes_profile import profile_pages

app.register_blueprint(index_pages)
app.register_blueprint(cafes_pages)
app.register_blueprint(chas_pages)
app.register_blueprint(emporio_pages)
app.register_blueprint(aprendamais_pages)
app.register_blueprint(profile_pages)

ADMINS = dotenv_values("admins.env")["ADMINS"]

#for i in items:
    #ni = Item(title = i['title'], pricing = i['pricing'], imagesource = i['imagesource'])
    #db.session.add(ni)
    #db.session.commit()

    #commented these lines in order to prevent multiple adds to the database

@app.route("/fav", methods = ["GET", "POST"])
def fav():

    if request.method == "POST":
        return post_with_searchbar()
    if current_user.is_anonymous:
        return render_template("fav.html", items = items)
    loggedinuser = current_user.username
    return render_template("fav.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)

@app.route("/cart", methods = ["GET", "POST"])
def cart():

    if request.method == "POST":
        if request.form['submit'] == 'b':
            return redirect("/")
        else:
            return post_with_searchbar()
    if current_user.is_anonymous:
        return render_template("cart.html", items = items)
    loggedinuser = current_user.username
    return render_template("cart.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)

@app.route("/register", methods = ["GET", "POST"])
def register():

    if request.method == "POST":
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

    return render_template("register.html")

@app.route("/logout")
@login_required
def logout():

    currentuser = current_user.username
    logout_user()
    return render_template("logout.html", currentuser=currentuser)

@app.route("/blogs", methods = ["GET", "POST"])
def blogs():

    if request.method == "POST":
        blog_title = request.form['title']
        blog_content = request.form['content']
        blog_author = current_user.username
        blog_datetime = datetime.utcnow()
        x = datetime(blog_datetime.year, blog_datetime.month, blog_datetime.day, blog_datetime.hour,
                     blog_datetime.minute, blog_datetime.second)
        logging.debug(x)
        new_blog = Blog(title=blog_title, content = blog_content, author=blog_author, datetime=x)
        db.session.add(new_blog)
        db.session.commit()
        if request.endpoint == '/edit/<int:id>': logging.debug("going to editing")
        # < link
        # href = "{{ url_for('static/assets/', filename='a.css') }}"
        # rel = "stylesheet"
        # type = "text/css" >
        return redirect("/blogs")
    else:
        all_blogs = Blog.query.order_by(Blog.datetime).all()
        all_blogs.reverse()
        loggedinuser = current_user.username
        return render_template("blogs.html", loggedinuser = loggedinuser, blogs=all_blogs, author = current_user.username)

@app.route("/blogs/delete/<int:id>")
def delete(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return redirect("/blogs")

@app.route("/edit/<int:id>", methods = ["GET", "POST"])
def edit(id):

    blog = Blog.query.get_or_404(id)
    if request.method == "POST":

        blog.title = request.form['title']
        blog.content = request.form['content']
        blog.author = current_user.username
        db.session.commit()

        return redirect("/blogs")
    else:
        return render_template("edit.html", blog = blog)

@app.route("/allusers")
@login_required
def allusers():

    u_list = []

    for i in range(len(User.query.all())):
        email = User.query.all()[i].email
        username = User.query.all()[i].username
        isadmin = User.query.all()[i].isadmin
        u_list.append({

            "email":email,
            "username":username,
            "isadmin":isadmin

        })

    return(jsonify("All registered users", u_list))

if (__name__ == "__main__"):
    app.run(debug=True)