from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import relationship
from app.db.database import Base


class PhongCach(Base):

    __tablename__ = "phong_cach"

    maPhongCach = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenPhongCach = Column(
        String(100),
        nullable=False
    )

    moTa = Column(
        Text,
        nullable=True
    )

    luatPhoiLoaiDos = relationship(
        "LuatPhoiLoaiDo",
        back_populates="phongCach"
    )

    luatPhoiMaus = relationship(
        "LuatPhoiMau",
        back_populates="phongCach"
    )