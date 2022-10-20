import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

import FundingHistoryCard from "../../components/FundingHistoryCard"





const FundingHistoryPage = ({ user }) => {
  
  const fundHistory = user?.fundHistory,
        navigate = useNavigate()




  useEffect(() => {
    if (!fundHistory) {
      toast.error('You are logged out')
      navigate('/')
    }
  }, [fundHistory, navigate])




  return (
    <div className="w-full max-w-6xl mx-auto sm:p-8 px-3">
      <div className="my-4 text-sm font-bold text-gray-500 dark:text-gray-400">
        Transactions History Page
      </div>
      
      <div className="w-full max-w-3xl mx-auto">
        <section className={`grid grid-cols-12 gap-1`}>
          {
            fundHistory?.length ?
              fundHistory.map((fundItem, index) => (
                <>
                  {/* INVESTED ITEMS */}
                  <FundingHistoryCard
                    key={index}
                    itemIndex={index}
                    fundItem={fundItem}
                  />
                </>
              ))
            :
              <div className="col-span-12 text-center text-lg">
                You have not made any fund related transaction
              </div>
          }
        </section>
      </div>
    </div>
  )
}

export default FundingHistoryPage