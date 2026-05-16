from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from app.db.database import Base


class LuatPhoiLoaiDo(Base):

    __tablename__ = "luat_phoi_loai_do"

    maLuat = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    maLoai_1 = Column(
        Integer,
        ForeignKey("loai_trang_phuc.maLoai"),
        nullable=False
    )

    maLoai_2 = Column(
        Integer,
        ForeignKey("loai_trang_phuc.maLoai"),
        nullable=False
    )

    maPhongCach = Column(
        Integer,
        ForeignKey("phong_cach.maPhongCach"),
        nullable=False
    )

    maDipSD = Column(
        Integer,
        ForeignKey("dip_su_dung.maDipSD"),
        nullable=False
    )

    hopLe = Column(
        Boolean,
        default=True
    )