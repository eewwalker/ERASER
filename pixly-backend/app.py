import os
from flask import (Flask, render_template, request,
                   flash, redirect, session, g, json)
from dotenv import load_dotenv
from models import db, connect_db, Metadata
from flask_debugtoolbar import DebugToolbarExtension
from utils import upload_image_s3 as upload, get_image_metadata as metadata
from flask_bcrypt import Bcrypt
from flask_cors import CORS

bcrypt = Bcrypt()

load_dotenv()

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
toolbar = DebugToolbarExtension(app)
bucket_name = os.environ['BUCKET_NAME']

connect_db(app)

##############################################################################


@app.post('/photo')
def upload_image():
    """Upload image to s3, and extracts metadata from image. Stores
    metadata in database, and responds with user's image (str)"""

    file = request.files['file']
    author = request.form['author']
    print(author, file, "AUTHOR AND FILE*******")
    # img_metadata insert into DB
    img_metadata = metadata(file)

    metadata_submit = Metadata.add_image_metadata(img_metadata, author)
    print(metadata_submit, "metaDataSUBMIT*********")

    # Uploads image to s3 and responds with image(str)
    if file:
        filename = file.filename
        output = upload(file, bucket_name, filename)
        print('imgMETADATA', img_metadata)
        metadata_submit = Metadata.add_image_metadata(img_metadata, filename)
        return str(output)

    # if user -> user.metadata (use User.signup)
    # if not -> user.metadata


@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404
