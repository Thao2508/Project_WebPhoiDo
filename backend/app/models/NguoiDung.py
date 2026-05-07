from sqlalchemy import Column, Integer, String
from app.db.database import Base

class NguoiDung(Base):
    __tablename__ = "nguoi_dung"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))