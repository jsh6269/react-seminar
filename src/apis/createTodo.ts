import { instance } from "../axios";

export const createTodo = async (text: string) => {
  try {
    const newTodo = { text };
    const createTodoResponse = await instance.post(
      "/api/todos/create",
      newTodo
    );
    return createTodoResponse.data;
  } catch (e) {
    throw new Error("Todo 생성 에러: " + (e instanceof Error ? e.message : ""));
  }
};
