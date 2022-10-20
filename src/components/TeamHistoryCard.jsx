import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { getRewardRate } from '../features/events/predictionEventSlice';
import { pastAndOngoingEvents } from "../variables/events"
import { eventTeams } from "../variables/eventTeams"




const TeamHistoryCard = (props) => {

    const eventCode = props.portfolioItem?.eventCode,
          [eventROI, setEventROI] = useState(0),
          eventInfo = pastAndOngoingEvents.find(currentEvent => currentEvent?.eventCode === eventCode),
          teamInfo = eventTeams[props.portfolioItem.eventCode].find(teams => teams.tokenAddress === props.portfolioItem.teamAddress),
          dispatch = useDispatch();
  




  const getTeamInfoFromSC = useCallback(() => {
    dispatch(getRewardRate({ eventCode, teamTitle: teamInfo.teamTitle }))
    .unwrap()
    .then(teamObject => setEventROI(teamObject.eventRate))
    .catch(teamsError => console.log(teamsError))
  }, [dispatch, eventCode, teamInfo.teamTitle])



  
  
  
  useEffect(() => {
    getTeamInfoFromSC()
  }, [getTeamInfoFromSC])
  








  return (
    <div className="sm:col-span-3 col-span-12 bg-white dark:bg-gray-800 shadow shadow-gray-500 dark:shadow-gray-900 flex flex-col">

      <section className="w-full relative flex-1">
        <div className="flex justify-between">
          <div className="p-2">
            <div className="font-medium">
              <label className="text-xs mr-1">Balance:</label>
              {props.portfolioItem.userStake}
            </div>

            <div className="font-medium">
              <label className="text-xs mr-1">Claimed:</label>
              {((eventROI - eventROI) === 0) ? (props.portfolioItem.userStake * eventROI).toFixed(2) : "0.00"}
            </div>
          </div>


          <div
            className="h-20 w-28 bg-gray-100 dark:bg-gray-700 bg-center bg-no-repeat sm:bg-contain bg-cover"
            style={{ backgroundImage: `url(${teamInfo.img})` }}
          >
          </div>
        </div>


        <h5 className="font-semibold text-sm py-1 px-2">
          {teamInfo.teamTitle}
        </h5>
      </section>

      {/* FOOTER */}
      <section className="bg-blue-900 text-white flex items-center justify-between p-2">
        <div className={`bg-red-200 text-red-700 text-sm font-bold px-1.5 w-fit`}>
          Sale has Ended
        </div>

        <a href={`/event/${eventInfo.id}`} className="text-sm font-medium">
          Go to event
        </a>
      </section>
    </div>
  )
}

export default TeamHistoryCard