import os
from flask import (Flask, render_template, request,
                   flash, redirect, session, g, json)
from dotenv import load_dotenv
from flask_debugtoolbar import DebugToolbarExtension
import boto3
print(boto3.__version__, "*******************")



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

@app.post('/test')
def testimage():
    """test image"""

    return ('hi')


@app.errorhandler(404)
def page_not_found(e):
    """404 NOT FOUND page."""

    return render_template('404.html'), 404
