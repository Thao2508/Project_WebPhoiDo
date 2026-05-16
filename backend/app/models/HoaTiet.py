from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.database import Base


class HoaTiet(Base):

    __tablename__ = "hoa_tiet"

    maHoaTiet = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenHoaTiet = Column(
        String(100),
        nullable=False
    )