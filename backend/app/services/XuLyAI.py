import requests
import os

from dotenv import load_dotenv

from app.models.HoaTiet import HoaTiet

from app.services.XuLyMau import find_closest_color
from app.services.XuLyLoaiTrangPhuc import find_closest_type


load_dotenv()

API_KEY = os.getenv("LYKDAT_API_KEY")



# =====================================================
# MAP HOA TIET
# =====================================================

def map_hoa_tiet(pattern, db):

    pattern = pattern.lower()

    danh_sach = db.query(
        HoaTiet
    ).all()


    for item in danh_sach:

        ten = item.tenHoaTiet.lower()


        # =============================================
        # TRON
        # =============================================

        if (
            "plain" in pattern
            and
            (
                "trơn" in ten
                or
                "không có họa tiết" in ten
            )
        ):

            return item



        # =============================================
        # SOC
        # =============================================

        if (
            "stripe" in pattern
            and
            "sọc" in ten
        ):

            return item



        # =============================================
        # CARO
        # =============================================

        if (
            "plaid" in pattern
            and
            "caro" in ten
        ):

            return item



        # =============================================
        # GRAPHIC
        # =============================================

        if (
            "graphic" in pattern
            and
            "graphic" in ten
        ):

            return item



    # fallback

    return danh_sach[0]



# =====================================================
# DETECT CLOTHING
# =====================================================

async def detect_clothing(file, db):


    url = "https://cloudapi.lykdat.com/v1/detection/tags"


    headers = {
        "x-api-key": API_KEY
    }


    contents = await file.read()
    file.file.seek(0)
    files = {
        "image": (
            file.filename,
            contents,
            file.content_type
        )
    }

    response = requests.post(
        url,
        headers=headers,
        files=files
    )


    data = response.json()

    print(data)



    # =================================================
    # DEFAULT
    # =================================================

    category = ""

    item_type = ""

    fit_type = ""

    sleeve_type = ""

    neckline = ""

    waistline = ""

    fabric = ""

    style_type = ""

    detail_feature = ""

    pattern = ""

    hex_color = "#FFFFFF"



    # =================================================
    # DATA
    # =================================================

    if "data" in data:

        tags = data["data"]



        # =============================================
        # ITEMS
        # =============================================

        if "items" in tags:

            items = tags["items"]

            if len(items) > 0:

                category = items[0]["name"].lower()



        # =============================================
        # COLORS
        # =============================================

        if "colors" in tags:

            colors = tags["colors"]

            best_color = None

            best_confidence = 0



            for color in colors:

                try:

                    hex_code = color["hex_code"]

                    confidence = color["confidence"]



                    r = int(hex_code[0:2], 16)

                    g = int(hex_code[2:4], 16)

                    b = int(hex_code[4:6], 16)



                    # =====================================
                    # SKIP TOO WHITE
                    # =====================================

                    brightness = (r + g + b) / 3



                    if brightness > 240:

                        continue



                    # =====================================
                    # BEST CONFIDENCE
                    # =====================================

                    if confidence > best_confidence:

                        best_confidence = confidence

                        best_color = hex_code



                except:

                    continue



            # =========================================
            # RESULT
            # =========================================

            if best_color:

                hex_color = "#" + best_color



        # =============================================
        # LABELS
        # =============================================

        if "labels" in tags:

            labels = tags["labels"]

            for item in labels:

                classification = item["classification"].lower()

                name = item["name"].lower()



                # =====================================
                # PATTERN
                # =====================================

                if classification == "textile pattern":

                    pattern += " " + name



                # =====================================
                # APPAREL
                # =====================================

                if classification == "apparel":

                    item_type += " " + name



                # =====================================
                # NICKNAME
                # =====================================

                if classification == "nickname":

                    item_type += " " + name



                # =====================================
                # FIT
                # =====================================

                if classification == "silhouette":

                    fit_type += " " + name



                # =====================================
                # LENGTH
                # =====================================

                if classification == "length":

                    sleeve_type += " " + name



                # =====================================
                # NECKLINE
                # =====================================

                if classification == "neckline type":

                    neckline += " " + name



                # =====================================
                # WAISTLINE
                # =====================================

                if classification == "waistline":

                    waistline += " " + name



                # =====================================
                # MATERIAL
                # =====================================

                if classification == "material":

                    fabric += " " + name



                # =====================================
                # STYLE
                # =====================================

                if classification == "style":

                    style_type += " " + name



                # =====================================
                # FINISHING
                # =====================================

                if classification == "finishing technique":

                    detail_feature += " " + name




    # =================================================
    # SEARCH TEXT
    # =================================================

    search_text = (

        category
        + " "

        + item_type
        + " "

        + fit_type
        + " "

        + sleeve_type
        + " "

        + neckline
        + " "

        + waistline
        + " "

        + fabric
        + " "

        + style_type
        + " "

        + detail_feature
        + " "

        + pattern

    ).lower()



    print("===================================")

    print("SEARCH TEXT:", search_text)

    print("PATTERN:", pattern)

    print("HEX COLOR:", hex_color)

    print("===================================")



    # =================================================
    # FIND DATABASE
    # =================================================

    loai = find_closest_type(
        search_text,
        db
    )


    mau = find_closest_color(
        hex_color,
        db
    )


    hoa_tiet = map_hoa_tiet(
        pattern,
        db
    )



    # =================================================
    # FALLBACK
    # =================================================

    if loai is None:

        return {

            "error": "Không xác định được loại trang phục"
        }



    # =================================================
    # RETURN
    # =================================================

    return {

        "tenTrangPhuc": loai.tenLoai,

        "maLoai": loai.maLoai,

        "tenLoai": loai.tenLoai,

        "maMau": mau.maMau,

        "tenMau": mau.tenMau,

        "maHoaTiet": hoa_tiet.maHoaTiet,

        "tenHoaTiet": hoa_tiet.tenHoaTiet,

    }

