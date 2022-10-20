import axios from 'axios';
axios.defaults.withCredentials = true



const getEventInfo = async (eventCode) => {
  const response = await axios.post('/api/events', eventCode)

  return response.data
}




const getTeamInfo = async (teamData) => {
  const response = await axios.post('/api/events/teamInfo', teamData)

  return response.data
}




const getRewardRate = async (teamData) => {
  const response = await axios.post('/api/events/getRewardRate', teamData)

  return response.data
}







const predictionEventService = {
  getTeamInfo,
  getEventInfo,
  getRewardRate,
}



export default predictionEventService