import moment from "moment";




const FundingHistoryCard = (props) => {

  


  
  
  









  return (
    <div className="col-span-12 bg-white dark:bg-gray-800 shadow shadow-gray-500 dark:shadow-gray-900 flex flex-col">

      <section className="w-full relative flex-1">
        <h5 className="bg-black text-white text-sm w-fit px-4 py-1 m-2 rounded-full">
          {moment(props.fundItem.dateAndTime).format("DD MMM YYYY")}
        </h5>



        <div className="flex justify-between p-2">
          <div className="font-medium">
            <label className="text-sm mr-1 capitalize">{props.fundItem.fundType}</label>
            {props.fundItem.txAmount}
          </div>

          <div className="">
            <a href={`https://bscscan.com/tx/${props.fundItem.txHash}`} target="_blank" rel="noreferrer" className="text-sm">View details</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FundingHistoryCard