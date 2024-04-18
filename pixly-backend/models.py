"""SQLAlchemy models for Pixly."""

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Metadata(db.Model):
    """Metadata table."""

    __tablename__ = 'metadata'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
    )

    date_time = db.Column(
        db.String,
        nullable=True,
    )

    iso = db.Column(
        db.Integer,
        nullable=True,
    )
    # location = db.Column(
    #     db.string,
    #     nullable=True,
    # )

    height = db.Column(
        db.Integer,
        nullable=True,
    )

    width = db.Column(
        db.Integer,
        nullable=True,
    )

    color = db.Column(
        db.Integer,
        nullable=True,
    )

    make = db.Column(
        db.String,
        nullable=True,
    )

    author = db.Column(
        db.String(50),
        nullable=True,
    )

    key = db.Column(
        db.String(20),
        nullable=False

    )

    @classmethod
    def add_image_metadata(cls, img_metadata, filename, author):
        """Adds metadata to database."""

        image_metadata = Metadata(date_time=img_metadata.get('date_time'),
                                  iso=img_metadata.get('iso'),
                                  height=img_metadata.get('height'),
                                  width=img_metadata.get('width'),
                                  color=img_metadata.get('color'),
                                  make=img_metadata.get('make'),
                                  key=filename,
                                  author=author)

        db.session.add(image_metadata)
        db.session.commit()
        return image_metadata


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    app.app_context().push()
    db.app = app
    db.init_app(app)
