import { useState } from "react";

const TodoItem = ({ text, done, onToggle, onRemove }) => {
  const [isRemoveIconVisible, setIsRemoveIconVisible] = useState(false);

  const handleMouseOver = () => setIsRemoveIconVisible(true);
  const handleMouseLeave = () => setIsRemoveIconVisible(false);
  const handleCheckButtonClick = () => onToggle();
  const handleDeleteButtonClick = () => onRemove();

  return (
    <div
      className="flex items-center py-3 px-5"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={done ? "check-circle circle-done" : "check-circle"}
        onClick={handleCheckButtonClick}
      >
        {done ? "✓" : ""}
      </div>
      <div className={done ? "text text-done" : "text"}>{text}</div>
      <div
        className={`remove-icon ${
          isRemoveIconVisible ? "visible" : "invisible"
        }`}
        onClick={handleDeleteButtonClick}
      >
        삭제
      </div>
    </div>
  );
};

export default TodoItem;
