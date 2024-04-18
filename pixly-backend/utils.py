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
    breakpoint()
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
        print('BEFOREbucket_name', 'image_path', bucket_name, image_path)
        response = s3.get_object(Bucket=bucket_name, Key=image_id)
        print('bucket_name', 'image_path', bucket_name, image_path)
        print('resp', response)
        # read contents of file
        image_data = response['Body'].read()
        breakpoint()
        image_bytes = BytesIO(image_data)
        test_image = Image.open(image_bytes)
        print('testIMAEG', test_image)
        # Rewind to the start of the file
        image_bytes.seek(0)
        return image_bytes
    except Exception as e:
        return f'Failed to process {image_id} {e}'


def convert_img_bw(image_bytes):
    """convert image to black and white"""
    print('imgInfuncB&W', image_bytes)
    # output_path = image_bytes
    # img.save(output_path)
    image = Image.open(image_bytes)
    print('imgInFunc', image)
    bw_image = image.convert('L')
    print('b&w', bw_image)
    return bw_image


def get_image_metadata(image_path):
    """Extract metadata from image."""
    try:

        img = Image.open(image_path)
        # look into .getexif()
        exif_data = img.getexif()
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
            # make a func for GPS to parse info before it gets into DB.
            # if tag_name == 'GPSInfo':
            #     print(type(value), "gps TYPE VALUE***********")
            #     print(value, "gps TYPE VALUE***********")
                # metadata['location'] = value
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
