import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

# CORS 설정
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 데이터베이스 파일 경로
DB_FILE = "server/todos.db"

# 데이터베이스 초기화 (테이블 생성)
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
@app.route("/api/todos", methods=["GET"])
def get_todos():
    today_date = datetime.now().strftime("%Y-%m-%d")
    return get_todos_by_date(today_date)

# 특정 날짜의 TODO 가져오기
@app.route("/api/todos/date/<string:date>", methods=["GET"])
def get_todos_by_date(date):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, text, done FROM todos WHERE date = ?", (date,))
        todos = [{"id": row[0], "text": row[1], "done": bool(row[2])} for row in cursor.fetchall()]
    return jsonify({"todos": todos})

# 새로운 TODO 생성
@app.route("/api/todos/create", methods=["POST"])
def create_todo():
    data = request.json
    text = data.get("text")
    date = data.get("date", datetime.now().strftime("%Y-%m-%d"))

    if not text:
        return jsonify({"error": "Todo text is required"}), 400

    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO todos (date, text, done) VALUES (?, ?, ?)", (date, text, False))
        new_id = cursor.lastrowid  # 새로 생성된 id 가져오기
        conn.commit()

    return jsonify({"todo": {"id": new_id, "text": text, "done": False, "date": date}}), 201

# 특정 TODO의 완료 상태 토글
@app.route("/api/todos/<int:todo_id>", methods=["PUT"])
def toggle_todo(todo_id):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT done FROM todos WHERE id = ?", (todo_id,))
        result = cursor.fetchone()
        
        if result is None:
            return jsonify({"error": "Todo not found"}), 404

        new_done_status = not bool(result[0])
        cursor.execute("UPDATE todos SET done = ? WHERE id = ?", (new_done_status, todo_id))
        conn.commit()

    return jsonify({"success": True})

# 특정 TODO 삭제
@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
        if cursor.rowcount == 0:
            return jsonify({"error": "Todo not found"}), 404
        conn.commit()

    return jsonify({"success": True})

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
