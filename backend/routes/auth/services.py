from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from database.database import get_session,User
from typing import Annotated
from sqlmodel import Session,select
from fastapi import Depends,HTTPException,status
from datetime import datetime,timedelta
from jose import jwt,JWTError

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORTIHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

bcrypt_context = CryptContext(schemes=["bcrypt"],deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

db_dependency = Annotated[Session,Depends(get_session)]

def authenticate_user(username,password,db):
    user = db.exec(select(User).where(User.username == username)).first()
    if not user:
        return False
    if not bcrypt_context.verify(password,user.password):
        return False
    return user

def create_access_token(user_data:dict,expires_delta:timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    encode = user_data.copy()
    expires = datetime.now() + expires_delta
    encode.update({"exp":expires})
    return jwt.encode(encode,SECRET_KEY,algorithm=ALGORTIHM)

async def get_current_user(token: Annotated[str,Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORTIHM])
        username = payload.get('username')
        user_id = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate user")
        return {"username": username, "id": user_id}    
    except JWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate user")
        
user_dependency = Annotated[dict,Depends(get_current_user)]        