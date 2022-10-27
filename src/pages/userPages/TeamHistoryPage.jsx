import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

import TeamHistoryCard from "../../components/TeamHistoryCard"





const TeamHistoryPage = ({ user }) => {
  
  const userPortfolio = user?.userPortfolio,
        navigate = useNavigate()




  useEffect(() => {
    if (!userPortfolio) {
      toast.error('You are logged out')
      navigate('/')
    }
  }, [userPortfolio, navigate])




  return (
    <div className="sm:p-8 px-3">
      <div className="my-4 text-sm font-bold text-gray-500 dark:text-gray-400">
        Event History Page
      </div>

      <section className={`grid grid-cols-12 gap-6`}>
        {
          userPortfolio?.find(portfolioItem => portfolioItem.claimed === true) ?
            userPortfolio.map((portfolioItem, index) => (
              portfolioItem.claimed === true &&
                <>
                  {/* INVESTED ITEMS */}
                  <TeamHistoryCard
                    key={index}
                    itemIndex={index}
                    portfolioItem={portfolioItem}
                  />
                </>
            ))
          :
            <div className="col-span-12 text-center text-lg">
              Your portfolio history will appear here
            </div>
        }
      </section>
    </div>
  )
}

export default TeamHistoryPage