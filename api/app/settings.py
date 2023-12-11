from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache


class Settings(BaseSettings):
    ACCESSCTL: str = Field(validation_alias="ACCESSCTL")
    VERSION: str = Field(validation_alias="VERSION")
    DBPW: str = Field(validation_alias="DBPW",)
    DBUSER: str = Field(validation_alias="DBUSER")


    class Config:
        env_file = "./.env"


@lru_cache()
def get_settings():
    return Settings()  # type: ignore
