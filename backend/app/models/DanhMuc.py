from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship
from app.db.database import Base


class DanhMuc(Base):

    __tablename__ = "danh_muc"

    maDanhMuc = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenDanhMuc = Column(
        String(100),
        nullable=False
    )

    phamViSuDung = Column(
        String(255),
        nullable=True
    )

    loaiTrangPhucs = relationship(
        "LoaiTrangPhuc",
        back_populates="danhMuc"
    )