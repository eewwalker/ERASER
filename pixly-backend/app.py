import os
from dotenv import load_dotenv
import boto3

from flask import (
    Flask, render_template, request, flash, redirect, session, g, abort,
)
from flask_debugtoolbar import DebugToolbarExtension


from forms import (
    UserAddForm, UserEditForm, LoginForm, MessageForm, CSRFProtection,
)


load_dotenv()


app = Flask(__name__)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
aws_access_key_id = os.environ['aws_access_key_id']
aws_secret_access_key = os.environ['aws_secret_access_key']
region_name = os.environ['region_name']

s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id,
                  aws_secret_access_key=aws_secret_access_key,
                  region_name=region_name)


toolbar = DebugToolbarExtension(app)



##############################################################################
# User signup/login/logout


# @app.before_request
# def add_user_to_g():
#     """If we're logged in, add curr user to Flask global."""

#     if CURR_USER_KEY in session:
#         g.user = User.query.get(session[CURR_USER_KEY])

#     else:
#         g.user = None


# @app.before_request
# def add_csrf_only_form():
#     """Add a CSRF-only form so that every route can use it."""

#     g.csrf_form = CSRFProtection()


# def do_login(user):
#     """Log in user."""

#     session[CURR_USER_KEY] = user.id


# def do_logout():
#     # """Log out user."""

#     # if CURR_USER_KEY in session:
#     #     del session[CURR_USER_KEY]


# @app.route('/signup', methods=["GET", "POST"])




# @app.route('/login', methods=["GET", "POST"])


@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404


@app.after_request
def add_header(response):
    """Add non-caching headers on every request."""

    # https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
    response.cache_control.no_store = True
    return response
