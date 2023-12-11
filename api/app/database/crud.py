from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import database.models as models
import database.schemas as schemas


# def get_jobs(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Job).offset(skip).limit(limit).all()


# def get_job(db: Session, skip: int = 0, limit: int = 100):
#     job = db.query(models.Job).filter_by(description='string').first()
#     if job is not None:
#         job.description = "test"
#         db.commit()
#         return job
#     else:
#         return None


def get_last_spa_entry(db: Session):
    return db.query(models.Spa).order_by(models.Spa.id.desc()).first()


def get_spa_entries( db: Session):
    time_24_hours_ago = datetime.now() - timedelta(days=1)
    return db.query(models.Spa).filter(
            models.Spa.timestamp > time_24_hours_ago ).order_by(models.Spa.id.asc()).all()


def create_spa_entry(db: Session, item: schemas.Spa):
    db_item = models.SpaCreate(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
