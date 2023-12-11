from datetime import datetime
from pydantic import BaseModel

class SpaBase(BaseModel):
    temp_water: float
    temp_air: float
    error_message: str
    timestamp: datetime

    class Config:
        from_attributes = True

class Spa(SpaBase):
    id: int
    created: datetime