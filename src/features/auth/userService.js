import axios from 'axios'
axios.defaults.withCredentials = true





// LOGOUT USER
const logout = async () => {
  await axios.post('/api/users/logout')
}

// REGISTER USER
const register = async (userData) => {
  const response = await axios.post('/api/users/register', userData)

  return response.data
}

// LOGIN USER
const login = async (userData) => {
  const response = await axios.post('/api/users/login', userData)

  return response.data
}

// UPDATE USER INFO
const updateInfo = async (userData) => {
  const response = await axios.post('/api/users/me', userData)

  return response.data
}

// UPDATE USER INFO ON UI
const getUserData = async (userData) => {
  const response = await axios.post('/api/users/me/updateUI', userData)

  return response.data
}

// DELETE USER DATA
const deleteUser = async (userData) => {
  const response = await axios.post('/api/users/me/delete', userData)

  if (response.data) {
    localStorage.removeItem('mainstreamUser')
  }

  return response.data
}











// ADD TEAM TO WATCHLIST
const addTeamToWatchlist = async (teamData) => {
  const response = await axios.post('/api/users/team/watch', teamData)


  return response.data
}

// REMOVE TEAM FROM WATCHLIST
const removeTeamFromWatchlist = async (teamData) => {
  const response = await axios.post('/api/users/team/unwatch', teamData)

  
  return response.data
}









// BUY TEAM TOKEN AND ADD TO WATCHLIST
const purchaseTeamToken = async (teamAndEventData) => {
  const response = await axios.post('/api/events/buyToken', teamAndEventData)

  return response.data
}

// SELL TEAM TOKEN AND REMOVE FROM WATCHLIST
const sellPurchasedTeamToken = async (teamAndEventData) => {
  const response = await axios.post('/api/events/getRewardInfo', teamAndEventData)

  return response.data
}









// ASSIGN WALLET TO USER
const assignWalletToUser = async (userData) => {
  const response = await axios.post('/api/users/me/assignWallet', userData)

  return response.data
}

// CHECK IF USER HAS A WALLET ASSIGNED TO THEM
const checkIfUserHasAssignedWallet = async (userData) => {
  const response = await axios.post('/api/users/me/checkForWallet', userData)

  return response.data
}

// CHECK IF USER HAS FUNDED ASSIGNED WALLET
const fundUserWallet = async (userData) => {
  const response = await axios.post('/api/users/me/fundWallet', userData)

  return response.data
}









// WITHDRAW TOKEN
const processWithdrawalRequest = async (userData) => {
  const response = await axios.post('/api/users/me/withdrawFund', userData)
  
  return response.data
}











const authService = {
  register,
  login,
  deleteUser,
  updateInfo,
  getUserData,
  logout,
  addTeamToWatchlist,
  removeTeamFromWatchlist,
  purchaseTeamToken,
  sellPurchasedTeamToken,
  assignWalletToUser,
  processWithdrawalRequest,
  checkIfUserHasAssignedWallet,
  fundUserWallet,
}



export default authService