

const PageLoading = () => {
  return (
    <section className={`bg-white dark:bg-gray-800 h-full w-full fixed top-0 left-0 z-30 flex items-center justify-center px-1 font-medium`}>
      <figure className="text-gray-800 dark:text-white text-center max-w-md p-4 rounded">
        <img src={`${JSON.parse(localStorage.getItem("robinosThemeMode")) === 'dark' ? '/img/logo/robinos-white-text.png' : '/img/logo/robinos-black-text.png'}`} alt="Robinos" className='animate-pulse text-5xl font-black' />
        {/* <h6 className="italic text-sm font-medium">page is loading ....</h6> */}
      </figure>
    </section>
  )
}

export default PageLoading