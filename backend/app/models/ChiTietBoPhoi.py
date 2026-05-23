from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class ChiTietBoPhoi(Base):

    __tablename__ = "chi_tiet_bo_phoi"

    maBoPhoi = Column(
        Integer,
        ForeignKey("bo_phoi.maBoPhoi"),
        primary_key=True
    )

    maTrangPhuc = Column(
        Integer,
        ForeignKey("trang_phuc.maTrangPhuc"),
        primary_key=True
    )

    boPhoi = relationship(
        "BoPhoi",
        back_populates="chiTietBoPhois"
    )

    trangPhuc = relationship(
        "TrangPhuc",
        back_populates="chiTietBoPhois"
    )