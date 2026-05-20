from app.models.LoaiTrangPhuc import LoaiTrangPhuc



# =====================================================
# HELPER
# =====================================================

def find_by_name(keyword, all_types):

    keyword = keyword.lower()

    for item in all_types:

        ten = item.tenLoai.lower()

        if keyword in ten:

            return item

    return None





# =====================================================
# FIND CLOSEST TYPE
# =====================================================

def find_closest_type(search_text, db):

    search_text = search_text.lower()

    all_types = db.query(
        LoaiTrangPhuc
    ).all()


    print("SEARCH TEXT:", search_text)



    # =================================================
    # ==================== VÁY ========================
    # =================================================

    if (
        "dress" in search_text
        or
        "skirt" in search_text
    ):


        # =============================================
        # VÁY XẾP LY
        # pleated là feature mạnh nhất
        # =============================================

        if (
            "pleated" in search_text
            or
            "gathering" in search_text
        ):

            # tennis skirt
            if (
                "mini" in search_text
                or
                "sport" in search_text
                or
                "tennis" in search_text
            ):

                item = find_by_name(
                    "váy tennis",
                    all_types
                )

                if item:
                    return item


            # váy xếp ly dài
            if (
                "maxi" in search_text
                or
                "long" in search_text
            ):

                item = find_by_name(
                    "xếp ly dài",
                    all_types
                )

                if item:
                    return item


            # váy xếp ly thường
            item = find_by_name(
                "xếp ly",
                all_types
            )

            if item:
                return item



        # =============================================
        # VÁY CHỮ A
        # chỉ khi KHÔNG có pleated
        # =============================================

        if (
            "a-line" in search_text
            and
            "pleated" not in search_text
        ):

            item = find_by_name(
                "váy chữ a",
                all_types
            )

            if item:
                return item



        # =============================================
        # VÁY MIDI
        # =============================================

        if (
            "midi" in search_text
        ):

            item = find_by_name(
                "midi",
                all_types
            )

            if item:
                return item



        # =============================================
        # VÁY JEAN
        # =============================================

        if (
            "denim" in search_text
            or
            "jean" in search_text
        ):

            item = find_by_name(
                "váy jean",
                all_types
            )

            if item:
                return item



        # =============================================
        # DEFAULT VÁY
        # =============================================

        item = find_by_name(
            "váy",
            all_types
        )

        if item:
            return item





    # =================================================
    # ==================== ÁO ==========================
    # =================================================

    if (
        "top" in search_text
        or
        "shirt" in search_text
        or
        "t-shirt" in search_text
        or
        "tee" in search_text
        or
        "hoodie" in search_text
    ):



        # =============================================
        # HOODIE
        # =============================================

        if (
            "hoodie" in search_text
            or
            "hood" in search_text
        ):

            item = find_by_name(
                "hoodie",
                all_types
            )

            if item:
                return item



        # =============================================
        # CROPTOP
        # =============================================

        if (
            "crop" in search_text
            or
            "cropped" in search_text
        ):

            item = find_by_name(
                "croptop",
                all_types
            )

            if item:
                return item



        # =============================================
        # ÁO THUN
        # ưu tiên trước shirt
        # =============================================

        if (
            "t-shirt" in search_text
            or
            "tee" in search_text
            or
            "round neck" in search_text
            or
            "short sleeve" in search_text
        ):

            # graphic tee
            if (
                "graphic" in search_text
                or
                "print" in search_text
            ):

                item = find_by_name(
                    "graphic",
                    all_types
                )

                if item:
                    return item


            # oversized tee
            if (
                "oversized" in search_text
            ):

                item = find_by_name(
                    "oversized",
                    all_types
                )

                if item:
                    return item


            item = find_by_name(
                "áo thun",
                all_types
            )

            if item:
                return item



        # =============================================
        # ÁO SƠ MI
        # shirt KHÔNG được đứng trước t-shirt
        # =============================================

        if (
            (
                "shirt" in search_text
                and
                "t-shirt" not in search_text
            )

            or

            "collar" in search_text

            or

            "button" in search_text
        ):

            # oversized sơ mi
            if (
                "oversized" in search_text
            ):

                item = find_by_name(
                    "sơ mi oversized",
                    all_types
                )

                if item:
                    return item


            item = find_by_name(
                "sơ mi",
                all_types
            )

            if item:
                return item



        # =============================================
        # POLO
        # =============================================

        if (
            "polo" in search_text
        ):

            item = find_by_name(
                "polo",
                all_types
            )

            if item:
                return item



        # =============================================
        # DEFAULT ÁO
        # =============================================

        item = find_by_name(
            "áo",
            all_types
        )

        if item:
            return item





    # =================================================
    # ==================== QUẦN ========================
    # =================================================

    if (
        "pants" in search_text
        or
        "trousers" in search_text
        or
        "jeans" in search_text
        or
        "shorts" in search_text
    ):



        # =============================================
        # CARGO
        # =============================================

        if (
            "cargo" in search_text
            or
            "pocket" in search_text
        ):

            item = find_by_name(
                "cargo",
                all_types
            )

            if item:
                return item



        # =============================================
        # JOGGER
        # =============================================

        if (
            "jogger" in search_text
            or
            "sweatpants" in search_text
        ):

            item = find_by_name(
                "jogger",
                all_types
            )

            if item:
                return item



        # =============================================
        # SHORTS
        # =============================================

        if (
            "shorts" in search_text
        ):

            item = find_by_name(
                "short",
                all_types
            )

            if item:
                return item



        # =============================================
        # JEANS
        # =============================================

        if (
            "jeans" in search_text
            or
            "denim" in search_text
        ):

            # jean baggy
            if (
                "baggy" in search_text
                or
                "loose fit" in search_text
            ):

                item = find_by_name(
                    "jean baggy",
                    all_types
                )

                if item:
                    return item


            # jean skinny
            if (
                "skinny" in search_text
            ):

                item = find_by_name(
                    "skinny",
                    all_types
                )

                if item:
                    return item


            # jean wide leg
            if (
                "wide leg" in search_text
            ):

                item = find_by_name(
                    "jean ống rộng",
                    all_types
                )

                if item:
                    return item


            item = find_by_name(
                "jean",
                all_types
            )

            if item:
                return item



        # =============================================
        # QUẦN TÂY
        # =============================================

        if (
            "trousers" in search_text
            or
            "formal pants" in search_text
        ):

            if (
                "wide leg" in search_text
            ):

                item = find_by_name(
                    "tây ống rộng",
                    all_types
                )

                if item:
                    return item


            item = find_by_name(
                "quần tây",
                all_types
            )

            if item:
                return item



        # =============================================
        # DEFAULT QUẦN
        # =============================================

        item = find_by_name(
            "quần",
            all_types
        )

        if item:
            return item





    # =================================================
    # FALLBACK
    # =================================================

    return all_types[0]

