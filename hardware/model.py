from datetime import datetime
from pydantic import BaseModel


class SpaModel(BaseModel):
    temp_water: float
    temp_air: float
    error_message: str
    timestamp: datetime
