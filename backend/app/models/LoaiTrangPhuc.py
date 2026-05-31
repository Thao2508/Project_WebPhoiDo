from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Text

from sqlalchemy.orm import relationship

from app.db.database import Base


class LoaiTrangPhuc(Base):

    __tablename__ = "loai_trang_phuc"

    maLoai = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenLoai = Column(
        String(100),
        nullable=False
    )

    maDanhMuc = Column(
        Integer,
        ForeignKey("danh_muc.maDanhMuc"),
        nullable=False
    )

    tuKhoaNhanDien = Column(
        Text,
        nullable=True
    )

    danhMuc = relationship(
        "DanhMuc",
        back_populates="loaiTrangPhucs"
    )

    trangPhucs = relationship(
        "TrangPhuc",
        back_populates="loai"
    )

    luatLoai1 = relationship(
        "LuatPhoiLoaiDo",
        foreign_keys=
        "LuatPhoiLoaiDo.maLoai_1"
    )

    luatLoai2 = relationship(
        "LuatPhoiLoaiDo",
        foreign_keys=
        "LuatPhoiLoaiDo.maLoai_2"
    )