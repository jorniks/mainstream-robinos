import React, { useCallback, useState, useEffect } from 'react'




const heroItems = [
  {
    bgImg: '/img/hero/epl_nba_nfl_ucl.jpg',
    headText: 'The beginning of all great things!',
    heroText: 'EPL, Champions League, NBA, and NFL are available for bonus sale now!',
    heroAppLink: "/#events"
  },
  {
    bgImg: '/img/hero/lewy1.png',
    headText: "We're not a sportsbook",
    heroText: 'Some might even say, Robinos might be the baby of Stocks and Sports!',
    heroAppLink: "/#events"
  },
  {
    bgImg: '/img/hero/f1.png',
    headText: 'F1',
    heroText: 'All F1 races covered for 2022!',
    heroAppLink: `${window.location.href}event/84`
  },
]




const HeroSection = () => {

  const [activeIndex, setActiveIndex] = useState(0),
        heroItemsCount = heroItems.length - 1;


  const handleNextSlide = useCallback(() => {
    setActiveIndex(activeIndex === heroItemsCount ? 0 : activeIndex + 1)
  }, [activeIndex, heroItemsCount])

  const handlePreviousSlide = () => {
    setActiveIndex(activeIndex < 1 ? heroItemsCount : activeIndex - 1)
  }


  useEffect(() => {
    const handleAutoplay = setInterval(handleNextSlide, 7000);
    return () => clearInterval(handleAutoplay)
  }, [handleNextSlide])



  return (
    <section className='relative'>
      {heroItems.map((heroItem, index) => (
        <section
          key={index}
          className={`relative flex items-center justify-center h-screen overflow-hidden transition duration-1000 ease-in-out ${index === activeIndex ? 'block animate-glide' : 'hidden'}`}
          style={{
            backgroundImage: `url(${heroItem.bgImg})`, backgroundRepeat: "repeat-x",
            backgroundSize: "cover", backgroundPosition: "center"
          }}
        >

          <div className="bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 w-full h-full flex items-center justify-center">
            <div className="w-full sm:w-3/5 text-center px-5 grid gap-y-2">
              <h1 className="text-3xl sm:text-5xl font-black"> {heroItem.headText} </h1>
              <h5 className="sm:text-lg font-medium h-28 flex items-center justify-center"> {heroItem.heroText} </h5>
              <div className="flex justify-center gap-6 sm:gap-8 items-center">
                <a href={heroItem.heroAppLink} className="btn-solid hover-gradient px-4 py-1.5">See Teams</a>
                <a href="https://medium.com/degen-in-the-house" className="btn-solid hover-gradient px-4 py-1.5">View Blog</a>
              </div>
            </div>
          </div>
        </section>
      ))}
      <div className='absolute right-0 top-0 h-full flex items-center cursor-pointer text-2xl transition-all duration-700 ease-in-out px-1.5 sm:px-6 hover:px-4 hover:bg-black hover:bg-opacity-5' onClick={handleNextSlide}>
        &#10095; {/* RIGHT || NEXT ARROW (a.k.a Greater Than) */}
      </div>
      <div className='absolute left-0 top-0 h-full flex items-center cursor-pointer text-2xl transition-all duration-700 ease-in-out px-1.5 sm:px-6 hover:px-4 hover:bg-black hover:bg-opacity-5' onClick={handlePreviousSlide}>
        &#10094; {/* LEFT || PREVIOUS ARROW (a.k.a Less Than) */}
      </div>


      <div className='flex justify-center absolute bottom-1 w-full gap-x-2'>
        {heroItems.map((heroItem, index) => (
          <span key={index} className={`p-1 rounded-full border bg-white dark:bg-black ${activeIndex === index ? 'bg-gray-700 dark:bg-gray-200' : ''}`} onClick={() => { setActiveIndex(index) }}></span>
        ))}
      </div>
    </section>
  )
}

export default HeroSection