import colorsys

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.db.database import SessionLocal
from app.models.TrangPhuc import TrangPhuc
from app.models.PhongCach import PhongCach
from app.models.DipSuDung import DipSuDung
from app.models.LuatPhoiMau import LuatPhoiMau
from app.models.LuatPhoiLoaiDo import LuatPhoiLoaiDo
from app.models.LoaiTrangPhuc import LoaiTrangPhuc
from app.models.Mau import Mau
from app.models.HoaTiet import HoaTiet
from app.models.DanhMuc import DanhMuc

router = APIRouter()

MAX_PRIMARY_OUTFIT = 5

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


INVALID_STYLE_RULES = {
    "Công sở": [
        "croptop",
        "rách",
        "baggy",
        "oversize"
    ],
    "Sang trọng": [
        "rách",
        "baggy",
        "oversize"
    ],
    "Cổ điển": [
        "rách"
    ],
    "Tối giản": [
        "rách"
    ]
}

INVALID_OCCASION_RULES = {
    "Đi học": [
        "croptop"
    ],

    "Đi làm": [
        "croptop",
        "rách"
    ],

    "Dự tiệc": [],

    "Thể thao": [
        "xếp ly"
    ]
}


def get_pham_vi(item):
    try:
        return (
            item.loai
            .danhMuc
            .phamViSuDung
            .lower()
            .strip()
        )
    except Exception as e:
        print(f"[ERROR] Lỗi cấu trúc quan hệ danh mục của item {getattr(item, 'maTrangPhuc', 'Unknown')}: {e}")
        return ""


def is_top(item):
    return get_pham_vi(item) == "thân trên"


def is_bottom(item):
    return get_pham_vi(item) == "thân dưới"

def get_harmony_type(top, bottom):

    if not top.mau or not bottom.mau:
        return None

    try:

        top_hex = top.mau.maMauHex.lstrip("#")
        bottom_hex = bottom.mau.maMauHex.lstrip("#")

        r1 = int(top_hex[0:2], 16) / 255
        g1 = int(top_hex[2:4], 16) / 255
        b1 = int(top_hex[4:6], 16) / 255

        r2 = int(bottom_hex[0:2], 16) / 255
        g2 = int(bottom_hex[2:4], 16) / 255
        b2 = int(bottom_hex[4:6], 16) / 255

    except:
        return None

    h1, _, _ = colorsys.rgb_to_hsv(r1, g1, b1)
    h2, _, _ = colorsys.rgb_to_hsv(r2, g2, b2)

    h1 = h1 * 360
    h2 = h2 * 360

    diff = abs(h1 - h2)

    diff = min(diff, 360 - diff)

    # Monochromatic
    if diff <= 15:
        return "monochromatic"

    # Analogous
    if 15 < diff <= 60:
        return "analogous"

    # Complementary
    if 150 <= diff <= 210:
        return "complementary"

    return None

def get_hsv_from_hex(hex_color):

    if not hex_color:
        return None

    hex_color = hex_color.lstrip("#")

    try:

        r = int(hex_color[0:2], 16) / 255
        g = int(hex_color[2:4], 16) / 255
        b = int(hex_color[4:6], 16) / 255

        h, s, v = colorsys.rgb_to_hsv(
            r,
            g,
            b
        )

        return h, s, v

    except:

        return None
    
def is_neutral_color(item):

    if not item.mau:
        return False

    hsv = get_hsv_from_hex(
        item.mau.maMauHex
    )

    if not hsv:
        return False

    _, s, _ = hsv

    # saturation thấp
    # => màu trung tính
    return s < 0.18

def is_same_tone_family(top, bottom):

    if not top.mau or not bottom.mau:
        return False

    if (
        is_neutral_color(top)
        or
        is_neutral_color(bottom)
    ):
        return True

    hsv_top = get_hsv_from_hex(
        top.mau.maMauHex
    )

    hsv_bottom = get_hsv_from_hex(
        bottom.mau.maMauHex
    )

    if not hsv_top or not hsv_bottom:
        return False

    _, s1, v1 = hsv_top
    _, s2, v2 = hsv_bottom

    saturation_diff = abs(s1 - s2)
    brightness_diff = abs(v1 - v2)


    if saturation_diff > 0.5:
        return False

    if brightness_diff > 0.55:
        return False

    return True



def is_bold_color(item):
    if not item.mau:
        return False

    try:

        hex_color = item.mau.maMauHex.lstrip("#")

        r = int(hex_color[0:2], 16) / 255
        g = int(hex_color[2:4], 16) / 255
        b = int(hex_color[4:6], 16) / 255

    except:
        return False

    _, s, v = colorsys.rgb_to_hsv(
        r,
        g,
        b
    )

    return s > 0.7 and v > 0.7


def validate_harmony_context(
    harmony_type,
    top,
    bottom,
    ma_phong_cach,
    ma_dip_sd
):

    if not harmony_type:

        return False

    # =========================
    # ĐI HỌC / ĐI LÀM
    # KHÔNG QUÁ TƯƠNG PHẢN
    # =========================

    if ma_dip_sd in [1, 2]:

        if harmony_type == "complementary":

            if (
                is_bold_color(top)
                or
                is_bold_color(bottom)
            ):

                return False

    # =========================
    # PHONG CÁCH TỐI GIẢN
    # =========================

    if ma_phong_cach == 1:

        # không cho màu quá nổi

        if (
            is_bold_color(top)
            or
            is_bold_color(bottom)
        ):

            return False

        # không dùng complementary
        # cho tối giản

        if harmony_type == "complementary":

            return False

    # =========================
    # PHONG CÁCH SANG TRỌNG
    # =========================

    if ma_phong_cach == 3:

        if (

            harmony_type == "complementary"

            and

            (
                is_bold_color(top)
                or
                is_bold_color(bottom)
            )
        ):

            return False

    return True


def validate_style(top, bottom, phong_cach_name):
    invalid_styles = INVALID_STYLE_RULES.get(phong_cach_name, [])
    invalid_styles = [s.lower().strip() for s in invalid_styles]

    top_style = (
        top.kieuDang.lower().strip()
        if top.kieuDang else ""
    )

    bottom_style = (
        bottom.kieuDang.lower().strip()
        if bottom.kieuDang else ""
    )

    for invalid in invalid_styles:
        if invalid in top_style:
            return False
        if invalid in bottom_style:
            return False

    return True

def validate_occasion(top, bottom, dip_name):

    invalid_styles = INVALID_OCCASION_RULES.get(dip_name, [])

    invalid_styles = [
        s.lower().strip()
        for s in invalid_styles
    ]

    top_style = (
        top.kieuDang.lower().strip()
        if top.kieuDang else ""
    )

    bottom_style = (
        bottom.kieuDang.lower().strip()
        if bottom.kieuDang else ""
    )

    for invalid in invalid_styles:

        if invalid in top_style:
            return False

        if invalid in bottom_style:
            return False

    return True

def hop_le(
    db,
    top,
    bottom,
    ma_phong_cach,
    ma_dip_sd,
    use_harmony_fallback=False
):

    loai_rule = db.query(
        LuatPhoiLoaiDo
    ).filter(

        or_(
            and_(
                LuatPhoiLoaiDo.maLoai_1 == top.maLoai,
                LuatPhoiLoaiDo.maLoai_2 == bottom.maLoai
            ),

            and_(
                LuatPhoiLoaiDo.maLoai_1 == bottom.maLoai,
                LuatPhoiLoaiDo.maLoai_2 == top.maLoai
            )
        ),

        LuatPhoiLoaiDo.maPhongCach == ma_phong_cach,

        LuatPhoiLoaiDo.maDipSD == ma_dip_sd,

        LuatPhoiLoaiDo.hopLe == True

    ).first()

    if not loai_rule:
        return False

    mau_rule = db.query(
        LuatPhoiMau
    ).filter(

        or_(
            and_(
                LuatPhoiMau.maMau_1 == top.maMau,
                LuatPhoiMau.maMau_2 == bottom.maMau
            ),

            and_(
                LuatPhoiMau.maMau_1 == bottom.maMau,
                LuatPhoiMau.maMau_2 == top.maMau
            )
        ),

        LuatPhoiMau.maPhongCach == ma_phong_cach,

        LuatPhoiMau.maDipSD == ma_dip_sd,

        LuatPhoiMau.hopLe == True

    ).first()

    if not mau_rule:

        if (
            is_neutral_color(top)
            or
            is_neutral_color(bottom)
        ):
            pass

        else:

            if not use_harmony_fallback:
                return False

            harmony_type = get_harmony_type(
                top,
                bottom
            )

            if not harmony_type:
                return False

            if not is_same_tone_family(
                top,
                bottom
            ):
                return False

            if not validate_harmony_context(
                harmony_type,
                top,
                bottom,
                ma_phong_cach,
                ma_dip_sd
            ):
                return False


    phong_cach = db.query(
        PhongCach
    ).filter(
        PhongCach.maPhongCach == ma_phong_cach
    ).first()

    if phong_cach:

        if not validate_style(
            top,
            bottom,
            phong_cach.tenPhongCach
        ):
            return False

    # =========================
    # OCCASION VALIDATION
    # =========================

    dip = db.query(
        DipSuDung
    ).filter(
        DipSuDung.maDipSD == ma_dip_sd
    ).first()

    if dip:

        if not validate_occasion(
            top,
            bottom,
            dip.tenDipSD
        ):
            return False

    return {
        "hopLe": True,

        "maLuat":
        (
            loai_rule.maLuat
            if loai_rule else None
        ),

        "maLuatMau":
        (
            mau_rule.maLuatMau
            if mau_rule else None
        )
    }
    

def tao_outfit(
    db,
    tops,
    bottoms,
    ma_phong_cach,
    ma_dip_sd,
    use_harmony_fallback=False,
    must_contain_selected=False,
    selected_ids=None
):

    ket_qua = []

    seen_pairs = set()

    for top in tops:

        for bottom in bottoms:

            if (
                top.maTrangPhuc
                ==
                bottom.maTrangPhuc
            ):
                continue

            # phải chứa item user chọn
            if must_contain_selected:

                if (
                    top.maTrangPhuc not in selected_ids
                    and
                    bottom.maTrangPhuc not in selected_ids
                ):
                    continue

            pair_key = (
                top.maTrangPhuc,
                bottom.maTrangPhuc
            )

            if pair_key in seen_pairs:
                continue

            validation_result = hop_le(
                db,
                top,
                bottom,
                ma_phong_cach,
                ma_dip_sd,
                use_harmony_fallback
            )

            if validation_result:

                seen_pairs.add(pair_key)

                ket_qua.append({

                "ao": {

                    "maTrangPhuc":
                    top.maTrangPhuc,

                    "tenTrangPhuc":
                    top.tenTrangPhuc,

                    "hinhAnh":
                    top.hinhAnh,

                    "maLoai":
                    top.maLoai,

                    "maMau":
                    top.maMau,

                    "maHoaTiet":
                    top.maHoaTiet,

                    "kieuDang":
                    top.kieuDang
                },

                "quan": {

                    "maTrangPhuc":
                    bottom.maTrangPhuc,

                    "tenTrangPhuc":
                    bottom.tenTrangPhuc,

                    "hinhAnh":
                    bottom.hinhAnh,

                    "maLoai":
                    bottom.maLoai,

                    "maMau":
                    bottom.maMau,

                    "maHoaTiet":
                    bottom.maHoaTiet,

                    "kieuDang":
                    bottom.kieuDang
                },

                "maLuat":
                validation_result["maLuat"],

                "maLuatMau":
                validation_result["maLuatMau"]
            })

                if len(ket_qua) >= MAX_PRIMARY_OUTFIT:
                    return ket_qua

    return ket_qua

def goi_y_phoi_do( db, selected_items, uploaded_items, ma_phong_cach, ma_dip_sd, ma_nguoi_dung ):

    if uploaded_items:

        class TempItem:
            pass

        selected_trang_phuc = []

        for item in uploaded_items:

            temp = TempItem()

            temp.maTrangPhuc = (
                len(selected_trang_phuc) + 1
            )

            temp.maLoai = item.maLoai

            temp.maMau = item.maMau

            temp.maHoaTiet = item.maHoaTiet

            temp.kieuDang = item.kieuDang

            temp.hinhAnh = item.hinhAnh

            # =========================
            # LOAD OBJECT THẬT
            # =========================

            loai_db = db.query(
                LoaiTrangPhuc
            ).filter(
                LoaiTrangPhuc.maLoai
                == item.maLoai
            ).first()

            mau_db = db.query(
                Mau
            ).filter(
                Mau.maMau
                == item.maMau
            ).first()

            hoa_tiet_db = db.query(
                HoaTiet
            ).filter(
                HoaTiet.maHoaTiet
                == item.maHoaTiet
            ).first()

            danh_muc_db = None

            if loai_db:

                danh_muc_db = db.query(
                    DanhMuc
                ).filter(
                    DanhMuc.maDanhMuc
                    == loai_db.maDanhMuc
                ).first()

            # =========================
            # GÁN FULL OBJECT
            # =========================

            temp.loai = loai_db

            temp.mau = mau_db

            temp.hoaTiet = hoa_tiet_db

            temp.danhMuc = danh_muc_db

            # THÊM TÊN
            temp.tenTrangPhuc = (

                loai_db.tenLoai

                if loai_db

                else "Trang phục"
            )

            print(
                "PHAM VI:",
                danh_muc_db.phamViSuDung
                if danh_muc_db else None
            )

            selected_trang_phuc.append(
                temp
            )


 # PHỐI ĐỒ TỪ TỦ ĐỒ

    else:

        selected_trang_phuc = db.query(TrangPhuc).filter(
        TrangPhuc.maTrangPhuc.in_(
            selected_items
        ),
        TrangPhuc.trangThai
        == True
        ).all()


    tops = []

    bottoms = []

    # =========================
    # PHÂN LOẠI TOP / BOTTOM
    # =========================

    for item in selected_trang_phuc:

        if is_top(item):

            tops.append(item)

        elif is_bottom(item):

            bottoms.append(item)

    # =========================
    # VALIDATE
    # =========================

    if (
        len(tops) == 0
        or
        len(bottoms) == 0
    ):

        return {

            "success": False,

            "message":
            "Vui lòng chọn ít nhất 1 món thân trên và 1 món thân dưới để phối",

            "data": []
        }

    # =========================
    # CHỈ GỢI Ý ĐÚNG
    # TIÊU CHÍ USER CHỌN
    # =========================

    ket_qua = tao_outfit(
        db,
        tops,
        bottoms,
        ma_phong_cach,
        ma_dip_sd,
        use_harmony_fallback=True,
    )

    # =========================
    # KHÔNG TÌM THẤY
    # =========================

    if not ket_qua:

        return {

            "success": False,

            "message":
            "Không tìm thấy outfit phù hợp với tiêu chí đã chọn",

            "data": []
        }

    # =========================
    # LẤY CONTEXT
    # =========================

    phong_cach = db.query(
        PhongCach
    ).filter(
        PhongCach.maPhongCach
        == ma_phong_cach
    ).first()

    dip = db.query(
        DipSuDung
    ).filter(
        DipSuDung.maDipSD
        == ma_dip_sd
    ).first()

    # =========================
    # RESPONSE
    # =========================

    return {

        "success": True,

        "message": None,

        "data": [

            {

                "context": {

                    "maPhongCach":
                    ma_phong_cach,

                    "tenPhongCach":

                    (
                        phong_cach.tenPhongCach
                        if phong_cach else ""
                    ),

                    "maDipSuDung":
                    ma_dip_sd,

                    "tenDipSuDung":

                    (
                        dip.tenDipSD
                        if dip else ""
                    )
                },

                "outfits":
                ket_qua[:5]
            }
        ]
    }
