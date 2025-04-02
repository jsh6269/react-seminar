import { instance } from "../axios";

export const toggleTodo = async (id: number) => {
  try {
    await instance.put(`/api/todos/${id}`);
    return true;
  } catch (e) {
    throw new Error(
      "할일 목록 Toggle error" + (e instanceof Error ? e.message : "")
    );
  }
};
