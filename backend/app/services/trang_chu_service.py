from sqlalchemy.orm import joinedload
from sqlalchemy.orm import Session

from sqlalchemy import or_

from app.models.BoPhoi import BoPhoi
from app.models.ChiTietBoPhoi import ChiTietBoPhoi
from app.models.TrangPhuc import TrangPhuc
from app.models.YeuThich import YeuThich
from app.models.LuatPhoiLoaiDo import LuatPhoiLoaiDo
from app.models.PhongCach import PhongCach
from app.models.DipSuDung import DipSuDung
from app.models.LoaiTrangPhuc import LoaiTrangPhuc


def lay_goi_y_outfit(
    db: Session,
    limit: int = 10,
    keyword: str = "",
    ma_nguoi_dung: int | None = None
):

    query = (
        db.query(BoPhoi)

        .join(
            LuatPhoiLoaiDo,
            BoPhoi.maLuat
            == LuatPhoiLoaiDo.maLuat
        )

        .join(
            PhongCach,
            LuatPhoiLoaiDo.maPhongCach
            == PhongCach.maPhongCach
        )

        .join(
            DipSuDung,
            LuatPhoiLoaiDo.maDipSD
            == DipSuDung.maDipSD
        )

        .options(

            joinedload(
                BoPhoi.chiTietBoPhois
            ).joinedload(
                ChiTietBoPhoi.trangPhuc
            ).joinedload(
                TrangPhuc.loai
            ).joinedload(
                LoaiTrangPhuc.danhMuc
            ),

            joinedload(
                BoPhoi.chiTietBoPhois
            ).joinedload(
                ChiTietBoPhoi.trangPhuc
            ).joinedload(
                TrangPhuc.mau
            ),

            joinedload(
                BoPhoi.luatPhoiLoaiDo
            ),

            joinedload(
                BoPhoi.luatPhoiMau
            )

        )

        .filter(
            BoPhoi.hopLe == True,
            BoPhoi.trangThai == 1
        )
    )

    # SEARCH
    if keyword:

        query = query.filter(

            or_(

                BoPhoi.tenBoPhoi.ilike(
                    f"%{keyword}%"
                ),

                PhongCach.tenPhongCach.ilike(
                    f"%{keyword}%"
                ),

                DipSuDung.tenDipSD.ilike(
                    f"%{keyword}%"
                )
            )
        )

    ds_bo_phoi = (
        query
        .order_by(
            BoPhoi.ngayTao.desc()
        )
        .limit(limit)
        .all()
    )

    ket_qua = []

    for bo_phoi in ds_bo_phoi:

        trang_phucs = []

        chi_tiet_sorted = sorted(

            bo_phoi.chiTietBoPhois,

            key=lambda ct:

            0 if (

                ct.trangPhuc
                and

                ct.trangPhuc.loai
                and

                ct.trangPhuc.loai.danhMuc
                and

                ct.trangPhuc.loai.danhMuc
                .phamViSuDung
                .strip()
                .lower()

                == "thân trên"

            )

            else 1
        )

        for ct in chi_tiet_sorted:

            tp = ct.trangPhuc

            if not tp:

                continue

            trang_phucs.append({

                "maTrangPhuc":
                    tp.maTrangPhuc,

                "tenTrangPhuc":
                    tp.tenTrangPhuc,

                "hinhAnh":
                    tp.hinhAnh,

                "phamViSuDung":

                    tp.loai.danhMuc
                    .phamViSuDung

                    if (
                        tp.loai
                        and
                        tp.loai.danhMuc
                    )

                    else None,

                "loai":

                    tp.loai.tenLoai

                    if tp.loai
                    else None,

                "mau":

                    tp.mau.tenMau

                    if tp.mau
                    else None
            })

        # CHECK YEU THICH
        da_yeu_thich = False

        if ma_nguoi_dung:

            yeu_thich = (
                db.query(YeuThich)
                .filter(
                    YeuThich.maNguoiDung
                    == ma_nguoi_dung,

                    YeuThich.maBoPhoi
                    == bo_phoi.maBoPhoi
                )
                .first()
            )

            da_yeu_thich = (
                yeu_thich is not None
            )

        ket_qua.append({

            "maBoPhoi":
                bo_phoi.maBoPhoi,

            "tenBoPhoi":
                bo_phoi.tenBoPhoi,

            "moTa":
                bo_phoi.moTa,

            "phongCach":
                bo_phoi.luatPhoiLoaiDo.phongCach.tenPhongCach
                if (
                    bo_phoi.luatPhoiLoaiDo
                    and
                    bo_phoi.luatPhoiLoaiDo.phongCach
                )
                else None,

            "dipSuDung":
                bo_phoi.luatPhoiLoaiDo.dipSuDung.tenDipSD
                if (
                    bo_phoi.luatPhoiLoaiDo
                    and
                    bo_phoi.luatPhoiLoaiDo.dipSuDung
                )
                else None,

            "hopLe":
                bo_phoi.hopLe,

            "daYeuThich":
                da_yeu_thich,

            "trangPhucs":
                trang_phucs
        })

    return ket_qua


def them_yeu_thich(
    db: Session,
    ma_nguoi_dung: int,
    ma_bo_phoi: int
):

    da_ton_tai = (
        db.query(YeuThich)
        .filter(
            YeuThich.maNguoiDung
            == ma_nguoi_dung,

            YeuThich.maBoPhoi
            == ma_bo_phoi
        )
        .first()
    )

    # BO YEU THICH
    if da_ton_tai:

        db.delete(da_ton_tai)

        db.commit()

        return {

            "message":
                "Đã bỏ yêu thích",

            "yeuThich":
                False
        }

    # THEM YEU THICH
    yeu_thich = YeuThich(

        maNguoiDung=
            ma_nguoi_dung,

        maBoPhoi=
            ma_bo_phoi
    )

    db.add(yeu_thich)

    db.commit()

    return {

        "message":
            "Đã thêm yêu thích",

        "yeuThich":
            True
    }


def lay_thong_ke(
    db: Session,
    ma_nguoi_dung: int
):

    tong_trang_phuc = (
        db.query(TrangPhuc)
        .filter(
            TrangPhuc.maNguoiDung
            == ma_nguoi_dung
        )
        .count()
    )

    tong_yeu_thich = (
        db.query(YeuThich)
        .filter(
            YeuThich.maNguoiDung
            == ma_nguoi_dung
        )
        .count()
    )

    return {

        "tongTrangPhuc":
            tong_trang_phuc,

        "tongOutfitYeuThich":
            tong_yeu_thich
    }
