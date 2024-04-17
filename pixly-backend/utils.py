import os
from PIL.ExifTags import TAGS
from PIL import Image
import boto3
from dotenv import load_dotenv

load_dotenv()

aws_access_key_id = os.environ['aws_access_key_id']
aws_secret_access_key = os.environ['aws_secret_access_key']
region_name = os.environ['region_name']
bucket_name = os.environ['BUCKET_NAME']

s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id,
                  aws_secret_access_key=aws_secret_access_key,
                  region_name=region_name)


def upload_image_s3(file, bucket_name, filename):
    """"Upload image to s3 bucket."""
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            filename
        )
    except Exception as e:
        print("error", e)
    return '{} uploaded'.format(filename)


def get_image_metadata(image_path):
    """Extract metadata from image."""
    try:

        img = Image.open(image_path)

        exif_data = img._getexif()

        metadata = {}

        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == 'DateTime':
                metadata['date_time'] = value
            if tag_name == 'ISOSpeedRatings':
                metadata['iso'] = value
            # make a func for GPS to parse info before it gets into DB.
            # if tag_name == 'GPSInfo':
            #     print(type(value), "gps TYPE VALUE***********")
            #     print(value, "gps TYPE VALUE***********")
                # metadata['location'] = value
            if tag_name == 'ExifImageHeight':
                metadata['height'] = value
            if tag_name == 'ExifImageWidth':
                metadata['width'] = value
            if tag_name == 'ColorSpace':
                metadata['color'] = value
            if tag_name == 'Make':
                metadata['make'] = value
                print(type(value), "MAKE APPLE")

        return metadata
    except (AttributeError):
        return None
