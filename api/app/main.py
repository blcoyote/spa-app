from typing import List
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import uvicorn
from datetime import datetime
from database import crud, schemas
from database.database import SessionLocal
from settings import get_settings
from sqlalchemy.orm import Session

logger.remove(0)
logger.add(
    f"./log/apilog_{datetime.now().strftime('%Y-%m-%d')}.log",
    rotation="1 day",
    colorize=False,
    format="{time:YYYY-MM-DD HH:mm:ss.SSS} | {level} | <level>{message}</level>",
)

app = FastAPI(title="SpAPI", version=get_settings().VERSION, debug=False)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@logger.catch
@app.post("/spa", status_code=status.HTTP_201_CREATED)
async def store(
    Key: str,
    spa: schemas.SpaBase,
    db: Session = Depends(get_db),
):
    if Key != get_settings().ACCESSCTL:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        data_for_db = schemas.SpaBase.model_validate(spa)
        crud.create_spa_entry(db, data_for_db)

    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Could not store data")


@logger.catch
@app.get("/spa/last24h", status_code=status.HTTP_200_OK, response_model=List[schemas.Spa])
async def getLast24h(
    Key: str,
    db: Session = Depends(get_db),
):
    if Key != get_settings().ACCESSCTL:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        return crud.get_spa_entries(db)

    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Could not get data")


@logger.catch
@app.get("/spa/last", status_code=status.HTTP_200_OK, response_model=schemas.Spa)
async def getLast(
    Key: str,
    db: Session = Depends(get_db),
):
    if Key != get_settings().ACCESSCTL:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        return crud.get_last_spa_entry(db)

    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=500, detail="Could not get data")


# Dev mode launcher - not needed for prod
if __name__ == "__main__":
    uvicorn.run(app)
