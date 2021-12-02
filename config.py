def set_config(dict, env):
    #setting app.config
    dict['SECRET_KEY'] = 'secretkey1'
    dict['SQLALCHEMY_DATABASE_URI'] = "sqlite:///users.db"
    dict['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    dict['SQLALCHEMY_BINDS'] = {"blogs": "sqlite:///blogs.db", "items": "sqlite:///items.db"}
    dict['TEMPLATES_AUTO_RELOAD'] = True
    dict["CACHE_TYPE"] = "redis"

    # setting jinja_env
    env.auto_reload = True
    env.cache = {}



