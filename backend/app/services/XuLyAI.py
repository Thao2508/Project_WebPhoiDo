# =========================================================
# services/XuLyAI.py
# =========================================================

import os
import requests
import cloudinary.uploader

from dotenv import load_dotenv

from PIL import Image
from io import BytesIO

import app.core.cloudinary_config

from app.models.LoaiTrangPhuc import LoaiTrangPhuc
from app.models.Mau import Mau
from app.models.HoaTiet import HoaTiet


load_dotenv()

LYKDAT_API_KEY = os.getenv(
    "LYKDAT_API_KEY"
)


def hex_to_rgb(hex_color):

    hex_color = hex_color.lstrip('#')

    return tuple(

        int(hex_color[i:i+2], 16)

        for i in (0, 2, 4)
    )


def color_distance(rgb1, rgb2):

    return (

        (rgb1[0] - rgb2[0]) ** 2 +

        (rgb1[1] - rgb2[1]) ** 2 +

        (rgb1[2] - rgb2[2]) ** 2

    ) ** 0.5


def find_closest_color(hex_input, db):

    input_rgb = hex_to_rgb(
        hex_input
    )

    colors = db.query(
        Mau
    ).all()

    best_match = None

    min_distance = 999999

    for color in colors:

        db_rgb = hex_to_rgb(
            color.maMauHex
        )

        distance = color_distance(
            input_rgb,
            db_rgb
        )

        if distance < min_distance:

            min_distance = distance

            best_match = color

    return best_match




def find_clothing_type(ai_text, db):

    import re

    ai_text = re.sub(
        r"[^a-zA-Z ]",
        " ",
        ai_text.lower()
    )

    loai_list = db.query(
        LoaiTrangPhuc
    ).all()

    matched_results = []

    for loai in loai_list:

        if not loai.tuKhoaNhanDien:
            continue

        keywords = [

            k.strip().lower()

            for k in
            loai.tuKhoaNhanDien.split(",")

            if k.strip()
        ]

        for keyword in keywords:

            if keyword in ai_text:

                matched_results.append({

                    "loai": loai,

                    "keyword": keyword,

                    "length": len(keyword)
                })

    # =====================================================
    # FEATURE RULE
    # =====================================================

    # BLOUSE / ÁO KIỂU

    if (

        "collar" in ai_text

        and

        (
            "ruffle" in ai_text
            or
            "frill" in ai_text
            or
            "puff sleeve" in ai_text
            or
            "balloon sleeve" in ai_text
        )
    ):

        blouse = db.query(
            LoaiTrangPhuc
        ).filter(
            LoaiTrangPhuc.tenLoai.like(
                "%Blouse%"
            )
        ).first()

        if blouse:
            return blouse

    # CROPTOP

    if (
        "cropped" in ai_text
        or
        "crop top" in ai_text
    ):

        crop = db.query(
            LoaiTrangPhuc
        ).filter(
            LoaiTrangPhuc.tenLoai.like(
                "%croptop%"
            )
        ).first()

        if crop:
            return crop

    # =====================================================
    # KHÔNG MATCH
    # =====================================================

    if not matched_results:

        # fallback generic

        if "top" in ai_text:

            return db.query(
                LoaiTrangPhuc
            ).filter(
                LoaiTrangPhuc.tenLoai.like(
                    "%Áo thun%"
                )
            ).first()

        if (
            "jeans" in ai_text
            or
            "denim" in ai_text
        ):

            return db.query(
                LoaiTrangPhuc
            ).filter(
                LoaiTrangPhuc.tenLoai.like(
                    "%Jean%"
                )
            ).first()

        return None

    # =====================================================
    # ƯU TIÊN KEYWORD DÀI NHẤT
    # =====================================================

    matched_results.sort(

        key=lambda x: x["length"],

        reverse=True
    )

    return matched_results[0]["loai"]




def detect_pattern(ai_text, db):

    ai_text = ai_text.lower()

    hoa_tiets = db.query(
        HoaTiet
    ).all()

    for item in hoa_tiets:

        if (
            item.tenHoaTiet.lower()
            in ai_text
        ):

            return item

    return (
        hoa_tiets[0]
        if hoa_tiets
        else None
    )



def detect_kieu_dang(ai_text):

    ai_text = ai_text.lower()

    if (
        "crop top" in ai_text
        or "croptop" in ai_text
        or "cropped top" in ai_text
    ):

        return "Croptop"

    if (
        "oversized" in ai_text
        or "baggy" in ai_text
    ):

        return "Rộng"

    if (
        "skinny" in ai_text
        or "slim fit" in ai_text
        or "body fit" in ai_text
    ):

        return "Ôm"

    if (
        "wide leg" in ai_text
        or "culottes" in ai_text
    ):

        return "Ống rộng"

    if (
        "maxi" in ai_text
        or "long skirt" in ai_text
    ):

        return "Dài"

    if (
        "mini skirt" in ai_text
        or "shorts" in ai_text
    ):

        return "Ngắn"

    if "ripped" in ai_text:

        return "Rách"

    if "pleated" in ai_text:

        return "Xếp ly"

    if (
        "ruffle" in ai_text
        or "tiered" in ai_text
        or "gathering" in ai_text
    ):

        return "Tầng"

    return "Cơ bản"


# =========================================================
# MAIN DETECT
# =========================================================

async def detect_clothing(file, db):

    # =====================================================
    # CHECK API KEY
    # =====================================================

    if not LYKDAT_API_KEY:

        raise Exception(
            "Thiếu LYKDAT_API_KEY trong file .env"
        )


    # =====================================================
    # UPLOAD CLOUDINARY
    # =====================================================

    upload_result = (
        cloudinary.uploader.upload(
            file.file
        )
    )

    image_url = upload_result[
        "secure_url"
    ]


    # =====================================================
    # DOWNLOAD IMAGE
    # =====================================================

    image_response = requests.get(
        image_url
    )

    if image_response.status_code != 200:

        raise Exception(
            "Không tải được ảnh từ Cloudinary"
        )


    # =====================================================
    # CALL AI API
    # =====================================================

    api_url = (
        "https://cloudapi.lykdat.com"
        "/v1/detection/tags"
    )

    headers = {

        "X-Api-Key":
        LYKDAT_API_KEY
    }

    response = requests.post(

        api_url,

        headers=headers,

        files={

            "image": (
                "image.jpg",
                image_response.content,
                "image/jpeg"
            )
        }
    )


    # =====================================================
    # CHECK AI API
    # =====================================================

    if response.status_code != 200:

        print(response.text)

        raise Exception(

            f"AI API lỗi: {response.text}"
        )


    result = response.json()

    print(result)


    ai_text = ""
    items = result.get(
        "data",
        {}
    ).get(
        "items",
        []
    )

    for item in items:

        name = item.get(
            "name",
            ""
        )

        ai_text += " " + name
    labels = result.get(
        "data",
        {}
    ).get(
        "labels",
        []
    )

    for label in labels:

        name = label.get(
            "name",
            ""
        )

        ai_text += " " + name
    ai_text = ai_text.lower()
    print("AI TEXT:", ai_text)


    loai = find_clothing_type(
        ai_text,
        db
    )


    image = Image.open(

        BytesIO(
            image_response.content
        )

    ).convert("RGB")

    image = image.resize(
        (100, 100)
    )

    width, height = image.size

    crop = image.crop(
        (
            width * 0.2,
            height * 0.2,
            width * 0.8,
            height * 0.8
        )
    )
    pixels = list(
        crop.getdata()
    )

    avg_color = tuple(

        sum(
            p[i]
            for p in pixels
        ) // len(pixels)

        for i in range(3)
    )

    hex_color = (
        '#%02x%02x%02x'
        % avg_color
    )

    mau = find_closest_color(
        hex_color,
        db
    )


    # =====================================================
    # FIND PATTERN
    # =====================================================

    hoa_tiet = detect_pattern(
        ai_text,
        db
    )


    # =====================================================
    # FIND KIỂU DÁNG
    # =====================================================

    kieu_dang = detect_kieu_dang(
        ai_text
    )


    # =====================================================
    # RESULT
    # =====================================================

    return {

        "imageUrl":
        image_url,

        "aiText":
        ai_text,

        "loai": {

            "maLoai":
            loai.maLoai
            if loai else None,

            "tenLoai":
            loai.tenLoai
            if loai else None
        },

        "mau": {

            "maMau":
            mau.maMau
            if mau else None,

            "tenMau":
            mau.tenMau
            if mau else None
        },

        "hoaTiet": {

            "maHoaTiet":
            hoa_tiet.maHoaTiet
            if hoa_tiet else None,

            "tenHoaTiet":
            hoa_tiet.tenHoaTiet
            if hoa_tiet else None
        },

        "kieuDang":
        kieu_dang
    }