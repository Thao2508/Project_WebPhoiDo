from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

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