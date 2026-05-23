from itertools import product

from sqlalchemy.orm import Session

from sqlalchemy import and_

from sqlalchemy import or_

from app.models.TrangPhuc import TrangPhuc

from app.models.LuatPhoiLoaiDo import LuatPhoiLoaiDo

from app.models.LuatPhoiMau import LuatPhoiMau


# ====================================
# KIEM TRA HOP LE
# ====================================

def hop_le(

    db,

    top,

    bottom,

    ma_phong_cach,

    ma_dip
):

    # ====================================
    # KIEM TRA LOAI
    # ====================================

    loai_rule = db.query(
        LuatPhoiLoaiDo
    ).filter(

        or_(

            and_(

                LuatPhoiLoaiDo.maLoai_1
                == top.maLoai,

                LuatPhoiLoaiDo.maLoai_2
                == bottom.maLoai
            ),

            and_(

                LuatPhoiLoaiDo.maLoai_1
                == bottom.maLoai,

                LuatPhoiLoaiDo.maLoai_2
                == top.maLoai
            )
        ),

        LuatPhoiLoaiDo.maPhongCach
        == ma_phong_cach,

        LuatPhoiLoaiDo.maDipSD
        == ma_dip,

        LuatPhoiLoaiDo.hopLe == True

    ).first()

    if not loai_rule:

        return False

    # ====================================
    # KIEM TRA MAU
    # ====================================

    mau_rule = db.query(
        LuatPhoiMau
    ).filter(

        or_(

            and_(

                LuatPhoiMau.maMau_1
                == top.maMau,

                LuatPhoiMau.maMau_2
                == bottom.maMau
            ),

            and_(

                LuatPhoiMau.maMau_1
                == bottom.maMau,

                LuatPhoiMau.maMau_2
                == top.maMau
            )
        ),

        LuatPhoiMau.maPhongCach
        == ma_phong_cach,

        LuatPhoiMau.maDipSD
        == ma_dip,

        LuatPhoiMau.hopLe == True

    ).first()

    return mau_rule is not None


# ====================================
# TIM BEST MATCH
# ====================================

def tim_best_match(

    db,

    top,

    bottom
):

    loai_rule = db.query(
        LuatPhoiLoaiDo
    ).filter(

        or_(

            and_(

                LuatPhoiLoaiDo.maLoai_1
                == top.maLoai,

                LuatPhoiLoaiDo.maLoai_2
                == bottom.maLoai
            ),

            and_(

                LuatPhoiLoaiDo.maLoai_1
                == bottom.maLoai,

                LuatPhoiLoaiDo.maLoai_2
                == top.maLoai
            )
        ),

        LuatPhoiLoaiDo.hopLe == True

    ).first()

    if not loai_rule:

        return None

    mau_rule = db.query(
        LuatPhoiMau
    ).filter(

        or_(

            and_(

                LuatPhoiMau.maMau_1
                == top.maMau,

                LuatPhoiMau.maMau_2
                == bottom.maMau
            ),

            and_(

                LuatPhoiMau.maMau_1
                == bottom.maMau,

                LuatPhoiMau.maMau_2
                == top.maMau
            )
        ),

        LuatPhoiMau.hopLe == True

    ).first()

    if not mau_rule:

        return None

    return {

        "maPhongCach":
        loai_rule.maPhongCach,

        "tenPhongCach":
        loai_rule.phongCach.tenPhongCach,

        "maDipSD":
        loai_rule.maDipSD,

        "tenDipSD":
        loai_rule.dipSuDung.tenDipSD
    }


# ====================================
# TACH THAN TREN / THAN DUOI
# ====================================

def tach_top_bottom(items):

    tops = []

    bottoms = []

    for item in items:

        pham_vi = (
            item.loai
            .danhMuc
            .phamViSuDung
            .lower()
        )

        # ------------------------
        # THAN TREN
        # ------------------------

        if pham_vi == "thân trên":

            tops.append(item)

        # ------------------------
        # THAN DUOI
        # ------------------------

        elif pham_vi == "thân dưới":

            bottoms.append(item)

    return tops, bottoms


# ====================================
# RESPONSE ITEM
# ====================================

def item_response(item):

    return {

        "maTrangPhuc":
        item.maTrangPhuc,

        "tenTrangPhuc":
        item.tenTrangPhuc,

        "hinhAnh":
        item.hinhAnh,

        "tenLoai":
        item.loai.tenLoai,

        "tenMau":
        item.mau.tenMau,

        "tenDanhMuc":
        item.loai
        .danhMuc
        .tenDanhMuc
    }


# ====================================
# RESPONSE OUTFIT
# ====================================

def tao_outfit_response(

    top,

    bottom
):

    return {

        "items": [

            item_response(top),

            item_response(bottom)
        ]
    }


# ====================================
# GOI Y PHOI DO
# ====================================

def goi_y_phoi_do(

    db: Session,

    selected_items,

    ma_phong_cach,

    ma_dip,

    ma_nguoi_dung
):

    # ====================================
    # LAY ITEM USER CHON
    # ====================================

    selected_clothes = db.query(
        TrangPhuc
    ).filter(
        TrangPhuc.maTrangPhuc.in_(
            selected_items
        )
    ).all()

    if not selected_clothes:

        return {

            "success": False,

            "message":
            "Không có trang phục được chọn"
        }

    # ====================================
    # TACH TOP / BOTTOM
    # ====================================

    selected_tops, selected_bottoms = (
        tach_top_bottom(
            selected_clothes
        )
    )

    final_outfits = []

    # ====================================
    # CASE 1
    # USER CHON TOP + BOTTOM
    # ====================================

    if (

        len(selected_tops) > 0 and

        len(selected_bottoms) > 0
    ):

        combinations = list(
            product(
                selected_tops,
                selected_bottoms
            )
        )

        for top, bottom in combinations:

            valid = hop_le(

                db,

                top,

                bottom,

                ma_phong_cach,

                ma_dip
            )

            if valid:

                response = tao_outfit_response(

                    top,

                    bottom
                )

                response["fallback"] = False

                final_outfits.append(
                    response
                )

    # ====================================
    # CASE 2
    # USER CHI CHON TOP
    # ====================================

    elif len(selected_tops) > 0:

        all_clothes = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maNguoiDung
            == ma_nguoi_dung

        ).all()

        _, all_bottoms = (
            tach_top_bottom(
                all_clothes
            )
        )

        combinations = list(
            product(
                selected_tops,
                all_bottoms
            )
        )

        for top, bottom in combinations:

            if (
                bottom.maTrangPhuc
                in selected_items
            ):

                continue

            valid = hop_le(

                db,

                top,

                bottom,

                ma_phong_cach,

                ma_dip
            )

            if valid:

                response = tao_outfit_response(

                    top,

                    bottom
                )

                response["fallback"] = False

                final_outfits.append(
                    response
                )

    # ====================================
    # CASE 3
    # USER CHI CHON BOTTOM
    # ====================================

    elif len(selected_bottoms) > 0:

        all_clothes = db.query(
            TrangPhuc
        ).filter(

            TrangPhuc.maNguoiDung
            == ma_nguoi_dung

        ).all()

        all_tops, _ = (
            tach_top_bottom(
                all_clothes
            )
        )

        combinations = list(
            product(
                all_tops,
                selected_bottoms
            )
        )

        for top, bottom in combinations:

            if (
                top.maTrangPhuc
                in selected_items
            ):

                continue

            valid = hop_le(

                db,

                top,

                bottom,

                ma_phong_cach,

                ma_dip
            )

            if valid:

                response = tao_outfit_response(

                    top,

                    bottom
                )

                response["fallback"] = False

                final_outfits.append(
                    response
                )

    # ====================================
    # TIM BEST MATCH
    # ====================================

    if len(final_outfits) == 0:

        best_outfits = []

        if (

            len(selected_tops) > 0 and

            len(selected_bottoms) > 0
        ):

            combinations = list(
                product(
                    selected_tops,
                    selected_bottoms
                )
            )

            for top, bottom in combinations:

                best_match = tim_best_match(

                    db,

                    top,

                    bottom
                )

                if best_match:

                    response = tao_outfit_response(

                        top,

                        bottom
                    )

                    response["fallback"] = True

                    response["message"] = (

                        f"Không tìm thấy outfit phù hợp với "
                        f"phong cách đã chọn. "

                        f"Đã gợi ý outfit theo phong cách "

                        f"{best_match['tenPhongCach']} "

                        f"và dịp "

                        f"{best_match['tenDipSD']}."
                    )

                    response["maPhongCach"] = (
                        best_match["maPhongCach"]
                    )

                    response["maDipSD"] = (
                        best_match["maDipSD"]
                    )

                    best_outfits.append(
                        response
                    )

        if len(best_outfits) > 0:

            return {

                "success": True,

                "fallback": True,

                "message":

                "Đã tìm thấy outfit gần phù hợp nhất.",

                "outfits":
                best_outfits
            }

        return {

            "success": False,

            "message":
            "Không tìm thấy outfit phù hợp"
        }

    # ====================================
    # SUCCESS
    # ====================================

    return {

        "success": True,

        "fallback": False,

        "message":
        "Gợi ý phối đồ thành công",

        "outfits":
        final_outfits
    }