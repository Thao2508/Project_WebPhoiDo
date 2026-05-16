from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from app.db.database import Base


class LuatPhoiMau(Base):

    __tablename__ = "luat_phoi_mau"

    maLuatMau = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    maMau_1 = Column(
        Integer,
        ForeignKey("mau.maMau"),
        nullable=False
    )

    maMau_2 = Column(
        Integer,
        ForeignKey("mau.maMau"),
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