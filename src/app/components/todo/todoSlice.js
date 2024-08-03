import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URI;

const initialValue = {
  getTodoDetails: {},
  getTodoLoading: false,
  getTodoDetailsError: {},

  //post todo
  postTodoLoading: false,
  postTodoError: {},
  postTodoDetails: {},

  //update todo
  updateTodoLoading: false,
  updateTodoError: {},
  updateTodoDetails: {},

  //delete Todo
  deleteTodoLoading: false,
  deleteTodoError: {},
  deleteTodoData: {},

  //getOneTodo
  getOneTodoLoading: false,
  getOneTodoError: {},
  getOneTodoDetails: {},
};

export const createTodo = createAsyncThunk("todo/createTodo", async (data) => {
  const response = await axios.post(`${URL}/api/todo`, data);

  return response?.data;
});

export const getOneTodo = createAsyncThunk(
  "todo/getOneTodo",
  async ({ id, email }) => {
    const response = await axios.post(`${URL}/api/todo/${id}`, {
      email,
    });
    return response?.data;
  }
);

export const getTodo = createAsyncThunk("todo/getTodo", async (data) => {
  console.log(data);
  const response = await axios.post(`${URL}/api/todos`, data);
  return response?.data;
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async (data) => {
  const response = await axios.put(`${URL}/api/todo/${data}`);
  return response;
});

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodoData",
  async (data) => {
    const response = await axios.delete(`${URL}/api/todo/${data}`);
    return response;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.postTodoLoading = true;
        state.postTodoError = {};
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.postTodoLoading = false;
        state.postTodoDetails = action.payload?.data;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.postTodoLoading = false;
        state.postTodoError = action.payload;
      })
      .addCase(getTodo.pending, (state) => {
        state.getTodoLoading = true;
        state.getTodoError = {};
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.getTodoLoading = false;
        state.getTodoDetails = action.payload?.data;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.getTodoLoading = false;
        state.getTodoError = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.updateTodoLoading = true;
        state.updateTodoError = {};
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateTodoLoading = false;
        state.updateTodoDetails = action.payload?.data;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.updateTodoLoading = false;
        state.updateTodoError = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodoLoading = true;
        state.deleteTodoError = {};
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deleteTodoLoading = false;
        state.deleteTodo = action.payload?.data;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deleteTodoLoading = false;
        state.deleteTodoError = action?.payload;
      })
      .addCase(getOneTodo.pending, (state) => {
        state.getOneTodoLoading = true;
        state.getOneTodoError = {};
      })
      .addCase(getOneTodo.fulfilled, (state, action) => {
        state.getOneTodoLoading = false;
        state.getOneTodoDetails = action.payload?.data;
      })
      .addCase(getOneTodo.rejected, (state, action) => {
        state.getOneTodoLoading = false;
        state.getOneTodoError = action.payload;
      });
  },
});

const { reducer: todoReducer } = todoSlice;
export default todoReducer;
