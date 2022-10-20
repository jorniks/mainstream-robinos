import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import moment from 'moment';

import { getEventInfo } from "../../features/events/predictionEventSlice";



const PredictionHomeCard = ({ event, timing }) => {


  const [eventTime, setEventTime] = useState({
          saleStart: 0,
          saleEnd: 0,
          saleActive: false
        }),
        dispatch = useDispatch();



  useEffect(() => {
    dispatch(getEventInfo({eventCode: event.eventCode}))
    .unwrap()
    .then(eventObject => {
      setEventTime(eventObject)
    })
    .catch(teamsError => console.log(teamsError))
  }, [dispatch, event]);




  return (
    timing === 'ongoing' ?
      <figure className={`sm:col-span-3 col-span-12 bg-gray-300 dark:bg-gray-800 shadow-md shadow-gray-500 dark:shadow-xl dark:shadow-gray-800 p-2 w-full rounded-md ${eventTime?.saleActive === true ? 'flex sm:block' : 'hidden'}`}>
        <div className="w-28 sm:w-full">
          <div
            className="sm:h-40 h-24 w-28 sm:w-full rounded bg-gray-100 bg-center bg-no-repeat sm:bg-contain bg-cover"
            style={{ backgroundImage: `url(${event.img})` }}
          >
          </div>
        </div>

        <div className="px-2 flex flex-col w-full sm:block">
          <h5 className="sm:py-2 font-bold sm:text-center text-sm">{event.eventTitle}</h5>
          <div className="flex-1 flex justify-between items-end text-xs">
            <div className="text-justify">
              <p className="font-semibold">Start Date</p>
              {moment(eventTime?.saleStart * 1000).format("DD MMM YYYY")}
            </div>
            <div className="text-justify">
              <p className="font-semibold">End Date</p>
              {moment(eventTime?.saleEnd * 1000).format("DD MMM YYYY")}
            </div>
          </div>

          <div className="text-center text-sm my-2">
            <a href={`event/${event.id}`} className="btn-solid hover-gradient px-2 py-1.5">View Teams</a>
          </div>
        </div>
      </figure>
    :
      <figure className={`sm:col-span-3 col-span-12 bg-gray-300 dark:bg-gray-800 shadow-md shadow-gray-500 dark:shadow-xl dark:shadow-gray-800 p-2 w-full rounded-md ${eventTime?.saleActive !== true ? 'flex sm:block' : 'hidden'}`}>
        <div className="w-28 sm:w-full">
          <div
            className="sm:h-40 h-24 w-28 sm:w-full rounded bg-gray-100 bg-center bg-no-repeat sm:bg-contain bg-cover"
            style={{ backgroundImage: `url(${event.img})` }}
          >
          </div>
        </div>

        <div className="px-2 flex flex-col w-full sm:block">
          <h5 className="sm:py-2 font-bold sm:text-center text-sm">{event.eventTitle}</h5>
          <div className="flex-1 flex justify-between items-end text-xs">
            <div className="text-justify">
              <p className="font-semibold">Start Date</p>
              {moment(eventTime?.saleStart * 1000).format("DD MMM YYYY")}
            </div>
            <div className="text-justify">
              <p className="font-semibold">End Date</p>
              {moment(eventTime?.saleEnd * 1000).format("DD MMM YYYY")}
            </div>
          </div>

          <div className="text-center text-sm my-2">
            <a href={`event/${event.id}`} className="btn-solid hover-gradient px-2 py-1.5">View Teams</a>
          </div>
        </div>
      </figure>
  )
}

export default PredictionHomeCard