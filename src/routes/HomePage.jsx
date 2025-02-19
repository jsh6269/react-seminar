import { Link } from "react-router-dom";
import CalenderIcon from "../assets/images/calendar.png";

const HomePage = () => {
  return (
    <>
      <h1 className="text-start m-12 mb-8 px-1">Home</h1>
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
