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

router = APIRouter()

MAX_PRIMARY_OUTFIT = 10
MAX_FALLBACK_OUTFIT = 5


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

def is_same_tone_family(top, bottom):

    if not top.mau or not bottom.mau:
        return False

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

    # lệch tone quá mạnh
    if saturation_diff > 0.35:
        return False

    if brightness_diff > 0.4:
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


def validate_harmony_context(harmony_type, top, bottom, ma_phong_cach, ma_dip_sd):
    if not harmony_type:
        return False
    if ma_dip_sd in [1, 2]:

        if harmony_type == "complementary":

            if (
                is_bold_color(top)
                or
                is_bold_color(bottom)
            ):

                return False

    if ma_phong_cach == 1:

        if (
            is_bold_color(top)
            or
            is_bold_color(bottom)
        ):

            return False

    if ma_phong_cach == 3:

        if harmony_type == "complementary":

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

    # =========================
    # RULE LOẠI ĐỒ
    # =========================

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

    # STRICT MODE
    if not loai_rule:
        return False

    # =========================
    # RULE MÀU
    # =========================

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

    # =========================
    # KHÔNG CÓ LUẬT MÀU
    # =========================

    if not mau_rule:

        # chỉ fallback harmony
        # ở phase cuối

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

    # =========================
    # STYLE VALIDATION
    # =========================

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

    return True
    

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

            if hop_le(
                db,
                top,
                bottom,
                ma_phong_cach,
                ma_dip_sd,
                use_harmony_fallback
            ):

                seen_pairs.add(pair_key)

                ket_qua.append({

                    "ao": {
                        "maTrangPhuc": top.maTrangPhuc,
                        "tenTrangPhuc": top.tenTrangPhuc,
                        "hinhAnh": top.hinhAnh
                    },

                    "quan": {
                        "maTrangPhuc": bottom.maTrangPhuc,
                        "tenTrangPhuc": bottom.tenTrangPhuc,
                        "hinhAnh": bottom.hinhAnh
                    }
                })

                if len(ket_qua) >= MAX_PRIMARY_OUTFIT:
                    return ket_qua

    return ket_qua

def goi_y_phoi_do(
    db,
    selected_items,
    ma_phong_cach,
    ma_dip_sd,
    ma_nguoi_dung
    ):

    all_items = db.query(TrangPhuc).filter(
        TrangPhuc.maNguoiDung == ma_nguoi_dung
    ).all()

    selected_trang_phuc = db.query(TrangPhuc).filter(
        TrangPhuc.maTrangPhuc.in_(selected_items)
    ).all()

    print("\n" + "★" * 30)
    print("=== [DEBUG SERVICE] BẮT ĐẦU PHÂN LOẠI ===")

    tops = []
    bottoms = []

    # =========================
    # PHÂN LOẠI TOP/BOTTOM
    # =========================

    for item in selected_trang_phuc:

        if is_top(item):
            tops.append(item)

        elif is_bottom(item):
            bottoms.append(item)

    print(
        f"TOPS: {[t.tenTrangPhuc for t in tops]}"
    )

    print(
        f"BOTTOMS: {[b.tenTrangPhuc for b in bottoms]}"
    )

    print("" + "★" * 30 + "\n")

    fallback_message = None

    # =========================
    # PHASE 1
    # EXACT DB RULE
    # =========================

    ket_qua = tao_outfit(
        db,
        tops,
        bottoms,
        ma_phong_cach,
        ma_dip_sd,
        use_harmony_fallback=False,
        must_contain_selected=True,
        selected_ids=selected_items
    )

    # =========================
    # PHASE 2
    # HARMONY FALLBACK
    # =========================

    if not ket_qua:

        print(
            "\n[PHASE 2] "
            "Mở rộng outfit từ tủ đồ..."
        )

        expanded_results = []

        # giữ top user chọn
        if tops:

            extra_bottoms = [
                item for item in all_items
                if (
                    is_bottom(item)
                    and
                    item.maTrangPhuc
                    not in selected_items
                )
            ]

            expanded_results += tao_outfit(
                db,
                tops,
                extra_bottoms,
                ma_phong_cach,
                ma_dip_sd,
                use_harmony_fallback=False,
                must_contain_selected=True,
                selected_ids=selected_items
            )

        # giữ bottom user chọn
        if bottoms:

            extra_tops = [
                item for item in all_items
                if (
                    is_top(item)
                    and
                    item.maTrangPhuc
                    not in selected_items
                )
            ]

            expanded_results += tao_outfit(
                db,
                extra_tops,
                bottoms,
                ma_phong_cach,
                ma_dip_sd,
                use_harmony_fallback=False,
                must_contain_selected=True,
                selected_ids=selected_items
            )

        ket_qua = expanded_results[
            :MAX_PRIMARY_OUTFIT
        ]

    # =========================
    # PHASE 3
    # EXPAND WARDROBE
    # luôn giữ item user chọn
    # =========================

    if not ket_qua:

        print(
            "\n[PHASE 3] "
            "Mở rộng outfit từ tủ đồ..."
        )

        expanded_results = []

        # giữ top
        if tops:

            extra_bottoms = [
                item for item in all_items
                if (
                    is_bottom(item)
                    and
                    item.maTrangPhuc
                    not in selected_items
                )
            ]

            expanded_results += tao_outfit(
                db,
                tops,
                extra_bottoms,
                ma_phong_cach,
                ma_dip_sd,
                use_harmony_fallback=True,
                must_contain_selected=True,
                selected_ids=selected_items
            )

        # giữ bottom
        if bottoms:

            extra_tops = [
                item for item in all_items
                if (
                    is_top(item)
                    and
                    item.maTrangPhuc
                    not in selected_items
                )
            ]

            expanded_results += tao_outfit(
                db,
                extra_tops,
                bottoms,
                ma_phong_cach,
                ma_dip_sd,
                use_harmony_fallback=True,
                must_contain_selected=True,
                selected_ids=selected_items
            )

        ket_qua = expanded_results[
            :MAX_PRIMARY_OUTFIT
        ]

    # =========================
    # PHASE 4
    # GROUP FALLBACK CONTEXT
    # =========================

    fallback_message = None

    if not ket_qua:

        print(
            "\n[PHASE 4] "
            "Fallback theo từng context..."
        )

        # =========================
        # COLLECT CONTEXT
        # =========================

        context_counter = {}

        # TOP
        for top in tops:

            compatible_rules = db.query(
                LuatPhoiLoaiDo
            ).filter(

                or_(
                    LuatPhoiLoaiDo.maLoai_1 == top.maLoai,
                    LuatPhoiLoaiDo.maLoai_2 == top.maLoai
                ),

                LuatPhoiLoaiDo.hopLe == True

            ).all()

            for rule in compatible_rules:

                context_key = (
                    rule.maPhongCach,
                    rule.maDipSD
                )

                if context_key not in context_counter:

                    context_counter[
                        context_key
                    ] = []

                context_counter[
                    context_key
                ].append(rule)

        # BOTTOM
        for bottom in bottoms:

            compatible_rules = db.query(
                LuatPhoiLoaiDo
            ).filter(

                or_(
                    LuatPhoiLoaiDo.maLoai_1 == bottom.maLoai,
                    LuatPhoiLoaiDo.maLoai_2 == bottom.maLoai
                ),

                LuatPhoiLoaiDo.hopLe == True

            ).all()

            for rule in compatible_rules:

                context_key = (
                    rule.maPhongCach,
                    rule.maDipSD
                )

                if context_key not in context_counter:

                    context_counter[
                        context_key
                    ] = []

                context_counter[
                    context_key
                ].append(rule)

        # =========================
        # GENERATE THEO TỪNG CONTEXT
        # =========================

        fallback_groups = []

        for context_key in context_counter.keys():

            style_id, dip_id = context_key

            phong_cach = db.query(
                PhongCach
            ).filter(
                PhongCach.maPhongCach
                == style_id
            ).first()

            dip = db.query(
                DipSuDung
            ).filter(
                DipSuDung.maDipSD
                == dip_id
            ).first()

            context_outfits = []

            seen_pairs = set()

            # =========================
            # GENERATE THEO TOP
            # =========================

            if tops:

                extra_bottoms = [
                    item for item in all_items
                    if (
                        is_bottom(item)
                        and
                        item.maTrangPhuc
                        not in selected_items
                    )
                ]

                outfit_res = tao_outfit(
                    db,
                    tops,
                    extra_bottoms,
                    style_id,
                    dip_id,
                    True
                )

                for outfit in outfit_res:

                    pair_key = (
                        outfit["ao"]["maTrangPhuc"],
                        outfit["quan"]["maTrangPhuc"]
                    )

                    if pair_key not in seen_pairs:

                        seen_pairs.add(pair_key)

                        context_outfits.append(
                            outfit
                        )

            # =========================
            # GENERATE THEO BOTTOM
            # =========================

            if bottoms:

                extra_tops = [
                    item for item in all_items
                    if (
                        is_top(item)
                        and
                        item.maTrangPhuc
                        not in selected_items
                    )
                ]

                outfit_res = tao_outfit(
                    db,
                    extra_tops,
                    bottoms,
                    style_id,
                    dip_id,
                    True
                )

                for outfit in outfit_res:

                    pair_key = (
                        outfit["ao"]["maTrangPhuc"],
                        outfit["quan"]["maTrangPhuc"]
                    )

                    if pair_key not in seen_pairs:

                        seen_pairs.add(pair_key)

                        context_outfits.append(
                            outfit
                        )

            # =========================
            # CONTEXT CÓ OUTFIT
            # =========================

            if context_outfits:

                fallback_groups.append({

                    "context": {

                        "maPhongCach": style_id,

                        "tenPhongCach": (
                            phong_cach.tenPhongCach
                            if phong_cach else None
                        ),

                        "maDipSuDung": dip_id,

                        "tenDipSuDung": (
                            dip.tenDipSD
                            if dip else None
                        )
                    },

                    "outfits": context_outfits[
                        :MAX_FALLBACK_OUTFIT
                    ]
                })

                # GIỚI HẠN CONTEXT
                if len(fallback_groups) >= 3:
                    break

        ket_qua = fallback_groups

        # =========================
        # MESSAGE FALLBACK
        # =========================

        if fallback_groups:

            fallback_message = (
                "Không tìm thấy outfit phù hợp "
                "với phong cách và dịp sử dụng đã chọn. Gợi ý cho bạn 1 số outfit tham khảo"
            )


    # =========================
    # PHASE 5
    # HARMONY FALLBACK CUỐI
    # =========================

    if not ket_qua:

        print(
            "\n[PHASE 5] "
            "Harmony fallback cuối cùng..."
        )

        extra_tops = [
            item for item in all_items
            if is_top(item)
        ]

        extra_bottoms = [
            item for item in all_items
            if is_bottom(item)
        ]

        harmony_results = tao_outfit(
            db,
            extra_tops,
            extra_bottoms,
            ma_phong_cach,
            ma_dip_sd,
            use_harmony_fallback=True,
            must_contain_selected=True,
            selected_ids=selected_items
        )

        if harmony_results:

            ket_qua = [{

                "context": {

                    "tenPhongCach":
                    "Harmony fallback",

                    "tenDipSuDung":
                    "Fallback"
                },

                "outfits":
                harmony_results
            }]

            fallback_message = (
                "Không tìm thấy outfit "
                "đúng luật trong database. "
                "Hiển thị outfit gần đúng "
                "theo harmony màu."
            )
    # =========================
    # KHÔNG CÓ OUTFIT NÀO
    # =========================

    if not ket_qua:

        fallback_message = (
            "Không tìm thấy outfit phù hợp. "
            "Tủ đồ hiện tại có thể chưa đủ "
            "trang phục phù hợp với phong cách "
            "và dịp sử dụng đã chọn."
        )

    if ket_qua and isinstance(ket_qua, list):

        # phase 1-3 trả raw outfit
        if "ao" in ket_qua[0]:

            phong_cach = db.query(
                PhongCach
            ).filter(
                PhongCach.maPhongCach == ma_phong_cach
            ).first()

            dip = db.query(
                DipSuDung
            ).filter(
                DipSuDung.maDipSD == ma_dip_sd
            ).first()

            ket_qua = [{

                "context": {

                    "maPhongCach": ma_phong_cach,

                    "tenPhongCach": (
                        phong_cach.tenPhongCach
                        if phong_cach else ""
                    ),

                    "maDipSuDung": ma_dip_sd,

                    "tenDipSuDung": (
                        dip.tenDipSD
                        if dip else ""
                    )
                },

                "outfits": ket_qua
            }]
            
    return {

        "success": True,

        "message": fallback_message,

        "data": ket_qua
    }

