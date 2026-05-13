from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

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

    vaiTro = Column(
        Integer,
        default=0
    )