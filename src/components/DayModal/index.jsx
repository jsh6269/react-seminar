import { format } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import { getTodosByDate } from "../../apis";

const DATE_FORMAT_FORM = "yyyy-MM-dd";

const DayModal = ({ selectedDate, closeModal }) => {
  const [todos, setTodos] = useState([]);
  const [formattedDate, setFormattedDate] = useState(
    format(selectedDate, DATE_FORMAT_FORM)
  );
  const formatSelectedDate = (date) => format(date, DATE_FORMAT_FORM);

  const getTodosBySelectedDate = async (selectedDate) => {
    try {
      const getTodosByDateResponse = await getTodosByDate(selectedDate);
      setTodos(getTodosByDateResponse);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const formatted = formatSelectedDate(selectedDate);
    setFormattedDate(formatted);
    getTodosBySelectedDate(formatted);
  }, [selectedDate]);

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50"
        onClick={closeModal}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-80"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-8">{formattedDate}</h2>
          {todos.length > 0 ? (
            <ul>
              {todos.map(({ id, text, done }) => (
                <li key={id} className="mb-2">
                  <p className="text-gray-700 flex justify-between m-4">
                    <span className="font-semibold">{text}</span>{" "}
                    <span className={done ? "text-green-500" : "text-red-500"}>
                      {done ? "완료" : "미완료"}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 mb-8">선택한 날짜에 일정이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DayModal;
