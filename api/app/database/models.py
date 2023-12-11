from sqlalchemy import Column, Integer, Text
from sqlalchemy.sql.sqltypes import TIMESTAMP, Float
from database.database import Base


class SpaCreate(Base):
    __tablename__ = "Spa"

    id = Column(Integer, primary_key=True, index=True)
    temp_water = Column(Float, index=False)
    temp_air = Column(Float, index=False)
    error_message = Column(Text, index=False)
    timestamp = Column(TIMESTAMP, index=False)


class Spa(SpaCreate):
    created = Column(TIMESTAMP, index=False)
