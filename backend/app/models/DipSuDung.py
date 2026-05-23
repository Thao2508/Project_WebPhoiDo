from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship
from app.db.database import Base


class DipSuDung(Base):

    __tablename__ = "dip_su_dung"

    maDipSD = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenDipSD = Column(
        String(100),
        nullable=False
    )

    luatPhoiLoaiDos = relationship(
        "LuatPhoiLoaiDo",
        back_populates="dipSuDung"
    )

    luatPhoiMaus = relationship(
        "LuatPhoiMau",
        back_populates="dipSuDung"
    )