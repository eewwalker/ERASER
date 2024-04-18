import os
from flask import (Flask, request, json, jsonify)
from dotenv import load_dotenv
from models import db, connect_db, Metadata
from flask_debugtoolbar import DebugToolbarExtension
from utils import upload_image_s3 as upload, get_image_metadata as metadata, \
    convert_img_bw, get_image_and_convert_to_bytes
from flask_bcrypt import Bcrypt
from flask_cors import CORS

bcrypt = Bcrypt()

load_dotenv()

app = Flask(__name__)
CORS(app, origins='*')


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
    metadata in DB, and responds with user's image (str)."""

    file = request.files['file']

    author = request.form['author']

    img_metadata = metadata(file)
    breakpoint()
    # Uploads image to s3 and responds with image(str)
    if file:
        filename = file.filename

        output = upload(file, bucket_name, filename)
        metadata_submit = Metadata.add_image_metadata(
            img_metadata, filename, author)
        print("Success! metadata_submit:", metadata_submit)
        return str(output)


@app.get('/photos')
def get_all_photos():
    """Get all photos by key from DB."""
    all_keys = Metadata.query.with_entities(Metadata.key).all()

    allkeys_list = [key[0] for key in all_keys]

    return jsonify(allkeys_list)


@app.post('/edit-photo/<id>')
def edit_image(id):
    """Edit image based on id and filter """
    print('id***********', id)
    try:
        data = request.get_json()
        print('data', data)
        # image_id = request.json['id']
        convert_bw_filter = data.get('convert_bw', False)
        print('convert_bw', convert_bw_filter)

        image_bytes = get_image_and_convert_to_bytes(id)
        print('image_bytes', image_bytes)

        if convert_bw_filter:
            image = convert_img_bw(image_bytes)
            print('imageInpost', image)
            image.seek(0)
            upload(image, bucket_name, id)

        return {'status': 'success'}

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
