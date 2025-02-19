import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoHead from "../components/TodoHead";
import TodoList from "../components/TodoList";
import TodoCreate from "../components/TodoCreate";
import CalenderIcon from "../assets/images/calendar.png";
import { getTodos, toggleTodo, deleteTodo, createTodo } from "../apis";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  // 할 일 불러오기
  const fetchTodos = async () => {
    const todoResponse = await getTodos();
    setTodos(todoResponse);
  };

  // 할 일 추가
  const handleCreate = async (text) => {
    try {
      const newTodo = await createTodo(text);
      setTodos([...todos, newTodo]);
    } catch (e) {
      console.error(e);
    }
  };

  // 할 일 상태 변경 (done 값 토글)
  const handleToggle = async (id) => {
    try {
      await toggleTodo(id);
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  // 할 일 삭제
  const handleRemove = async (id) => {
    try {
      await deleteTodo(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <TodoHead todos={todos} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      <TodoCreate onCreate={handleCreate} />
      <Link to="/history">
        <img
          src={CalenderIcon}
          className="absolute w-15 right-8 bottom-10 opacity-20 hover:opacity-100 transition-opacity duration-120"
        />
      </Link>
    </>
  );
};

export default HomePage;
