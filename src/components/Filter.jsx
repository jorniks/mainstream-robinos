import { useState, useEffect, useCallback } from 'react';
import { futureEvents, pastAndOngoingEvents } from "../variables/events";


const sportsEvents = [
  {
    name: 'Basketball',
    key: 'basketball',
  },
  {
    name: 'Football',
    key: 'football',
  },
  {
    name: 'American Football',
    key: 'american_football',
  },
  {
    name: 'Motor Sport',
    key: 'motor_sport',
  },
  {
    name: 'Cricket',
    key: 'cricket',
  },
  {
    name: 'Tennis',
    key: 'tennis',
  },
  {
    name: 'eSports',
    key: 'esports',
  },
  {
    name: 'Rugby',
    key: 'rugby',
  },
  {
    name: 'Baseball',
    key: 'baseball',
  },
]



const FilterComponent = ({ setEventSales, filterPlace }) => {
  
  const [searchValue, setSearchValue] = useState(null),
        [sport, setSport] = useState(''),
        [filterOptionToOpen, setFilterOptionToOpen] = useState('')


  const searchBoxFilter = useCallback(
    () => {
      if (filterPlace === 'predictionHome') {
        if (searchValue !== null) {
          let filteredEvent = pastAndOngoingEvents.filter((saleEvent) =>
                saleEvent.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
              ),
              fEvents = futureEvents.filter((saleEvent) =>
                saleEvent.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
              );

          setEventSales({
            ongoingAndPastSales: filteredEvent,
            futureEventSales: fEvents,
          });
          return;
        }

        setEventSales({
          ongoingAndPastSales: pastAndOngoingEvents,
          futureEventSales: futureEvents,
        })
      }
    },
    [searchValue, setEventSales, filterPlace],
  )
  



  const sportsFilterOptions = (filterOption) => {
    if (filterPlace === 'predictionHome') {
      if (filterOption !== null) {
        let filteredEvent = pastAndOngoingEvents.filter((saleEvent) =>
              saleEvent.sports.toLowerCase().includes(filterOption.toLowerCase())
            ),
            fEvents = futureEvents.filter((saleEvent) =>
              saleEvent.sports.toLowerCase().includes(filterOption.toLowerCase())
            );


        setEventSales({
          ongoingAndPastSales: filteredEvent,
          futureEventSales: fEvents,
        });
        return;
      }

      setEventSales({
        ongoingAndPastSales: pastAndOngoingEvents,
        futureEventSales: futureEvents,
      });
    }
  }



  useEffect(() => {
    searchBoxFilter()
  }, [searchBoxFilter])
  





  return (
    <>

      <div className="col-span-2 sm:col-span-1 flex space-x-2 sm:justify-end">
        <h5 className={`px-3 py-1.5 hover:bg-gradient-to-br from-yellow-400 via-red-600 to-red-700 hover:text-white rounded-sm cursor-pointer border border-gray-400 hover:border-white dark:hover:border-gray-700`} onClick={() => {
          filterOptionToOpen !== 'filter' ? setFilterOptionToOpen('filter') : setFilterOptionToOpen('')
        }}>
          <i className="fas fa-filter text-xs mr-1"></i>
          Filter
        </h5>
        <h5 className={`px-3 py-1.5 hover:bg-gradient-to-br from-yellow-400 via-red-600 to-red-700 hover:text-white rounded-sm cursor-pointer border border-gray-400 hover:border-white dark:hover:border-gray-700`} onClick={() => {
          filterOptionToOpen !== 'search' ? setFilterOptionToOpen('search') : setFilterOptionToOpen('')
        }}>
          <i className="fas fa-search text-xs mr-1"></i>
          Search
        </h5>
      </div>

      <section className={`col-span-2 text-justify bg-gray-200 dark:bg-gray-800`}>
        <div className={`transition-all duration-300 ease-in-out overflow-auto text-xs ${filterOptionToOpen === 'filter' ? 'h-64 sm:h-24 px-3.5 py-2' : 'h-0'}`}>
          <div className="flex justify-end items-center mb-4">
            {/* <h2 className="text-xl font-black underline">Sports</h2> */}
            <small className="text-sm underline cursor-pointer" onClick={() => { sportsFilterOptions(null); setSport(null) }}>clear filter</small>
          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-4">
            {sportsEvents.map((sports, index) => (
              <span key={index} className={`cursor-pointer p-2 border border-gray-400 dark:border-gray-300 rounded ${(sport === sports.key) ? 'text-green-700 font-bold dark:text-green-500' : ''}`} onClick={() => { sportsFilterOptions(sports.key); setSport(sports.key) }}>
                {sports.name}
              </span>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-300 ease-in-out flex items-center overflow-auto ${filterOptionToOpen === 'search' ? 'h-24 px-3.5 py-2' : 'h-0'}`}>
          <input type="text" className="outline-none rounded py-3 px-3 text-sm w-full text-gray-900 border border-gray-400" placeholder="search for an event" onChange={(event) => {
            setSearchValue(event.target.value);
            searchBoxFilter()
          }} />
        </div>
      </section>
    </>
  )
}

export default FilterComponent