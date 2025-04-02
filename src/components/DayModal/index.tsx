import { format } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import { getTodosByDate } from "../../apis";
import { Todo } from "../../types/todo";

const DATE_FORMAT_FORM = "yyyy-MM-dd";

interface DayModalProps {
  selectedDate: Date;
  closeModal: () => void;
}

const DayModal: React.FC<DayModalProps> = ({ selectedDate, closeModal }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async (date: string) => {
    try {
      const todosByDate = await getTodosByDate(date);
      setTodos(todosByDate);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const formattedDate = format(selectedDate, DATE_FORMAT_FORM);
    fetchTodos(formattedDate);
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
          <h2 className="text-lg font-semibold mb-8">
            {format(selectedDate, DATE_FORMAT_FORM)}
          </h2>
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
