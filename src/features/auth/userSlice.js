import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './userService'


const user = JSON.parse(localStorage.getItem('mainstreamUser'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}



// LOGOUT USER
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})


// REGISTER USER
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
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


// LOGIN USER
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
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


// UPDATE USER INFO
export const updateInfo = createAsyncThunk('auth/updateInfo', async (userData, thunkAPI) => {
  try {
    return await authService.updateInfo(userData)
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


// UPDATE USER INFO ON UI
export const getUserData = createAsyncThunk('auth/getUserData', async (userData, thunkAPI) => {
  try {
    return await authService.getUserData(userData)
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


// DELETE USER DATA
export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, thunkAPI) => {
  try {
    return await authService.deleteUser(userId)
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







// ADD TEAM TO WATCHLIST
export const addTeamToWatchlist = createAsyncThunk('auth/addTeamToWatchlist', async (teamData, thunkAPI) => {
  try {
    return await authService.addTeamToWatchlist(teamData)
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


// REMOVE TEAM FROM WATCHLIST
export const removeTeamFromWatchlist = createAsyncThunk('auth/removeTeamFromWatchlist', async (teamData, thunkAPI) => {
  try {
    return await authService.removeTeamFromWatchlist(teamData)
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










// BUY TEAM TOKEN AND ADD TO WATCHLIST
export const purchaseTeamToken = createAsyncThunk('auth/buyToken', async (teamAndEventData, thunkAPI) => {
  try {
    return await authService.purchaseTeamToken(teamAndEventData)
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


// SELL TEAM TOKEN AND REMOVE FROM WATCHLIST
export const sellPurchasedTeamToken = createAsyncThunk('auth/sellToken', async (teamAndEventData, thunkAPI) => {
  try {
    return await authService.sellPurchasedTeamToken(teamAndEventData)
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









// ASSIGN WALLET TO USER
export const assignWalletToUser = createAsyncThunk('auth/assignWallet', async (userData, thunkAPI) => {
  try {
    return await authService.assignWalletToUser(userData)
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


// CHECK IF USER HAS A WALLET ASSIGNED TO THEM
export const checkIfUserHasAssignedWallet = createAsyncThunk('auth/checkForWallet', async (userData, thunkAPI) => {
  try {
    return await authService.checkIfUserHasAssignedWallet(userData)
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


// CHECK IF USER HAS FUNDED ASSIGNED WALLET
export const fundUserWallet = createAsyncThunk('auth/fundWallet', async (userData, thunkAPI) => {
  try {
    return await authService.fundUserWallet(userData)
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









// WITHDRAW TOKEN
export const processWithdrawalRequest = createAsyncThunk('auth/withdrawFund', async (userData, thunkAPI) => {
  try {
    return await authService.processWithdrawalRequest(userData)
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











export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(updateInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(addTeamToWatchlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTeamToWatchlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(addTeamToWatchlist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeTeamFromWatchlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeTeamFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(removeTeamFromWatchlist.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(purchaseTeamToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(purchaseTeamToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(purchaseTeamToken.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(sellPurchasedTeamToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sellPurchasedTeamToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(sellPurchasedTeamToken.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(assignWalletToUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(assignWalletToUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(assignWalletToUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(processWithdrawalRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(processWithdrawalRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(processWithdrawalRequest.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(checkIfUserHasAssignedWallet.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkIfUserHasAssignedWallet.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(checkIfUserHasAssignedWallet.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(fundUserWallet.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fundUserWallet.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(fundUserWallet.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})


export const {reset} = authSlice.actions
export default authSlice.reducer