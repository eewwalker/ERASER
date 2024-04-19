import os
from io import BytesIO
from PIL.ExifTags import TAGS
from PIL import Image
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv

load_dotenv()

aws_access_key_id = os.environ['aws_access_key_id']
aws_secret_access_key = os.environ['aws_secret_access_key']
region_name = os.environ['region_name']
bucket_name = os.environ['BUCKET_NAME']

BASE_URL = f'https://{bucket_name}.s3.{region_name}.amazonaws.com/'

s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id,
                  aws_secret_access_key=aws_secret_access_key,
                  region_name=region_name)


###############################################################################


def upload_image_s3(file, bucket_name, filename):
    """"Upload image to s3 bucket."""
    # breakpoint()
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            filename
        )
    except ClientError as e:
        print("error", e)

    except Exception as e:
        print("Error occured", e)

    return '{} uploaded'.format(filename)


def get_image_and_convert_to_bytes(image_id):
    """get the image from s3 bucket"""
    image_path = f'{BASE_URL}{image_id}'
    print('ultils image_path & image_id & URL ',
          image_path, image_id, BASE_URL)
    # fetch img from AWS
    try:
        response = s3.get_object(Bucket=bucket_name, Key=image_id)
        # read contents of file
        image_data = response['Body'].read()
        breakpoint()
        image_bytes = BytesIO(image_data)
        # Rewind to the start of the file
        image_bytes.seek(0)
        return image_bytes
    except Exception as e:
        return f'Failed to process {image_id} {e}'

# format = 'png'-> test without format.
def convert_img_bw(tempfile):
    """convert image to black and white"""

    image = Image.open(tempfile)
    breakpoint()
    bw_image = image.convert('L')
    newfile_to_upload = BytesIO()
    bw_image.save(newfile_to_upload, format='png')

    return newfile_to_upload


def get_image_metadata(image_path):
    """Extract metadata from image."""
    try:
        img = Image.open(image_path)
        exif_data = img._getexif()
        print(exif_data, "*****************")
        metadata = {}

        if exif_data is None:
            return {
                'date_time': '1',
                'iso': 1,
                'height': 1,
                'width': 1,
                'color': 1,
                'make': '1'
            }

        for tag, value in exif_data.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == 'DateTime':
                metadata['date_time'] = value or '1'
            if tag_name == 'ISOSpeedRatings':
                metadata['iso'] = value or 1
            if tag_name == 'ExifImageHeight':
                metadata['height'] = value or 1
            if tag_name == 'ExifImageWidth':
                metadata['width'] = value or 1
            if tag_name == 'ColorSpace':
                metadata['color'] = value or 1
            if tag_name == 'Make':
                metadata['make'] = value or '1'

        return metadata

    except (AttributeError):
        return None
