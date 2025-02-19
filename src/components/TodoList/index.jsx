import TodoItem from "../TodoItem";

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    <div className="flex-1 m-[20px_10px_62px_32px] overflow-y-auto">
      {todos.map(({ id, text, done }) => (
        <TodoItem key={id} text={text} done={done} />
      ))}
    </div>
  );
};

export default TodoList;
