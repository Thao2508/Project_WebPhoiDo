from sqlalchemy.orm import Session

from datetime import datetime

from app.models.BoPhoi import BoPhoi
from app.models.ChiTietBoPhoi import ChiTietBoPhoi
from app.models.YeuThich import YeuThich
from app.models.TrangPhuc import TrangPhuc
from app.models.LoaiTrangPhuc import LoaiTrangPhuc
from app.models.DanhMuc import DanhMuc
from app.models.LuatPhoiLoaiDo import LuatPhoiLoaiDo
from app.models.PhongCach import PhongCach
from app.models.DipSuDung import DipSuDung

def get_outfit_key(outfit):

    ids = []

    if outfit.get("ao"):

        ids.append(
            outfit["ao"]["maTrangPhuc"]
        )

    if outfit.get("quan"):

        ids.append(
            outfit["quan"]["maTrangPhuc"]
        )

    return sorted(ids)


# =====================================================
# TÌM BỘ PHỐI TRÙNG
# =====================================================

def tim_bo_phoi_trung(
    db: Session,
    outfit
):

    target_ids = get_outfit_key(outfit)

    ds_bo_phoi = db.query(
        BoPhoi
    ).all()

    for bo_phoi in ds_bo_phoi:

        chi_tiet_list = db.query(
            ChiTietBoPhoi
        ).filter(
            ChiTietBoPhoi.maBoPhoi
            == bo_phoi.maBoPhoi
        ).all()

        ds_ids = sorted(
            [
                ct.maTrangPhuc
                for ct in chi_tiet_list
            ]
        )

        if ds_ids == target_ids:

            return bo_phoi

    return None


def tao_yeu_thich(
    db: Session,
    ma_nguoi_dung,
    outfit,
    trang_thai,
    ma_luat=None,
    ma_luat_mau=None
):
    bo_phoi = tim_bo_phoi_trung(
        db,
        outfit
    )
    if bo_phoi:

        if bo_phoi.trangThai == 1:

            if trang_thai == 0:

                return {

                    "success": False,

                    "message":
                    "Outfit này đã tồn tại ở trạng thái công khai"
                }

            da_thich = db.query(
                YeuThich
            ).filter(

                YeuThich.maNguoiDung
                == ma_nguoi_dung,

                YeuThich.maBoPhoi
                == bo_phoi.maBoPhoi

            ).first()

            if da_thich:

                return {

                    "success": False,

                    "message":
                    "Bạn đã yêu outfit này trước đó"
                }

            yeu_thich = YeuThich(

                maNguoiDung=
                ma_nguoi_dung,

                maBoPhoi=
                bo_phoi.maBoPhoi,

                ngayTao=
                datetime.now()
            )

            db.add(yeu_thich)

            db.commit()

            return {

                "success": True,

                "message":
                "Đã lưu outfit",

                "maBoPhoi":
                bo_phoi.maBoPhoi
            }

        elif bo_phoi.trangThai == 0:

            if (
                bo_phoi.maNguoiDung
                == ma_nguoi_dung
                and
                trang_thai == 1
            ):

                bo_phoi.trangThai = 1

                db.commit()

                return {

                    "success": True,

                    "message":
                    "Đã chuyển outfit sang công khai",

                    "maBoPhoi":
                    bo_phoi.maBoPhoi
                }

            return {

                "success": False,

                "message":
                "Bạn đã yêu outfit này trước đó"
            }

    bo_phoi = BoPhoi(

        tenBoPhoi=
        "Outfit yêu thích",

        moTa="",

        ngayTao=
        datetime.now(),

        trangThai=
        trang_thai,

        maLuat=
        ma_luat,

        maLuatMau=
        ma_luat_mau,

        hopLe=True,

        maNguoiDung=
        ma_nguoi_dung
    )

    db.add(bo_phoi)

    db.commit()

    db.refresh(bo_phoi)

    if outfit.get("ao"):

        chi_tiet_ao = ChiTietBoPhoi(

            maBoPhoi=
            bo_phoi.maBoPhoi,

            maTrangPhuc=
            outfit["ao"][
                "maTrangPhuc"
            ]
        )

        db.add(chi_tiet_ao)

    if outfit.get("quan"):

        chi_tiet_quan = ChiTietBoPhoi(

            maBoPhoi=
            bo_phoi.maBoPhoi,

            maTrangPhuc=
            outfit["quan"][
                "maTrangPhuc"
            ]
        )

        db.add(chi_tiet_quan)

    db.commit()

    yeu_thich = YeuThich(

        maNguoiDung=
        ma_nguoi_dung,

        maBoPhoi=
        bo_phoi.maBoPhoi,

        ngayTao=
        datetime.now()
    )

    db.add(yeu_thich)

    db.commit()

    return {

        "success": True,

        "message":
        "Đã lưu outfit",

        "maBoPhoi":
        bo_phoi.maBoPhoi
    }

def xoa_yeu_thich(
    db: Session,
    ma_nguoi_dung,
    outfit
):

    bo_phoi = tim_bo_phoi_trung(
        db,
        outfit
    )

    if not bo_phoi:

        return {

            "success": False,

            "message":
            "Không tìm thấy bộ phối"
        }

    yeu_thich = db.query(
        YeuThich
    ).filter(

        YeuThich.maNguoiDung
        == ma_nguoi_dung,

        YeuThich.maBoPhoi
        == bo_phoi.maBoPhoi

    ).first()

    if not yeu_thich:

        return {

            "success": False,

            "message":
            "Outfit chưa được yêu thích"
        }

    # ==========================================
    # PUBLIC
    # => CHỈ XÓA YÊU THÍCH
    # ==========================================

    if bo_phoi.trangThai == 1:

        db.delete(yeu_thich)

        db.commit()

        return {

            "success": True,

            "message":
            "Đã bỏ yêu thích"
        }

    # ==========================================
    # PRIVATE
    # => XÓA TOÀN BỘ
    # ==========================================

    db.delete(yeu_thich)

    db.commit()

    db.query(
        ChiTietBoPhoi
    ).filter(

        ChiTietBoPhoi.maBoPhoi
        == bo_phoi.maBoPhoi

    ).delete()

    db.delete(bo_phoi)

    db.commit()

    return {

        "success": True,

        "message":
        "Đã bỏ yêu thích"
    }


def lay_outfit_yeu_thich(
    db: Session,
    ma_nguoi_dung
):

    yeu_thich_list = db.query(
        YeuThich
    ).filter(
        YeuThich.maNguoiDung
        == ma_nguoi_dung
    ).all()

    result = []

    for yt in yeu_thich_list:

        bo_phoi = db.query(
            BoPhoi
        ).filter(
            BoPhoi.maBoPhoi
            == yt.maBoPhoi
        ).first()

        chi_tiet_list = db.query(
            ChiTietBoPhoi
        ).filter(
            ChiTietBoPhoi.maBoPhoi
            == yt.maBoPhoi
        ).all()

        outfit = {}

        for ct in chi_tiet_list:

            trang_phuc = db.query(
                TrangPhuc
            ).filter(
                TrangPhuc.maTrangPhuc
                == ct.maTrangPhuc
            ).first()

            if not trang_phuc:

                continue

            data_tp = {

                "maTrangPhuc":
                trang_phuc.maTrangPhuc,

                "tenTrangPhuc":
                trang_phuc.tenTrangPhuc,

                "hinhAnh":
                trang_phuc.hinhAnh
            }

            loai = db.query(
                LoaiTrangPhuc
            ).filter(
                LoaiTrangPhuc.maLoai
                == trang_phuc.maLoai
            ).first()

            if not loai:

                continue

            danh_muc = db.query(
                DanhMuc
            ).filter(
                DanhMuc.maDanhMuc
                == loai.maDanhMuc
            ).first()

            if not danh_muc:

                continue

            pham_vi = (
                danh_muc.phamViSuDung
                .strip()
                .lower()
            )

            if pham_vi == "thân trên":

                outfit["ao"] = data_tp

            elif pham_vi == "thân dưới":

                outfit["quan"] = data_tp

            ten_phong_cach = ""
            ten_dip_su_dung = ""

            if bo_phoi.maLuat:

                luat = db.query(
                    LuatPhoiLoaiDo
                ).filter(

                    LuatPhoiLoaiDo.maLuat
                    == bo_phoi.maLuat

                ).first()

            if luat:

                phong_cach = db.query(
                    PhongCach
                ).filter(

                    PhongCach.maPhongCach
                    == luat.maPhongCach

                ).first()

                dip_su_dung = db.query(
                    DipSuDung
                ).filter(

                    DipSuDung.maDipSD
                    == luat.maDipSD

                ).first()

                if phong_cach:

                    ten_phong_cach = (
                        phong_cach.tenPhongCach
                    )

                if dip_su_dung:

                    ten_dip_su_dung = (
                        dip_su_dung.tenDipSD
                    )

        result.append({

            "maBoPhoi":
            bo_phoi.maBoPhoi,

            "trangThai":
            bo_phoi.trangThai,

            "maNguoiDung":
            bo_phoi.maNguoiDung,

            "laCuaToi":
            (
                bo_phoi.maNguoiDung
                == ma_nguoi_dung
            ),

            "maLuat":
            bo_phoi.maLuat,

            "maLuatMau":
            bo_phoi.maLuatMau,
            "tenPhongCach":
            ten_phong_cach,

            "tenDipSuDung":
            ten_dip_su_dung,

            "outfit":
            outfit
        })

    return result
