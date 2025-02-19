import { instance } from "../axios";

export const createTodo = async (text) => {
  try {
    const newTodo = { text };
    const createTodoResponse = await instance.post(
      "/api/todos/create",
      newTodo
    );
    return createTodoResponse.data.todo;
  } catch (e) {
    throw new Error("Todo 생성 에러", e);
  }
};
