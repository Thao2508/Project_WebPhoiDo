from app.core import cloudinary_config

import cloudinary.uploader


def upload_image(file):

    result = cloudinary.uploader.upload(

        file.file,

        folder="web_phoi_do"
    )

    return result["secure_url"]
