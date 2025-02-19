import { instance } from "../axios";

export const getTodosByDate = async (date) => {
  try {
    const getTodosByDateResponse = await instance.get(
      `/api/todos/date/${date}`
    );
    return getTodosByDateResponse.data.todos;
  } catch (e) {
    throw new Error("날짜별 Todo Data 통신 Error", e);
  }
};
