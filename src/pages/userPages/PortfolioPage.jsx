import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";



import { addTeamToWatchlist, removeTeamFromWatchlist, sellPurchasedTeamToken } from '../../features/auth/userSlice';


import InvestedPortfolio from '../../components/userPagesComponents/InvestedPortfolio'
import WatchlistPortfolio from '../../components/userPagesComponents/WatchlistPortfolio'






const PortfolioPage = ({ user, setRefreshInfo }) => {

  const [activeTab, setActiveTab] = useState('invested'),
        userPortfolio = user?.userPortfolio,
        [disableButton, setDisableButton] = useState(false),
        dispatch = useDispatch(),
        navigate = useNavigate()
  



  useEffect(() => {
    if (!userPortfolio) {
      toast.error('You are logged out')
      navigate('/')
    }
  }, [userPortfolio, navigate])






  const addToWatchlist = (watchListData) => {
    setDisableButton(true)
    dispatch(addTeamToWatchlist(watchListData))
    .unwrap()
    .then(added => {
      setDisableButton(false)
      toast.success(`${watchListData.teamTitle} added to your watchlist`)
      setRefreshInfo(Date.now())
    })
    .catch(notAdded => {
      console.log(notAdded);
      toast.error(`Failed to add ${watchListData.teamTitle} to your watchlist`)
    })
  }


  const removeFromWatchlist = (watchListData) => {
    setDisableButton(true)
    dispatch(removeTeamFromWatchlist(watchListData))
    .unwrap()
    .then(added => {
      setDisableButton(false)
      toast.success(`${watchListData.teamTitle} removed from your watchlist`)
      setRefreshInfo(Date.now())
    })
    .catch(notAdded => {
      console.log(notAdded);
      toast.error(`Failed to remove ${watchListData.teamTitle} from your watchlist`)
    })
  }



  const sellPurchasedToken = (teamTitle, eventCode, userHolding, watchListIndex) => {
    const rewardsData = {teamTitle, eventCode, userHolding, watchListIndex}

    dispatch(sellPurchasedTeamToken(rewardsData))
    .unwrap()
    .then(eventObject => {
      console.log('withdrawal of reward token successful');
      // toast.success('withdrawal of reward token successful')
      setRefreshInfo(Date.now())
    })
    .catch(teamsError => console.log(teamsError))
  }




  return (
    <div className='px-3 py-8 space-y-8'>
      <section className="flex items-center justify-center divide-x-2 divide-gray-300">
        <div className={`w-full text-center shadow ${activeTab === 'invested' && 'bg-gradient-to-tl from-yellow-400 via-red-600 to-red-700 pb-0.5 font-semibold'}`}>
          <h4 className={`bg-white dark:bg-gray-700 p-1 cursor-pointer`} onClick={() => {
            setActiveTab('invested')
          }}>
            Invested
            <sup className="ml-1 px-1 rounded-sm text-xs text-white bg-red-600">
              {userPortfolio?.filter(portfolioItem => portfolioItem.claimed === false).length}
            </sup>
          </h4>
        </div>

        <div className={`w-full text-center shadow ${activeTab === 'watchlist' && 'bg-gradient-to-tl from-yellow-400 via-red-600 to-red-700 pb-0.5 font-semibold'}`}>
          <h4 className={`bg-white dark:bg-gray-700 p-1 cursor-pointer`} onClick={() => {
            setActiveTab('watchlist')
          }}>
            Watchlist
            <sup className="ml-1 px-1 rounded-sm text-xs text-white bg-red-600">
              {userPortfolio?.filter(portfolioItem => portfolioItem.watched === true).length}
            </sup>
          </h4>
        </div>
      </section>


      <section className="sm:px-8">
        <section className={`grid grid-cols-12 gap-6 ${activeTab !== 'invested' && 'hidden'}`}>
          {
            userPortfolio?.find(portfolioItem => portfolioItem.claimed === false) ?
              userPortfolio.map((portfolioItem, index) => (
                portfolioItem.claimed === false &&
                  <>
                    {/* INVESTED ITEMS */}
                    <InvestedPortfolio
                      key={index}
                      itemIndex={index}
                      activeTab={activeTab} 
                      addToWatchlist={addToWatchlist}
                      removeFromWatchlist={removeFromWatchlist}
                      portfolioItem={portfolioItem}
                      sellPurchasedToken={sellPurchasedToken}
                      setDisableButton={setDisableButton}
                      sisableButton={disableButton}
                    />
                  </>
              ))
            :
              <div className="col-span-12 text-center text-lg">
                {/* You have not invested in any team at the moment */}
                Ongoing event teams you bought will appear here
              </div>
          }
        </section>

        <section className={`grid grid-cols-12 gap-6 ${activeTab !== 'watchlist' && 'hidden'}`}>
          {
            userPortfolio?.find(portfolioItem => portfolioItem.watched === true) ?
              userPortfolio.map((portfolioItem, index) => (
                portfolioItem.watched === true &&
                  <>
                    {/* FAVORITED ITEMS */}
                    <WatchlistPortfolio
                      key={index}
                      itemIndex={index}
                      activeTab={activeTab} 
                      addToWatchlist={addToWatchlist}
                      removeFromWatchlist={removeFromWatchlist}
                      portfolioItem={portfolioItem}
                      setDisableButton={setDisableButton}
                      sisableButton={disableButton}
                    />
                  </>
              ))
            :
              <div className="col-span-12 text-center text-lg">
                You are not watching any team at the moment
              </div>
          }
        </section>
      </section>
    </div>
  )
}

export default PortfolioPage