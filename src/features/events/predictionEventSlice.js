import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import predictionEventService from './predictionEventService'



const initialState = {
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



export const getEventInfo = createAsyncThunk('/', async (eventCode, thunkAPI) => {
  try {
    return await predictionEventService.getEventInfo(eventCode)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const getTeamInfo = createAsyncThunk('/teamData', async (teamData, thunkAPI) => {
  try {
    return await predictionEventService.getTeamInfo(teamData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const getRewardRate = createAsyncThunk('/rewardRate', async (teamData, thunkAPI) => {
  try {
    return await predictionEventService.getRewardRate(teamData)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})







export const predictionEventSlice = createSlice({
  name: 'events',
  initialState,
  reducer: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTeamInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeamInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = action.payload
      })
      .addCase(getTeamInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEventInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEventInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = action.payload
      })
      .addCase(getEventInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRewardRate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRewardRate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = action.payload
      })
      .addCase(getRewardRate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})



export const { reset } = predictionEventSlice.actions
export default predictionEventSlice.reducer