import { useState } from 'react';
import PredictionHomeCard from '../../components/bscPredictionComponents/PredictionHomeCard';
import FutureEventPredictionCard from '../../components/bscPredictionComponents/FutureEventPredictionCard';
import FilterComponent from '../../components/Filter';




const PredictionHome = () => {


  const [eventSales, setEventSales] = useState({
          ongoingAndPastSales: [],
          futureEventSales: [],
        }),
        [showEventTab, setShowEventTab] = useState('ongoing')








  return (
    <div className="relative">



      <section className="transition-all duration-200 ease-in-out pb-6 sm:pt-6 px-1 sm:px-10 min-h-screen" id='events'>
        <h2 className='text-4xl text-center font-black'>EVENTS</h2>
        
        <section className="grid grid-cols-2 gap-3 font-medium text-sm text-center my-4">
          <div className="col-span-2 sm:col-span-1 flex items-center sm:space-x-8">
            <h5 className={`cursor-pointer ${(showEventTab === 'ongoing') ? 'text-green-700 font-bold dark:text-green-500 underline' : ''}`} onClick={ () => {
              setShowEventTab('ongoing')
            }}>
              Ongoing Events
              {/* <sup className="text-white bg-red-700 text-xxs px-0.5 rounded-sm ml-1">{eventSales['ongoingAndPastSales'].length}</sup> */}
            </h5>
            <h5 className={`cursor-pointer ${(showEventTab === 'future') ? 'text-green-700 font-bold dark:text-green-500 underline' : ''}`} onClick={ () => {
              setShowEventTab('future')
            }}>
              Future Events
              {/* <sup className="text-white bg-red-700 text-xxs px-0.5 rounded-sm ml-1">{eventSales['futureEventSales'].length}</sup> */}
            </h5>
            <h5 className={`cursor-pointer ${(showEventTab === 'past') ? 'text-green-700 font-bold dark:text-green-500 underline' : ''}`} onClick={ () => {
              setShowEventTab('past')
            }}>
              Past Events
              {/* <sup className="text-white bg-red-700 text-xxs px-0.5 rounded-sm ml-1">{eventSales['pastEventSales'].length}</sup> */}
            </h5>
          </div>

          <FilterComponent
            setEventSales={setEventSales}
            filterPlace='predictionHome'
          />
        </section>

        <div className={`${(showEventTab === 'ongoing') ? '' : 'hidden'}`}>
          {(eventSales['ongoingAndPastSales'].length > 0) ?
            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-10">
              {eventSales['ongoingAndPastSales'].map((event, index) => (
                <PredictionHomeCard
                  key={index}
                  event={event}
                  timing={'ongoing'}
                />
              ))}
            </div>
            :
            <p className="text-lg italic font-medium">No event here match your filter criteria</p>
          }
        </div>


        <div className={`${(showEventTab === 'future') ? '' : 'hidden'}`}>
          {(eventSales['futureEventSales'].length > 0) ?
            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-10">
              {eventSales['futureEventSales'].map((event, index) => (
                <FutureEventPredictionCard key={index} event={event} />
              ))}
            </div>
            :
            <p className="text-lg italic font-medium">No event here match your filter criteria</p>
          }
        </div>


        <div className={`${(showEventTab === 'past') ? '' : 'hidden'}`}>
          {(eventSales['ongoingAndPastSales'].length > 0) ?
            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-10">
              {eventSales['ongoingAndPastSales'].map((event, index) => (
                <PredictionHomeCard
                  key={index}
                  event={event}
                  timing={'past'}
                />
              ))}
            </div>
            :
            <p className="text-lg italic font-medium">No event here match your filter criteria</p>
          }
        </div>
        
      </section>
    </div>
  )
}

export default PredictionHome