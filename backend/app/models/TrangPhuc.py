from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Text

from sqlalchemy.orm import relationship

from app.db.database import Base


class TrangPhuc(Base):

    __tablename__ = "trang_phuc"

    maTrangPhuc = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenTrangPhuc = Column(
        String(100),
        nullable=False
    )

    hinhAnh = Column(
        Text,
        nullable=False
    )

    maMau = Column(
        Integer,
        ForeignKey("mau.maMau"),
        nullable=False
    )

    maHoaTiet = Column(
        Integer,
        ForeignKey("hoa_tiet.maHoaTiet"),
        nullable=False
    )

    maLoai = Column(
        Integer,
        ForeignKey(
            "loai_trang_phuc.maLoai"
        ),
        nullable=False
    )

    maNguoiDung = Column(
        Integer,
        ForeignKey(
            "nguoi_dung.maNguoiDung"
        ),
        nullable=False
    )

    kieuDang = Column(
        String(100),
        nullable=True
    )
    nguoiDung = relationship(
        "NguoiDung",
        back_populates="trangPhucs"
    )

    loai = relationship(
        "LoaiTrangPhuc",
        back_populates="trangPhucs"
    )

    mau = relationship(
        "Mau"
    )

    hoaTiet = relationship(
        "HoaTiet"
    )

    chiTietBoPhois = relationship(
        "ChiTietBoPhoi",
        back_populates="trangPhuc"
    )