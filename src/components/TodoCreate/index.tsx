import { useState, ChangeEvent, FormEvent } from "react";
import plus from "../../assets/images/plus.png";

interface TodoCreateProps {
  onCreate: (text: string) => void;
}

const TodoCreate: React.FC<TodoCreateProps> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      onCreate(text);
    }
    setText("");
    setOpen(false);
  };
  const handleCreateToggleButtonClick = () => {
    setOpen((open) => !open);
  };
  return (
    <>
      {open && (
        <div className="absolute left-0 bottom-0 w-full z-5">
          <form className="insert-form" onSubmit={handleSubmit}>
            <input
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요"
              onChange={handleTextInputChange}
              value={text}
            />
          </form>
        </div>
      )}
      <button
        className={open ? "circle-button button-open" : "circle-button"}
        onClick={handleCreateToggleButtonClick}
      >
        <img src={plus} className="invert" />
      </button>
    </>
  );
};

export default TodoCreate;
