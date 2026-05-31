from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import Date
from sqlalchemy.orm import relationship
from app.db.database import Base


class NguoiDung(Base):

    __tablename__ = "nguoi_dung"

    maNguoiDung = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenDangNhap = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        nullable=False,
        unique=True
    )

    matKhau = Column(
        String(100),
        nullable=False
    )

    gioiTinh = Column(
        Integer,
        nullable=True
    )

    ngaySinh = Column(
        Date,
        nullable=True
    )

    vaiTro = Column(
        Integer,
        nullable=False,
        default=0
    )

    trangThai = Column(
        Boolean,
        nullable=False,
        default=True
    )

    trangPhucs = relationship(
        "TrangPhuc",
        back_populates="nguoiDung"
    )

    yeuThichs = relationship(
        "YeuThich",
        back_populates="nguoiDung"
    )

    boPhois = relationship(
    "BoPhoi",
    back_populates="nguoiDung"
)