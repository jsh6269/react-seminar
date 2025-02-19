import { instance } from "../axios";

export const deleteTodo = async (id) => {
  try {
    await instance.delete(`/api/todos/${id}`);
    return true;
  } catch (e) {
    throw new Error("Todo 삭제 에러", e);
  }
};
