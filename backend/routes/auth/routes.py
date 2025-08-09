from fastapi.routing import APIRouter
from fastapi import status,HTTPException,Depends
from .services import db_dependency, bcrypt_context,oauth2_bearer,authenticate_user,create_access_token
from .models import CreateUserRequest,Token
from database.database import User
from sqlmodel import select
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm

auth_router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@auth_router.post('/signup',status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency,request: CreateUserRequest):
    if request.username is None or request.password is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username and password are required")
    user = User(
        username=request.username,
        password=bcrypt_context.hash(request.password)
    )
    existing_user = db.exec(select(User).where(User.username == request.username)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists")
    db.add(user)
    db.commit()
    
@auth_router.post('/token',response_model=Token)
def get_access_token(form_data: Annotated[OAuth2PasswordRequestForm,Depends()],db:db_dependency):
    user = authenticate_user(form_data.username,form_data.password,db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials")
    user_data = {
        "id": user.id,
        "username": user.username
    }
    token = create_access_token(user_data)
    return {'access_token' : token, 'token_type' : "bearer"}