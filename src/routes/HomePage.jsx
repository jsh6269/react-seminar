import { Link } from "react-router-dom";
import { format } from "date-fns";
import TodoHead from "../components/TodoHead";
import TodoList from "../components/TodoList";
import TodoDummyData from "../data/dummy.json";
import CalenderIcon from "../assets/images/calendar.png";

const HomePage = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const todos = TodoDummyData[today] || [];

  return (
    <>
      <TodoHead todos={todos} />
      <TodoList todos={todos} />
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
