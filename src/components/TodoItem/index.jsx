const TodoItem = ({ text, done }) => {
  return (
    <div className="flex items-center py-3 px-5">
      <div className={done ? "check-circle circle-done" : "check-circle"}>
        {done ? "✓" : ""}
      </div>
      <div className={done ? "text text-done" : "text"}>{text}</div>
      <div className={"remove-icon visible"}>삭제</div>
    </div>
  );
};

export default TodoItem;
