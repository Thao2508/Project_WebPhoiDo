from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class BoPhoi(Base):

    __tablename__ = "bo_phoi"

    maBoPhoi = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenBoPhoi = Column(
        String(100),
        nullable=False
    )

    moTa = Column(
        String(255),
        nullable=True
    )

    ngayTao = Column(
        Date,
        nullable=False
    )

    trangThai = Column(
        Integer,
        default=0
    )

    maLuat = Column(
        Integer,
        ForeignKey("luat_phoi_loai_do.maLuat"),
        nullable=False
    )

    maLuatMau = Column(
        Integer,
        ForeignKey("luat_phoi_mau.maLuatMau"),
        nullable=False
    )

    hopLe = Column(
        Boolean,
        default=True
    )

    maNguoiDung = Column(
    Integer,
    ForeignKey("nguoi_dung.maNguoiDung")
)
    
    luatPhoiLoaiDo = relationship(
        "LuatPhoiLoaiDo"
    )

    luatPhoiMau = relationship(
        "LuatPhoiMau"
    )

    chiTietBoPhois = relationship(
        "ChiTietBoPhoi",
        back_populates="boPhoi"
    )

    yeuThichs = relationship(
        "YeuThich",
        back_populates="boPhoi"
    )

    nguoiDung = relationship(
        "NguoiDung",
        back_populates="boPhois"
    )