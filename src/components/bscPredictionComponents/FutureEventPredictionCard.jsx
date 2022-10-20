


const PredictionHomeCard = ({ event }) => {


  return (
  
    <figure className="sm:col-span-3 col-span-12 bg-gray-300 dark:bg-gray-800 shadow-md shadow-gray-500 dark:shadow-xl dark:shadow-gray-800 p-2 w-full rounded-md flex sm:block">
      <div className="w-24 sm:w-full">
        <div className="sm:h-40 h-24 w-24 sm:w-full rounded-md bg-gray-100" style={{
          backgroundImage: `url(${event.img})`, backgroundRepeat: "no-repeat",
          backgroundSize: "contain", backgroundPosition: "center"
        }}>
        </div>
        <p className="sm:py-2 font-bold text-center text-xs sm:text-sm">{event.eventTitle}</p>
      </div>

      <div className="px-2 flex flex-col w-full sm:block">
        <p className="py-1 sm:pb-3 font-semibold text-sm sm:text-center">DATES AND DETAILS</p>
        <div className="text-center text-xs font-medium">
          Coming soon
        </div>

        <div className="text-center text-sm my-4">
          <a href='/' className="btn-solid hover-gradient px-2 py-1.5 pointer-events-none">View Teams</a>
        </div>
      </div>
    </figure>

  )
}

export default PredictionHomeCard