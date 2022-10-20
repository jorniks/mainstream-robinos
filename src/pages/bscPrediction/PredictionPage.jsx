import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useDispatch } from "react-redux";
import PredictionPageCard from '../../components/bscPredictionComponents/PredictionPageCard';

import { getEventData, getEventROI, calculateTimeLeft } from '../../appCore/miscFunctions';
import { eventTeams } from '../../variables/eventTeams';
import Oops from '../../components/Oops';
import { pastAndOngoingEvents } from '../../variables/events';
import { getEventInfo } from '../../features/events/predictionEventSlice';








const PredictionPage = ({ user, setRefreshInfo }) => {
  const { eventID } = useParams(),
        [prizePool, setPrizePool] = useState(0),
        [tokenSaleStatus, setTokenSaleStatus] = useState(false),
        [timeLeft, setTimeLeft] = useState({
          days: '00', hours: '00',
          minutes: '00', seconds: '00',
        }),
        eventTeamsArray = eventTeams[`${getEventData(eventID, pastAndOngoingEvents, 'eventCode')}`],
        ROIInfo = getEventData(eventID, pastAndOngoingEvents, 'ROIInfo'),
        eventCode = getEventData(eventID, pastAndOngoingEvents, 'eventCode'),
        eventTitle = getEventData(eventID, pastAndOngoingEvents, 'eventTitle'),
        eventROIFigures = getEventROI(eventID, pastAndOngoingEvents),
        [eventBonusRate, setEventBonusRate] = useState({}),
        dispatch = useDispatch();



  useEffect(() => {
    var intervalArray = { 'timerID': 0 };

    dispatch(getEventInfo({eventCode: eventCode}))
    .unwrap()
    .then(eventObject => {
      setEventBonusRate(eventObject)
      setPrizePool(eventObject?.prizePool)
      setTokenSaleStatus(eventObject?.saleActive);

      intervalArray = {
        'timerID': setInterval(() => {
          setTimeLeft(calculateTimeLeft(eventObject?.saleEnd));
        }, 1000)
      }
    })
    .catch(teamsError => console.log(teamsError))



    return () => clearInterval(intervalArray['timerID']);
  }, [dispatch, eventCode]);




  return (
    <div className="relative py-6 px-1 sm:px-10">

      {(eventTeamsArray !== undefined) ?
          <>
            <p className="text-3xl sm:text-6xl font-black text-center mb-8">{eventTitle}</p>

            <section className="w-full px-2 sm:px-8">
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-4xl mx-auto text-center">
                <figure className="w-full bg-red-800 max-w-xs text-white py-2 rounded-md">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold">Prize Pool</h4>
                    <h6 className="text-sm font-medium">{prizePool.toFixed(3)}</h6>
                  </div>

                  <div className="space-x-3">
                    <small className="text-sm font-semibold">Event Discount</small>
                    <span className={''}>
                      {eventBonusRate?.discountPercentage}%
                    </span>
                  </div>
                </figure>

                <figure className="w-full bg-red-800 max-w-xs text-white py-2 rounded-md font-semibold flex justify-center items-center">
                  {
                    tokenSaleStatus === false ?
                      <div className="text-3xl">
                        Sale has ended
                      </div>
                    :
                      <figure className="w-full grid grid-cols-4 text-xs">
                        <div className="col-span-4 text-base">
                          Sale Ends In
                        </div>
                        <div className="col-span-1">
                          <h6 className="text-4xl"> {timeLeft.days} </h6>
                          Day{(timeLeft.days > 1) ? 's' : ''}
                        </div>
                        <div className="col-span-1">
                          <h6 className="text-4xl"> {timeLeft.hours} </h6>
                          Hour{(timeLeft.hours > 1) ? 's' : ''}
                        </div>
                        <div className="col-span-1">
                          <h6 className="text-4xl"> {timeLeft.minutes} </h6>
                          Min{(timeLeft.minutes > 1) ? 's' : ''}
                        </div>
                        <div className="col-span-1">
                          <h6 className="text-4xl"> {timeLeft.seconds} </h6>
                          Sec
                        </div>
                      </figure>
                  }
                </figure>
              </div>

              <div className="max-w-lg mt-4 mx-auto">
                <details className='outline-none'>
                  <summary className='cursor-pointer font-bold'>ROI Info</summary>
                  <div className='space-y-3 px-4 font-medium' dangerouslySetInnerHTML={{ __html: ROIInfo }} />
                </details>
              </div>

              <div className="max-w-sm mt-4 mx-auto">
                <input type="text" className="outline-none rounded p-3 text-sm text-gray-800 w-full border border-gray-700" placeholder="search term...." />
              </div>
            </section>


            <section className="grid grid-cols-12 gap-y-8 sm:gap-x-10 py-12 px-2 sm:px-4">
              {eventTeamsArray.map((team, index) => (
                <PredictionPageCard
                  key={index}
                  user={user}
                  setRefreshInfo={setRefreshInfo}
                  team={team}
                  prizePool={prizePool}
                  setPrizePool={setPrizePool}
                  eventData={{ eventROIFigures, eventCode, isSaleOn: tokenSaleStatus, eventBonusRate }}
                />
              ))}
            </section>
          </>
        :
          <Oops errorMessage={'Oopses! The event you seek is not ready'} />
      }

    </div>
  )
}

export default PredictionPage