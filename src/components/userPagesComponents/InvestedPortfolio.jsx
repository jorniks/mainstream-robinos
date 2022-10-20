import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateTimeLeft } from "../../appCore/miscFunctions";
import { getEventInfo } from "../../features/events/predictionEventSlice";
import { pastAndOngoingEvents } from "../../variables/events"
import { eventTeams } from "../../variables/eventTeams"




const InvestedPortfolio = (props) => {

    const [tokenSaleStatus, setTokenSaleStatus] = useState(true),
          [timeLeft, setTimeLeft] = useState({
            days: '00', hours: '00',
            minutes: '00', seconds: '00',
          }),
          eventInfo = pastAndOngoingEvents.find(currentEvent => currentEvent?.eventCode === props.portfolioItem?.eventCode),
          teamInfo = eventTeams[props.portfolioItem.eventCode].find(teams => teams.tokenAddress === props.portfolioItem.teamAddress),
          isWatching = props.portfolioItem.watched,
          removeWatchListData = {
            teamTitle: teamInfo.teamTitle,
            watchListIndex: props.itemIndex
          },
          addWatchListData = {
            teamTitle: teamInfo.teamTitle,
            teamAddress: props.portfolioItem.teamAddress,
            eventCode: props.portfolioItem.eventCode,
            watchListIndex: props.itemIndex
          },
          dispatch = useDispatch();
  


  
  

  useEffect(() => {
    
    var intervalArray = { 'timerID': 0 };

    dispatch(getEventInfo({eventCode: props.portfolioItem.eventCode}))
    .unwrap()
    .then(eventObject => {
      setTokenSaleStatus(eventObject.saleActive);
      intervalArray = {
        'timerID': setInterval(() => {
          setTimeLeft(calculateTimeLeft(eventObject.saleEnd));
        }, 1000)
      }

      if (eventObject.saleActive === false && props.portfolioItem.claimed === false) {
        props.sellPurchasedToken(teamInfo.teamTitle, props.portfolioItem.eventCode, props.portfolioItem.userStake, props.itemIndex)
      }
    })
    .catch(teamsError => console.log(teamsError))


    return () => clearInterval(intervalArray['timerID']);
  }, [dispatch, props.portfolioItem.eventCode, teamInfo.teamTitle, props])
  









  return (
    <div className="sm:col-span-3 col-span-12 bg-white dark:bg-gray-800 shadow shadow-gray-500 dark:shadow-gray-900 flex flex-col">

      <section className="w-full relative flex-1">
        <div className="flex justify-between">
          <div className="p-2">
            <div className="font-medium">
              <label className="text-xs mr-1">Balance:</label>
              {props.portfolioItem.userStake}
            </div>

            <a href={`/event/${eventInfo.id}`} className="text-sm font-medium text-red-700 dark:text-red-500">
              Go to event
            </a>
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
        {
          tokenSaleStatus === false ?
            <div className={`bg-red-200 text-red-700 text-sm font-bold px-1.5 w-fit`}>
              Sale has Ended
            </div>
          :
            <figure className="grid grid-cols-4 gap-x-1 text-xxs text-center">
              <div className="col-span-1">
                <span className="text-xs font-medium"> {timeLeft.days} </span> d
              </div>
              <div className="col-span-1">
                <span className="text-xs font-medium"> {timeLeft.hours} </span> h
              </div>
              <div className="col-span-1">
                <span className="text-xs font-medium"> {timeLeft.minutes} </span> m
              </div>
              <div className="col-span-1">
                <span className="text-xs font-medium"> {timeLeft.seconds} </span> s
              </div>
            </figure>
        }

        
        <label
          className={`group text-xl cursor-pointer flex justify-center items-center ${props.disableButton && 'bg-opacity-40 pointer-events-none'}`}
          title={isWatching === true ? `Remove from watchlist` : `Add to watchlist`}

          onClick={() => {
            isWatching === true ?
              props.removeFromWatchlist(removeWatchListData)
            :
              props.addToWatchlist(addWatchListData)
          }}
        >
          <i className={isWatching === true ? `far fa-star hidden group-hover:block` : `far fa-star group-hover:hidden`}></i>
          <i className={isWatching === true ? `fas fa-star group-hover:hidden text-amber-400 dark:text-amber-300` : `fas fa-star hidden group-hover:block text-amber-400 dark:text-amber-300`}></i>
        </label>
      </section>
    </div>
  )
}

export default InvestedPortfolio