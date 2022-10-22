import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css'
import { Route, Routes } from 'react-router-dom';
import { getUserData } from './features/auth/userSlice';


import LandingPage from "./pages/LandingPage";
import PredictionPage from "./pages/bscPrediction/PredictionPage";
import Header from "./components/Header";
import ProfilePage from "./pages/userPages/ProfilePage";
import PortfolioPage from "./pages/userPages/PortfolioPage";
import TeamHistoryPage from './pages/userPages/TeamHistoryPage';
import FundingHistoryPage from './pages/userPages/FundingHistoryPage';
import PageLoading from './pages/PageLoading';
import Footer from './components/Footer';









const setModeThemeOnStartUp = () => {
  if (JSON.parse(localStorage.getItem("robinosThemeMode")) === 'dark' || (!('robinosThemeMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    return
  }

  document.documentElement.classList.remove('dark')
  return
}





function App() {
  const scrollToEventTrigger = useRef('events'),
        [userData, setUserData] = useState(null),
        [isLoading, setIsLoading] = useState(true),
        [refreshInfo, setRefreshInfo] = useState(null),
        dispatch = useDispatch()


  useEffect(() => {
    setModeThemeOnStartUp();
    if (window.location.hash === '#events') {
      scrollToEventTrigger.current.click()
    }
    
    dispatch(getUserData())
    .unwrap()
    .then(userInfo => {
      setUserData(userInfo)
      setIsLoading(false)
    })
    .catch(userInfoError => {
      setIsLoading(false)
      console.log(userInfoError);
    })
  }, [dispatch, refreshInfo])



  return (
    <>
      <div className="min-h-screen relative mb-16">
        <Header user={userData} setRefreshInfo={setRefreshInfo} />

        {isLoading === true ?
          <PageLoading />
        :
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/me/profile" element={<ProfilePage user={userData} setRefreshInfo={setRefreshInfo} />} />
            <Route path="/me/portfolio" element={<PortfolioPage user={userData} setRefreshInfo={setRefreshInfo} />} />
            <Route path="/me/portfolio/history" element={<TeamHistoryPage user={userData} setRefreshInfo={setRefreshInfo} />} />
            <Route path="/me/funding/history" element={<FundingHistoryPage user={userData} setRefreshInfo={setRefreshInfo} />} />

            <Route path="event/:eventID" element={<PredictionPage user={userData} setRefreshInfo={setRefreshInfo} />} />
          </Routes>
        }
        

        <ToastContainer position="bottom-left" theme="colored" />
      </div>

      
      <Footer />
    </>
  );
}


export default App;