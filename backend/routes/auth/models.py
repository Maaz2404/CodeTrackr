from pydantic import Field,BaseModel

class CreateUserRequest(BaseModel):
    username: str = Field(max_length=20, min_length=3)
    password: str = Field(max_length=20, min_length=5)
    
class Token(BaseModel):
    access_token:str
    token_type:str    