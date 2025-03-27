import { instance } from "../axios";

export const getTodos = async () => {
  try {
    const apiResponse = await instance.get("/api/todos");
    return apiResponse.data;
  } catch (e) {
    throw new Error("Todo 목록 불러오기 error", e);
  }
};
