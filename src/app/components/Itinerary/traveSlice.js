import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URI;

const initialState = {
  travelDetails: {},
  travelDetailsLoading: false,
  travelDetailsError: {},

  TripDetail: {},
  TripDetailLoading: false,
  TripDetailError: {},

  TripsDetails: [],
  TripsDetailsLoading: false,
  TripsDetailsError: {},

  deleteTrip: {},
  deleteTripLoading: false,
  deleteTripError: {},
};

export const createTravel = createAsyncThunk(
  "travel/createTravel",
  async (data) => {
    const response = await axios.post(`${URL}api/generate-itinerary`, data);
    return response?.data;
  }
);

export const getTrip = createAsyncThunk("travel/getTrip", async (data) => {
  const response = await axios.post(`${URL}api/trip`, data);
  return response?.data;
});

export const getTrips = createAsyncThunk("travel/getTrips", async (data) => {
  const response = await axios.post(`${URL}api/trips`, data);
  return response?.data;
});

export const deleteOneTrip = createAsyncThunk(
  "travel/deleteOneTrip",
  async (data) => {
    const response = await axios.delete(`${URL}api/trips/${data}`);
    return response?.data;
  }
);

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTravel.pending, (state) => {
      state.travelDetailsLoading = true;
    });
    builder.addCase(createTravel.fulfilled, (state, action) => {
      state.travelDetailsLoading = false;
      state.travelDetails = action.payload?.response;
    });
    builder
      .addCase(createTravel.rejected, (state, action) => {
        state.travelDetailsLoading = false;
        state.travelDetailsError = action.error.message;
      })
      .addCase(getTrip.pending, (state) => {
        state.TripDetailLoading = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.TripDetailLoading = false;
        state.TripDetail = action.payload?.response;
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.TripDetailLoading = false;
        state.TripDetailError = action.error.message;
      })
      .addCase(getTrips.pending, (state) => {
        state.TripsDetailsLoading = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.TripsDetailsLoading = false;
        state.TripsDetails = action.payload?.response || [];
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.TripsDetailsLoading = false;
        state.TripsDetailsError = action.error?.error;
      })
      .addCase(deleteOneTrip.pending, (state) => {
        state.deleteTripLoading = true;
      })
      .addCase(deleteOneTrip.fulfilled, (state, action) => {
        state.deleteTripLoading = false;
        state.deleteTrip = action.payload?.message;
      })
      .addCase(deleteOneTrip.rejected, (state, action) => {
        state.deleteTripLoading = false;
        state.deleteTripError = action.error.message;
      });
  },
});

const { reducer: travelReducer } = travelSlice;

export default travelReducer;
