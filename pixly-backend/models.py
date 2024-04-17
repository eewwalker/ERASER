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

    @classmethod
    def add_image_metadata(cls, img_metadata):
        """Adds metadata to database."""

        image_metadata = Metadata(date_time=img_metadata['date_time'],
                                  iso=img_metadata['iso'],
                                  height=img_metadata['height'],
                                  width=img_metadata['width'],
                                  color=img_metadata['color'],
                                  make=img_metadata['make'])

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
