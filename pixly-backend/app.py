import os
from flask import (Flask, render_template, request,
                   flash, redirect, session, g, json)
from dotenv import load_dotenv
from flask_debugtoolbar import DebugToolbarExtension
import boto3
from PIL import Image
from PIL.ExifTags import TAGS
import io


load_dotenv()
app = Flask(__name__)

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
toolbar = DebugToolbarExtension(app)

aws_access_key_id = os.environ['aws_access_key_id']
aws_secret_access_key = os.environ['aws_secret_access_key']
region_name = os.environ['region_name']
bucket_name = os.environ['BUCKET_NAME']

s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id,
                  aws_secret_access_key=aws_secret_access_key,
                  region_name=region_name)


##############################################################################
def upload_image_s3(file, bucket_name, filename):
    """"Upload image to s3 bucket"""
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            filename
        )
    except Exception as e:
        print("error", e)
    return '{} uploaded'.format(filename)


def get_image_date(image_path):
    try:

        img = Image.open(image_path)

        exif_data = img._getexif()


        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == 'DateTime':
                return value
    except (AttributeError, KeyError, IndexError):
        pass

    return None



@app.post('/photo')
def testimage():
    """test image"""

    file = request.files['file']
    img_data = file.read()
    img_stream = io.BytesIO(img_data)
    img = Image.open(img_stream)
    print('img**********', img)
    metadata = {
        'format': img.format,
        'mode': img.mode,
        'size': img.size
    }
    print('metadata', metadata)
    print('file', file)

    if file:
        filename = file.filename
        print(filename, 'name********')
        output = upload_image_s3(file, bucket_name, filename)
        return str(output)


@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404
