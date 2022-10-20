import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { fundUserWallet } from "../features/auth/userSlice";






const FundingModal = ({setRefreshInfo, showFundingForm, setShowFundingForm, assignedWallet, setAssignedWallet, hasAssignedWallet, setHasAssignedWallet}) => {


  const [copyMessageObject, setCopyMessageObject] = useState({class: '', message: ''}),
        dispatch = useDispatch(),
        qrImage = `http://api.qrserver.com/v1/create-qr-code/?data=${assignedWallet}&size=150x150&margin=6`

  
  




  const proceedWithPayment = useCallback(() => {
    dispatch(fundUserWallet({walletAddress: assignedWallet}))
    .unwrap()
    .then((walletFundingResult) => {
      toast.success('Deposit confirmed. Your balance has been updated!!!')
      setAssignedWallet('')
      setShowFundingForm(false)
      setHasAssignedWallet(false)
      setRefreshInfo(Date.now())
    })
    .catch((rejectedValueOrSerializedError) => {
      toast.error(rejectedValueOrSerializedError, {toastId: 'notFunded'})
    })
  }, [assignedWallet, dispatch, setAssignedWallet, setShowFundingForm, setHasAssignedWallet, setRefreshInfo])






  useEffect(() => {
    let checkForDepositTimer = null;

    if (assignedWallet !== '') {
      checkForDepositTimer = setInterval(() => {
        proceedWithPayment()
      }, 1000 * 30);
      // }, 1000 * 60 * 2);
    }
    
    return () => clearInterval(checkForDepositTimer)
  }, [assignedWallet, proceedWithPayment])
  








  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(assignedWallet);
      setTimeout(() => { setCopyMessageObject({class: '', message: ''}) }, 2000);
      setCopyMessageObject({class: 'bg-lime-600', message: 'Copied!'});
    } catch (err) {
      setCopyMessageObject({class: 'bg-red-600', message: 'Failed to copy!'});
    }
  }

  


  return (
    <>
      <div
        className={`fixed right-0 top-20 bg-gray-800 dark:bg-gray-50 text-gray-50 dark:text-gray-800 cursor-pointer py-1 px-2 rounded-l z-30 ${!hasAssignedWallet && 'hidden'}`}
        onClick={() => setShowFundingForm(!showFundingForm)}
      >
        <i className="fas fa-wallet text-lg"></i>
      </div>
    
      <div className={`${showFundingForm === false && 'scale-0'} fixed top-0 left-0 bg-black bg-opacity-20 h-screen w-screen z-40 flex items-center justify-center transition-all duration-500 p-2.5`}>
        <div className="bg-gray-50 dark:bg-gray-800 w-full max-w-lg h-fit pb-4 sm:pb-8 transition-all duration-700 relative shadow-xl">
          <section className="absolute right-0 py-2 px-4 cursor-pointer" onClick={() => {
            setShowFundingForm(false)
          }}>
            {/* <i className="fas fa-minus text-2xl"></i> */}
            <h6 className="text-xxs">minimize</h6>
          </section>

          <section className="space-y-2 divide-y pt-4 sm:pt-8 px-6">
            <section className="font-medium text-center relative">
              <img src={qrImage} alt="" className="mb-2 mx-auto" />
              
              <span className={`text-white text-xs font-medium px-1 ml-2 rounded-sm absolute bottom-0 right-2 ${copyMessageObject.class}`}>{copyMessageObject.message}</span>
              
              <span title='Click to copy Address' className="break-all cursor-pointer sm:text-base underline underline-offset-4 decoration-dotted decoration-1" onClick={copyToClipBoard}>
                {assignedWallet}
              </span>
              <h6 className="text-xxs font-normal">Click on address to copy</h6>
            </section>
            
            <div className="py-2 text-xs sm:text-sm">
              Only BEP-20 USDT/USDC will be accepted at this point. Please do not deposit any other tokens from other chains. Thank you!
            </div>
            
            <div className="py-2 text-xs">
              You can minimize this pane and continue browsing the site. Your deposit will be credited to your account when it is confirmed nd you will be notified.
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default FundingModal