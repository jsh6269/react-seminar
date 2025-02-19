import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import TodoHead from "../components/TodoHead";
import TodoList from "../components/TodoList";
import TodoCreate from "../components/TodoCreate";
import TodoDummyData from "../data/dummy.json";
import CalenderIcon from "../assets/images/calendar.png";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  // 할 일 추가
  const handleCreate = (text) => {
    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 0;

    const newTodo = { id: newId, text, done: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // 초기 데이터 불러오기
  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    setTodos(TodoDummyData[today] || []);
  }, []);

  return (
    <>
      <TodoHead todos={todos} />
      <TodoList todos={todos} />
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
