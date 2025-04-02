import TodoItem from "../TodoItem";
import { Todo } from "../../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onRemove }) => {
  return (
    <div className="flex-1 m-[20px_10px_62px_32px] overflow-y-auto">
      {todos.map(({ id, text, done }) => (
        <TodoItem
          key={id}
          text={text}
          done={done}
          onToggle={() => onToggle(id)}
          onRemove={() => onRemove(id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
