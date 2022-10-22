import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { useDispatch } from "react-redux";
import { addTeamToWatchlist, purchaseTeamToken, removeTeamFromWatchlist } from '../../features/auth/userSlice';
import { getTeamInfo } from '../../features/events/predictionEventSlice';




const PredictionPageCard = ({ user, setRefreshInfo, team, eventData, prizePool, setPrizePool }) => {


  const { eventCode, isSaleOn, eventBonusRate, eventROIFigures } = eventData,
        [totalSupply, setTotalSupply] = useState(0),
        [eventROI, setEventROI] = useState({ 'maxROI': 0, 'minROI': 0 }),
        [showROIWarning, setShowROIWarning] = useState(false),
        [confirmBuyToken, setConfirmBuyToken] = useState(false),
        [userBalance, setUserBalance] = useState(0),
        [isWatching, setIsWatching] = useState(false),
        [disableButton, setDisableButton] = useState(false),
        [tokenBuyAmount, setTokenBuyAmout] = useState(''),
        [tokenErrorAlert, setTokenErrorAlert] = useState(''),
        userPortfolio = !user ? null : user.userPortfolio,
        dispatch = useDispatch()








  const checkIfTeamIsInWatchlist = useCallback(() => {
    if (userPortfolio?.length) {
      const foundInPorfolio = userPortfolio.find(portfolioItem => portfolioItem.teamAddress === team.tokenAddress)

      

      if (foundInPorfolio?.userStake !== undefined) {
        setUserBalance(foundInPorfolio?.userStake)
        setIsWatching(foundInPorfolio?.watched)
      } else {
        setUserBalance(0)
        setIsWatching(false)
      }
      return
    }

    setIsWatching(false);
    return
  }, [team.tokenAddress, userPortfolio])


  const getTeamInfoFromSC = useCallback(() => {
    dispatch(getTeamInfo({ eventCode, teamName: team.teamTitle }))
    .unwrap()
    .then(teamObject => {
      setTotalSupply(teamObject.totalSupply)
      setEventROI({
        'maxROI': (eventROIFigures.maxROI * parseFloat(prizePool)) / teamObject.totalSupply,
        'minROI': (eventROIFigures.minROI * parseFloat(prizePool)) / teamObject.totalSupply
      })
    })
    .catch(teamsError => console.log(teamsError))
  }, [dispatch, eventCode, eventROIFigures.minROI, eventROIFigures.maxROI, team.teamTitle, prizePool])








  useEffect(() => {
    checkIfTeamIsInWatchlist()
    getTeamInfoFromSC()
  }, [checkIfTeamIsInWatchlist, getTeamInfoFromSC]);








  const addToWatchlist = () => {
    const watchListIndex = userPortfolio.findIndex(portfolioItem => portfolioItem.teamAddress === team.tokenAddress),
      watchListData = {teamAddress: team.tokenAddress, eventCode, watchListIndex}

    setDisableButton(true)
    dispatch(addTeamToWatchlist(watchListData))
      .unwrap()
      .then(added => {
        setDisableButton(false)
        setRefreshInfo(Date.now())
        toast.success(`${team.teamTitle} added to your watchlist`)
      })
      .catch(notAdded => {
        console.log(notAdded);
        toast.error(`Failed to add ${team.teamTitle} to your watchlist`)
      })
  }


  const removeFromWatchlist = () => {
    const watchListIndex = userPortfolio.findIndex(portfolioItem => portfolioItem.teamAddress === team.tokenAddress)


    setDisableButton(true)
    dispatch(removeTeamFromWatchlist({ watchListIndex }))
      .unwrap()
      .then(added => {
        setDisableButton(false)
        setRefreshInfo(Date.now())
        toast.success(`${team.teamTitle} removed from your watchlist`)
      })
      .catch(notAdded => {
        console.log(notAdded);
        toast.error(`Failed to remove ${team.teamTitle} from your watchlist`)
      })
  }








  const betOnTeam = () => {
    const watchListIndex = userPortfolio.findIndex(portfolioItem => portfolioItem.teamAddress === team.tokenAddress),
          purchaseInfo = {teamTitle: team.teamTitle, teamAddress: team.tokenAddress, tokenBuyAmount, eventCode, watchListIndex}
    
    setDisableButton(true)
    dispatch(purchaseTeamToken(purchaseInfo))
    .unwrap()
    .then(added => {
      setTokenBuyAmout('')
      setPrizePool(+prizePool + +tokenBuyAmount)
      setDisableButton(false)
      setRefreshInfo(Date.now())
      toast.success(`Successfully bought ${team.teamTitle} and added to your watchlist`)
    })
    .catch(notAdded => {
      setDisableButton(false)
      console.log(notAdded);
      toast.error(`Failed to buy ${team.teamTitle}!!! Try again`)
    })
  }








  return (

    <figure className="sm:col-span-4 col-span-12 bg-gray-300 dark:bg-gray-800 shadow-md shadow-gray-500 dark:shadow-xl dark:shadow-gray-800 w-full rounded-md">
      <div className="bg-gray-200 dark:bg-gray-900 px-4 pt-4 pb-6 rounded-t-md">
        <section className="grid grid-cols-2">
          <div className="col-span-1 grid gap-y-6 text-xs">
            <div className="">
              <p className="font-semibold">Your Balance</p>
              {`${userBalance} ${team.teamTitle}`}
            </div>
          
            <div className="">
              <p className="font-semibold">Total Supply</p>
              {`${totalSupply} ${team.teamTitle}`}
            </div>

            <div className="">
              <p className="font-semibold">Current Price</p>
              {(1 / eventBonusRate?.discountRate) - (1 / eventBonusRate?.discountRate) === 0 ? eventBonusRate?.discountRate : 1 } USDC
            </div>
          </div>

          <div className="col-span-1 w-full relative">
            <div className="flex items-center justify-end">
              <label
                className={`group text-xl cursor-pointer flex justify-center items-center h-7 w-7 ${disableButton && 'bg-opacity-40 pointer-events-none'}`}
                title={isWatching === true ? "Remove team from watchlist" : "Add team to watchlist"}
                onClick={() => isWatching === true ? removeFromWatchlist() : addToWatchlist()}
              >
                <i className={isWatching === true ? `far fa-star hidden group-hover:block` : `far fa-star group-hover:hidden`}></i>
                <i className={isWatching === true ? `fas fa-star group-hover:hidden text-yellow-500 dark:text-yellow-400` : `fas fa-star hidden group-hover:block text-yellow-400`}></i>
              </label>
            </div>

            <div className="h-32 w-36 bg-gray-300 rounded-md absolute -bottom-12 -right-2" style={{
              backgroundImage: `url(${team.img})`, backgroundRepeat: "no-repeat",
              backgroundSize: "contain", backgroundPosition: "center"
            }}>
            </div>
          </div>
        </section>
      </div>

      <section className="px-4 pt-2 pb-3.5 relative">
        <p className="my-4 font-bold text-xl">{team.teamTitle}</p>

        <section className="flex justify-between items-center text-xs font-bold my-2">
          <div className="text-red-700 dark:text-red-600">
            Min Return: {((eventROI['minROI'] - eventROI['minROI']) === 0) ? (eventROI['minROI']).toFixed(2) : "0.00"}
          </div>

          <div className="text-lime-700 dark:text-lime-500">
            Max Return: {((eventROI['maxROI'] - eventROI['maxROI']) === 0) ? (eventROI['maxROI']).toFixed(2) : "0.00"}
          </div>
        </section>

        <section className="font-medium relative">
          <p className="text-center text-sm font-bold my-4">PURCHASE TOKEN</p>
          <form className="bg-white flex justify-between items-center py-1 pr-1 rounded" autoComplete='off'>
            <input type="number" name='buyAmount' className="outline-none rounded p-2 text-sm text-black w-2/3" value={tokenBuyAmount} onChange={(e) => {
              if(e.target.value > -1 || e.target.value === "") {
                setTokenBuyAmout(e.target.value)
              }
            }} min={0} placeholder="Amount" />

            <button
              className={`btn-solid hover-gradient py-2 w-1/3 ${(isSaleOn === false ||  disableButton === true) && 'bg-opacity-50 pointer-events-none'}`}
              onClick={(e) => {
              e.preventDefault();
              if (!user){
                toast.error("You are not logged in. Please log in and try again.")
                return
              } else if (tokenBuyAmount < 1) {
                setTokenErrorAlert('You need to enter token amount you wish to buy')
                setTimeout(() => { setTokenErrorAlert('') }, 2000);
                return
              } else if (user.balance < tokenBuyAmount) {
                toast.error('Insufficient balance')
                return
              } else if (totalSupply > 0 && (isNaN(eventROI['maxROI'].toFixed(2)) || eventROI['maxROI'].toFixed(2) <= 1.2)) {
                setShowROIWarning(true)
                return
              }
              
              setConfirmBuyToken(true)
            }}> Buy </button>
          </form>


          <div className={`shadow-3xl rounded-sm bg-white dark:bg-gray-600 text-xs text-gray-800 dark:text-white p-2 w-full absolute bottom-3 transition-all ease-in-out duration-700 ${confirmBuyToken === false ? 'scale-0' : 'scale-100'}`}>
            <section className="mb-3.5 space-y-3">
              <div className="grid grid-cols-4 gap-2 px-2 sm:px-8">
                <div className="col-span-2">
                  Buy Amount
                  <h6 className="font-semibold">{tokenBuyAmount}</h6>
                </div>
                
                <div className="col-span-2">
                  Spend Amount
                  <h6 className="font-semibold">{((tokenBuyAmount * eventBonusRate?.discountRate).toFixed(2)).toString()}</h6>
                </div>

                <div className="col-span-2">
                  Token Name
                  <h6 className="font-semibold">{team.teamTitle}</h6>
                </div>
              </div>

              {/* <h6 className="">Please confirm if you want to proceed</h6> */}
            </section>

            <section className="flex justify-between">
              <button className="btn-outline hover-solid text-xs p-2" onClick={() => {
                setConfirmBuyToken(false)
              }}>
                Cancel buy order
              </button>

              <button
                className={`btn-solid hover-gradient text-xs p-2 ${disableButton && 'bg-opacity-50 pointer-events-none'}`}
                onClick={() => {
                  setConfirmBuyToken(false)
                  betOnTeam()
              }}>
                Proceed to buy
              </button>
            </section>
          </div>


          <div className={`shadow-3xl rounded-sm bg-white dark:bg-gray-600 text-xs text-gray-800 dark:text-white p-2 absolute bottom-4 transition-all ease-in-out duration-700 ${showROIWarning === false ? '-z-10 opacity-0 -translate-y-full' : 'z-10 translate-y-0'}`}>
            <p className="mb-1.5">
              Further purchase is not allowed as even if this team/player wins the event, the ROI might result in a loss for you. Please consider other options, and check out the ROI info to know about the various prizes we're paying out for this event!
            </p>
            <div className="flex justify-between">
              <button
                className={`btn-outline hover-solid text-xs p-2 ${disableButton && 'bg-opacity-50 pointer-events-none'}`}
                onClick={() => {
                  setShowROIWarning(false)
                  betOnTeam()
              }}>Buy Anyway</button>

              <button className="btn-solid hover-gradient text-xs p-2" onClick={() => {
                setShowROIWarning(false)
              }}>
                {/* Nah, I don't want to lose money */}
                Nah, Cancel
              </button>
            </div>
          </div>


          <p className="h-2 text-red-600 dark:text-red-400 text-xxs sm:text-xs mt-1">
            {tokenErrorAlert}
          </p>
        </section>
        
      </section>
    </figure>

  )
}

export default PredictionPageCard
