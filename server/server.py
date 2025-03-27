import sqlite3
from datetime import datetime
from typing import List

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Todo, TodoWithID

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "server/todos.db"

def init_db():
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                text TEXT NOT NULL,
                done BOOLEAN NOT NULL DEFAULT 0
            )
        """)
        conn.commit()

# 오늘의 TODO 가져오기
@app.get("/api/todos", response_model=List[TodoWithID])
def get_todos():
    today_date = datetime.now().strftime("%Y-%m-%d")
    return get_todos_by_date(today_date)

# 특정 날짜의 TODO 가져오기
@app.get("/api/todos/date/{date}", response_model=List[TodoWithID])
def get_todos_by_date(date: str):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, text, done, date FROM todos WHERE date = ?", (date,))
        todos = [{"id": row[0], "text": row[1], "done": bool(row[2]), "date": row[3]} for row in cursor.fetchall()]
    return todos

# 새로운 TODO 생성
@app.post("/api/todos/create", response_model=TodoWithID, status_code=201)
def create_todo(todo: Todo):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO todos (date, text, done) VALUES (?, ?, ?)", (todo.date, todo.text, todo.done))
        new_id = cursor.lastrowid
        conn.commit()

    return {"id": new_id, "text": todo.text, "done": todo.done, "date": todo.date}

# 특정 TODO 완료 상태 토글
@app.put("/api/todos/{todo_id}", response_model=dict)
def toggle_todo(todo_id: int):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT done FROM todos WHERE id = ?", (todo_id,))
        result = cursor.fetchone()

        if result is None:
            raise HTTPException(status_code=404, detail="Todo not found")

        new_done_status = not bool(result[0])
        cursor.execute("UPDATE todos SET done = ? WHERE id = ?", (new_done_status, todo_id))
        conn.commit()

    return {"success": True}

# 특정 TODO 삭제
@app.delete("/api/todos/{todo_id}", response_model=dict)
def delete_todo(todo_id: int):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Todo not found")
        conn.commit()

    return {"success": True}

# 서버 실행
if __name__ == "__main__":
    init_db()
    uvicorn.run(app, host="0.0.0.0", port=5000)
