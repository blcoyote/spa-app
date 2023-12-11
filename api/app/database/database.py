from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib
from settings import get_settings

username = urllib.parse.quote_plus(get_settings().DBUSER)
password = urllib.parse.quote_plus(get_settings().DBPW)
SQLALCHEMY_DATABASE_URL = (
    'postgresql://{}:{}@192.168.0.20:54321/weatherAPI'.format(username, password)
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL  # , connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
