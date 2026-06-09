from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

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
        default=datetime.utcnow,
        nullable=False
    )

    nguoiDung = relationship(
        "NguoiDung",
        back_populates="yeuThichs"
    )

    boPhoi = relationship(
        "BoPhoi",
        back_populates="yeuThichs"
    )