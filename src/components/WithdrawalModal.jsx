import { useState } from "react";
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { processWithdrawalRequest } from "../features/auth/userSlice";






const WithdrawalModal = ({showWithdrawalForm, setShowWithdrawalForm, setRefreshInfo, userBalance}) => {


  const [withdrawAmount, setWithdrawAmount] = useState(''),
        [withdrawalAddress, setWithdrawalAddress] = useState(''),
        [userPass, setUserPass] = useState(''),
        [userConfirmed, setUserConfirmed] = useState(false),
        [showPasswordModal, setShowPasswordModal] = useState(false),
        [disableButton, setDisableButton] = useState(false),
        dispatch = useDispatch(),
        userBalanceInFigures = +(userBalance.split(' ')[0].replace(',', ''))





  




  const withdrawFunds = () => {
    setDisableButton(true)

    dispatch(processWithdrawalRequest({withdrawAmount, userPass, withdrawalAddress}))
    .unwrap()
    .then((withdrawFundsResult) => {
      console.log(withdrawFundsResult);
      setWithdrawAmount('')
      setWithdrawalAddress('')
      setUserPass('')
      
      setUserConfirmed(false)
      setShowWithdrawalForm(false)
      setShowPasswordModal(false)
      setDisableButton(false)
      setRefreshInfo(Date.now())
      toast.success("Withdrawal successful!!!")
    })
    .catch((rejectedValueOrSerializedError) => {
      setDisableButton(false)
      toast.error(rejectedValueOrSerializedError)
    })
  }  




  


  return (
    <>
      <div className={`${showWithdrawalForm === false && 'scale-0'} fixed top-0 left-0 bg-black bg-opacity-20 h-screen w-screen z-40 flex items-center justify-center transition-all duration-500 p-2.5`}>
        <div className="bg-gray-50 dark:bg-gray-800 w-full max-w-lg h-fit pb-4 sm:pb-8 transition-all duration-700 relative shadow-xl">
          <section className="absolute right-0 py-2 px-4 cursor-pointer" onClick={() => {
            setShowWithdrawalForm(false)
          }}>
            <i className="fas fa-xmark text-2xl"></i>
            {/* <h6 className="text-xxs">minimize</h6> */}
          </section>


          <section className="space-y-4 divide-y pt-12 w-full max-w-md mx-auto flex flex-col h-full px-3">
            <section className="space-y-4">
              <div className="relative font-semibold">
                <h6 className="">Your balance is</h6>
                {userBalance}
              </div>

              <div className="relative pb-0.5">
                <h6 className="">Address to credit</h6>
                <input
                  type="text"
                  name='withdrawAmount'
                  placeholder='Withdrawal Address'
                  value={withdrawalAddress}
                  className="w-full py-2 px-2 ring-1 rounded-sm ring-gray-400 focus:outline-none bg-gray-50 text-gray-800"
                  onChange={(event) => {
                    setWithdrawalAddress(event.target.value)
                  }}
                  required
                />
              </div>

              <div className="relative pb-0.5">
                <span className="">Amount to withdraw</span>
                <input
                  type="text"
                  name='withdrawAmount'
                  placeholder='Withdrawal Amount'
                  value={withdrawAmount}
                  className="w-full py-2 px-2 ring-1 rounded-sm ring-gray-400 focus:outline-none bg-gray-50 text-gray-800"
                  onChange={(event) => {
                    if(event.target.value > -1 || event.target.value === "") {
                      setWithdrawAmount(event.target.value)
                    }
                  }}
                  required
                />
              </div>
            </section>
            
            <section className="space-y-4 pt-4">
              <h6 className="text-xs">
                Please confirm address before processing this request. We will not be liable for any loss of asset arising from withdrawing to a wrong address.
              </h6>

              <div className="relative pb-0.5">
                <button
                  className={`btn-solid hover-gradient cursor-pointer w-full py-2`}
                  onClick={() => {
                    if (withdrawalAddress.trim() === '' || !withdrawalAddress) {
                      toast.info('Enter address you wish to credit')
                      return
                    } else if (!withdrawAmount) {
                      toast.info('Enter amount you wish to withdraw')
                      return
                    } else if (withdrawAmount > userBalanceInFigures) {
                      toast.info('You do not have sufficient balance to withdraw this amount')
                      return
                    }

                    setShowPasswordModal(true)
                  }}
                >Process withdrawal</button>
              </div>
            </section>
          </section>
        </div>
      </div>



      <section className={`${showPasswordModal === false && 'scale-0'} fixed top-0 left-0 bg-black bg-opacity-20 h-screen w-screen z-40 flex items-center justify-center transition-all duration-500 p-2.5`}>
        <div className="bg-gray-50 dark:bg-gray-800 w-full max-w-sm h-fit py-4 transition-all duration-700 relative shadow-xl">
          <div autoComplete="off" className="w-full flex flex-col h-full px-3 space-y-4 divide-y max-w-md mx-auto">
            <section className="space-y-4">
              <section className="flex justify-between">
                <div className="relative">
                  <h6 className="">Your balance is</h6>
                  {userBalance}
                </div>
                
                <div className="relative">
                  <h6 className="">Withdrawal amount</h6>
                  {withdrawAmount} USDC
                </div>
              </section>

              <div className="relative">
                <h6 className="break-all">Your withdrawal address</h6>
                {withdrawalAddress}
              </div>

              <div className="relative pb-0.5">
                <span className="">Enter password to confirm</span>
                <input
                  type="password"
                  name='withdrawAmount'
                  placeholder='Account password'
                  value={userPass}
                  className="w-full py-2 px-2 ring-1 rounded-sm ring-gray-400 focus:outline-none bg-gray-50 text-gray-800"
                  onChange={(event) => {
                    setUserPass(event.target.value)
                  }}
                  required
                />
              </div>
            </section>
            
            <section className="space-y-6 pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="confirmAddress"
                  id="confirmAddress"
                  className=""
                  checked={userConfirmed}
                  onChange={()=> setUserConfirmed(!userConfirmed)}
                />
                <label htmlFor="confirmAddress" className="cursor-pointer">I confirm that the above address is correct</label>
              </div>

              <div className="relative pb-0.5 justify-between flex">
                <label
                  className={`btn-outline hover-solid cursor-pointer px-8 py-1.5`}
                  onClick={() => setShowPasswordModal(false)}
                >Cancel</label>

                <label
                  className={`btn-solid hover-gradient cursor-pointer px-8 py-1.5 ${disableButton && 'pointer-events-none bg-opacity-40'}`}
                  onClick={() => {
                    if (!userPass) {
                      toast.info('Enter account password to proceed')
                      return
                    } else if (!userConfirmed) {
                      toast.info('Please confirm that the address is correct')
                      return
                    }

                    withdrawFunds()
                  }}
                >Proceed</label>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

export default WithdrawalModal