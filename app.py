from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from datetime import datetime
from items import items, metodos
from config import *
from admins import LIST_OF_ADMINS

app = Flask(__name__)

set_config(app.config, app.jinja_env)

db = SQLAlchemy(app)
SESSION_TYPE = 'sqlalchemy'
app.config.from_object(__name__)
login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    datetime = db.Column(db.DateTime, default = datetime.utcnow)
    isadmin = db.Column(db.Boolean, default = False)

    def __repr__(self):
        return "User " + str(self.id)

class Blog(UserMixin, db.Model):
    __bind_key__ = "blogs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    datetime = db.Column(db.DateTime, default = datetime.utcnow)

    def __repr__(self):
        return "Blog " + str(self.id)

class Item(db.Model):
    __bind_key__ = "items"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    pricing = db.Column(db.String, nullable=False)
    imagesource = db.Column(db.String, nullable=False)

    def __repr__(self):
        return "Item " + str(self.id)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

#for i in items:
    #ni = Item(title = i['title'], pricing = i['pricing'], imagesource = i['imagesource'])
    #db.session.add(ni)
    #db.session.commit()

    #commented these lines in order to prevent multiple adds to the database

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

@app.route("/", methods = ["GET", "POST"])
def index():

    if request.method == "POST":
        if (request.form['submit'] == "LOGIN"):
            print("Redirecting via login form")
            su1 = request.form['username_1']
            sp1 = request.form['password_1']
            check_login = User.query.filter_by(username="%s" % su1).first()
            if (check_login == None):
                currentislogged_in = current_user.is_anonymous
                print(current_user.is_anonymous)
                if (current_user.is_anonymous): return render_template("index.html")
            passwords_match = check_login.password == sp1
            print(passwords_match)
            if (check_login):
                if not passwords_match:
                    print("Passwords didnt match")
                    listofnewblogs = []
                    j = -1
                    for i in range(len(Blog.query.all())):
                        if i == 3: break
                        listofnewblogs.append(Blog.query.all()[i])
                        j = j - 1
                    #passwords didnt match
                    return render_template("index.html", listofnewblogs=listofnewblogs, items = items)
                else:
                    print("Passwords matching!")
                    login_user(check_login)
                    session['username'] = current_user.username
                    listofnewblogs = []
                    j = -1
                    for i in range(len(Blog.query.all())):
                        if i == 3: break
                        listofnewblogs.append([Blog.query.all()[j].title.capitalize(), Blog.query.all()[j].content.capitalize(), Blog.query.all()[j].author])
                        j = j - 1
                        #user logged in
                    return render_template("index.html", loggedinuser=current_user.username, listofnewblogs = listofnewblogs, isadmin = current_user.isadmin, items = items)
            return redirect("/")
        else:
            # posting via searchbar
            return post_with_searchbar()
    listofnewblogs = []
    j = -1
    for i in range(len(Blog.query.all())):
        if i == 3: break
        listofnewblogs.append([Blog.query.all()[j].title.capitalize(), Blog.query.all()[j].content.capitalize(), Blog.query.all()[j].author])
        j = j - 1

    if current_user.is_anonymous:
        #get for non login
        return render_template("index.html", listofnewblogs = listofnewblogs, items = items)
    #get for login
    return render_template("index.html", loggedinuser=current_user.username, isadmin = current_user.isadmin, listofnewblogs = listofnewblogs, items = items)

@app.route("/<int:id>", methods = ["GET", "POST"])
def item(id):

    if request.method == "POST":
        return post_with_searchbar()
    else:
        item1 = items[id]['title']
        item2 = id
        item3 = items[id]['pricing']
        item4 = items[id]['imagesource']
        if current_user.is_anonymous:
            # get for non login
            return render_template("item.html", items=items, item1 = item1, item2 = item2, item3 = item3, item4 = item4)
        # get for login
        return render_template("item.html", loggedinuser=current_user.username, isadmin=current_user.isadmin, items=items, item1 = item1, item2 = item2, item3 = item3, item4 = item4)

@app.route("/cafes", methods = ["GET", "POST"])
def cafes():

    if request.method == "POST":
        return post_with_searchbar()
    if current_user.is_anonymous:
        return render_template("cafes.html", items = items)
    loggedinuser = current_user.username
    return render_template("cafes.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)

@app.route("/cha", methods = ["GET", "POST"])
def cha():

    if request.method == "POST":
        return post_with_searchbar()
    if current_user.is_anonymous:
        return render_template("cha.html", items = items)
    loggedinuser = current_user.username
    return render_template("cha.html", loggedinuser=loggedinuser, isadmin = current_user.isadmin, items = items)

@app.route("/emporio", methods = ["GET", "POST"])
def emporio():

    if request.method == "POST":
        return post_with_searchbar()
    if current_user.is_anonymous:
        return render_template("emporio.html", items = items)
    loggedinuser = current_user.username
    return render_template("emporio.html", loggedinuser=loggedinuser, isadmin=current_user.isadmin, items = items)

@app.route("/aprendamais", methods = ["GET", "POST"])
def aprendamais():

    if request.method == "POST":
        return post_with_searchbar()
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

@app.route("/profile")
@login_required
def profile():

    loggedinuser = current_user.username
    profilecreated1 = current_user.datetime
    profilecreated = profilecreated1.strftime("%Y %m %d")
    return render_template("profile.html", loggedinuser=loggedinuser, profilecreated = profilecreated, isadmin = current_user.isadmin, items = items)

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
        if nu.username in LIST_OF_ADMINS:
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
        print(x)
        new_blog = Blog(title=blog_title, content = blog_content, author=blog_author, datetime=x)
        db.session.add(new_blog)
        db.session.commit()
        if request.endpoint == '/edit/<int:id>': print("going to editin")
        # < link
        # href = "{{ url_for('static/assets/', filename='a.css') }}"
        # rel = "stylesheet"
        # type = "text/css" >
        return redirect("/blogs")
    else:
        all_blogs = Blog.query.order_by(Blog.datetime).all()
        all_blogs.reverse()
        return render_template("blogs.html", blogs=all_blogs, author = current_user.username)

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