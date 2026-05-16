from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.database import Base


class Mau(Base):

    __tablename__ = "mau"

    maMau = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    tenMau = Column(
        String(100),
        nullable=False
    )

    maMauHex = Column(
        String(20),
        nullable=False
    )