import { Link } from "react-router-dom";
import CheckListIcon from "../assets/images/checklist.png";

const HistoryPage = () => {
  return (
    <>
      <h1 className="text-start m-12 mb-8 px-1">History</h1>
      <Link to="/">
        <img
          src={CheckListIcon}
          className="absolute w-15 right-8 bottom-10 opacity-20 hover:opacity-100 transition-opacity duration-120"
        />
      </Link>
    </>
  );
};

export default HistoryPage;
