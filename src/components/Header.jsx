import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { assignWalletToUser, checkIfUserHasAssignedWallet, login, logout, register, reset } from "../features/auth/userSlice";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router";


import LoginForm from '../pages/LoginForm'
import RegistrationForm from '../pages/RegistrationForm'
import FundingModal from './FundingModal';
import WithdrawalModal from './WithdrawalModal';






const switchThemeMode = (setThemeMode) => {
  if (JSON.parse(localStorage.getItem("robinosThemeMode")) === 'dark') {
    localStorage.setItem("robinosThemeMode", JSON.stringify('light'));
    setThemeMode('light')
    document.documentElement.classList.remove('dark')
    return
  } else {
    localStorage.setItem("robinosThemeMode", JSON.stringify('dark'));
    setThemeMode('dark')
    document.documentElement.classList.add('dark')
    return
  }
}






const Header = ({user, setRefreshInfo}) => {


  const [showLoginForm, setShowLoginForm] = useState(false),
        [themeMode, setThemeMode] = useState(JSON.parse(localStorage.getItem("robinosThemeMode")) || 'light'),
        [showRegisterForm, setShowRegisterForm] = useState(false),
        [showFundingForm, setShowFundingForm] = useState(false),
        [showWithdrawalForm, setShowWithdrawalForm] = useState(false),
        [hasAssignedWallet, setHasAssignedWallet] = useState(false),
        [assignedWallet, setAssignedWallet] = useState(''),
        [openMenu, setOpenMenu] = useState(''),
        dispatch = useDispatch(),
        navigateTo = useNavigate(),
        userBalance = new Intl.NumberFormat("en-US").format(user?.balance) + ' USDC'




  useEffect(() => {
    if (user?._id) {
      dispatch(checkIfUserHasAssignedWallet({}))
      .unwrap()
      .then((hasWallet) => {
        // console.log(hasWallet);

        if (hasWallet.status === true) {
          setOpenMenu('')
          setAssignedWallet(hasWallet.assignedWallet)
          setHasAssignedWallet(true)
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error(rejectedValueOrSerializedError)
      })
    }
  }, [user?._id, dispatch])




  const logMeOut = (event) => {
    event.preventDefault()
    setOpenMenu('')
    dispatch(logout())
    .unwrap()
    .then((originalPromiseResult) => {
      navigateTo(0)
    })
    .catch((rejectedValueOrSerializedError) => {
      toast.error(rejectedValueOrSerializedError)
    })
  }




  const submitLoginRegisterForm = (formName, formData) => {
    if (formName === 'login') {
      dispatch(login(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        setShowLoginForm(false)
        toast.success('Logged In Successfully')
        dispatch(reset())
        setRefreshInfo(Date.now())
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error(rejectedValueOrSerializedError)
      })
    } else if (formName === 'register') {
      dispatch(register(formData))
        .unwrap()
        .then((originalPromiseResult) => {
          setShowRegisterForm(false)
          toast.success('Registered In Successfully')
          dispatch(reset())
          navigateTo('/me/portfolio')
        })
        .catch((rejectedValueOrSerializedError) => {
          toast.error(rejectedValueOrSerializedError)
        })
    }
  }





  const assignWallet = () => {
    dispatch(assignWalletToUser({}))
    .unwrap()
    .then((newlyAssignedWallet) => {
      // console.log(newlyAssignedWallet);
      setOpenMenu('')
      setAssignedWallet(newlyAssignedWallet.assignedWallet)
      setHasAssignedWallet(true)
      setShowFundingForm(true)
    })
    .catch((rejectedValueOrSerializedError) => {
      toast.error(rejectedValueOrSerializedError)
    })
  }





  return (
    <>
      <LoginForm
        submitForm={submitLoginRegisterForm}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        setShowRegisterForm={setShowRegisterForm}
      />

      <RegistrationForm
        submitForm={submitLoginRegisterForm}
        showRegisterForm={showRegisterForm}
        setShowRegisterForm={setShowRegisterForm}
        setShowLoginForm={setShowLoginForm}
      />



      <div className="flex items-center justify-between w-full px-4 sm:px-8 py-2 shadow">
        <a href="/" className="">
          <img src="/img/logo/robinos-black-text.png" alt="Robinos Logo" className="h-20 sm:h-24 py-5 -my-5" />
        </a>

        <div className="flex items-center gap-x-6 text-sm font-medium">
          <section className="hidden sm:flex py-10 sm:p-0 items-center justify-center sm:flex-none">
            <div className="cursor-pointer" onClick={() => { switchThemeMode(setThemeMode) }}>
              <i className={`${(themeMode === 'dark') ? 'fas fa-sun' : 'fas fa-moon'} text-xl`}></i>
            </div>
          </section>
          {
            !user ?
              <>
                <button className='btn-outline hover-solid px-3.5 py-1.5' onClick={() => {
                  setShowLoginForm(!showLoginForm)
                }}>Login</button>

                <button className='btn-solid hover-gradient px-3.5 py-1.5' onClick={() => {
                  setShowRegisterForm(!showRegisterForm)
                }}>Sign Up</button>
              </>
            :
              <>
                <FundingModal
                  setRefreshInfo={setRefreshInfo}
                  showFundingForm={showFundingForm}
                  setShowFundingForm={setShowFundingForm}
                  assignedWallet={assignedWallet}
                  setAssignedWallet={setAssignedWallet}
                  hasAssignedWallet={hasAssignedWallet}
                  setHasAssignedWallet={setHasAssignedWallet}
                />

                <WithdrawalModal
                  setRefreshInfo={setRefreshInfo}
                  showWithdrawalForm={showWithdrawalForm}
                  setShowWithdrawalForm={setShowWithdrawalForm}
                  assignedWallet={assignedWallet}
                  setAssignedWallet={setAssignedWallet}
                  hasAssignedWallet={hasAssignedWallet}
                  setHasAssignedWallet={setHasAssignedWallet}
                  userBalance={userBalance}
                />


                <div className="relative py-3.5 sm:p-0">
                  <div className="flex items-center justify-center space-x-1 cursor-pointer" onClick={() => {
                    openMenu !== 'fundMenu' ? setOpenMenu('fundMenu') : setOpenMenu('')
                  }}>
                    <span className="">{userBalance}</span>
                    <div className="flex items-center justify-center">
                      <i className="fas fa-caret-down"></i>
                    </div>
                  </div>

                  <div className={`absolute right-0 top-10 sm:top-6 transition-all duration-300 ease-in-out ${openMenu !== 'fundMenu' ? 'scale-0' : 'z-10'}`}>
                    <div className="rotate-45 h-4 w-4 bg-white dark:bg-gray-800"></div>

                    <div className={`w-48 absolute top-2 -right-3 bg-white dark:bg-gray-800 divide-y divide-gray-200`}>
                      <div className="py-3 pl-4 space-y-3">
                        <h6 className="text-xxs leading-tight text-gray-400">Add funds to your wallet to earn more by trading</h6>

                        <button
                          className={`text-sm btn-solid hover-gradient w-3/4 px-3 py-1 ${hasAssignedWallet && 'bg-opacity-50 pointer-events-none'}`}
                          onClick={assignWallet}
                        >
                          Deposit
                        </button>
                      </div>
                      <div className="py-3 pl-4 space-y-3">
                        <h6 className="text-xxs leading-tight text-gray-400">Remove funds from your wallet to your bank account</h6>

                        <button
                          className="text-sm btn-outline hover-solid w-3/4 px-3 py-1"
                          onClick={() => {
                            setShowWithdrawalForm(true)
                            setOpenMenu('')
                            // toast.info('Sorry buddy, we are still working on this one!!!')
                          }}
                        >
                          Withdraw
                        </button>
                      </div>

                      <div className="py-1 pl-4">
                        <a href="/me/funding/history" className="block py-3">Funding History</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-3.5 sm:p-0">
                  <div className="flex items-center justify-center space-x-1 cursor-pointer" onClick={() => {
                    openMenu !== 'userMenu' ? setOpenMenu('userMenu') : setOpenMenu('')
                  }}>
                    <div className="flex items-center justify-center text-xl mr-2">
                      <i className="far fa-circle-user"></i>
                    </div>
                    {/* GET ONLY FIRSTNAME */}
                    <span className="font-semibold">{user.name.split(' ')[0]}</span>
                    {/* <span className="font-semibold">{user.name}</span> */}
                    <i className="fas fa-caret-down"></i>
                  </div>

                  <div className={`absolute right-0 top-10 sm:top-6 transition-all duration-300 ease-in-out ${openMenu !== 'userMenu' ? 'scale-0' : 'z-10'}`}>
                    <div className="rotate-45 h-4 w-4 bg-white dark:bg-gray-800 divide-y divide-gray-200"></div>

                    <div className={`w-48 absolute top-2 -right-3 bg-white dark:bg-gray-800 divide-y divide-gray-200`}>
                      <div className="py-1 pl-4">
                        <a href="/me/portfolio" className="block py-3">My Portfolio</a>
                      </div>
                      <div className="py-1 pl-4">
                        <a href="/me/portfolio/history" className="block py-3">Portfolio History</a>
                      </div>
                      <div className="py-1 pl-4">
                        <a href="/me/profile" className="block py-3">My Account</a>
                      </div>
                      <div className="py-1 pl-4">
                        <a href="/logout" className="block py-3 text-red-600" onClick={logMeOut}>Log Out</a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
      </div>
    </>
  )
}

export default Header