from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from app.db.database import Base


class YeuThich(Base):

    __tablename__ = "yeu_thich"

    maNguoiDung = Column(
        Integer,
        ForeignKey("nguoi_dung.maNguoiDung"),
        primary_key=True
    )

    maBoPhoi = Column(
        Integer,
        ForeignKey("bo_phoi.maBoPhoi"),
        primary_key=True
    )

    ngayTao = Column(
        DateTime,
        nullable=False
    )