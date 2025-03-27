from datetime import datetime
from pydantic import BaseModel

class Todo(BaseModel):
    text: str
    date: str = datetime.now().strftime("%Y-%m-%d")
    done: bool = False

class TodoWithID(Todo):
    id: int
