import { useEffect, useState } from 'react'
import axios from 'axios';


// const imagesLink = [
//   'https://miro.medium.com/max/1400/1*8HOFUbCg7Rvcpr7ACPzYhw.jpeg',
//   'https://miro.medium.com/max/1400/1*OgrUhIOPUF2lw-04VUvPaw.png',
//   'https://cdn-images-1.medium.com/max/612/1*EAbKAKVecN9ncI9oTyAaKw.jpeg',
// ]


function BlogPosts() {
  const [rssFeed, setRssFeed] = useState([]);


  useEffect(() => {
    async function getRSSFeed() {
      await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/degen-in-the-house')
      .then(res => {
        setRssFeed(res.data.items)
      })
      .catch(error => {
        console.log('blogError', error.response.data)
      })
      
      // await axios.get('https://api.factmaven.com/xml-to-json/?xml=https://medium.com/feed/degen-in-the-house')
      // .then(res => {
      //   setRssFeed(res.data.rss.channel.item)
      // })
      // .catch(error => {
      //   console.log('blogError', error)
      // })
    }
    
    getRSSFeed()
  }, [])




  return (
    <section className='flex flex-col justify-center gap-4 text-center my-8'>
      <h2 className='text-3xl font-black'>BLOGS & NEWS</h2>

      <p className='font-medium'>
        Give our blogs and news a look! It will show the thoughts of the Robinos team!
      </p>


      <figure className='grid grid-cols-1 sm:grid-cols-3 gap-3 px-2 sm:px-28'>
        {rssFeed.slice(0, 3).map((feed, index) => (
          <a key={index} href={feed.link} target="_blank" rel="noreferrer" title={feed.title}>

            <div className='h-56 sm:h-64'
              style={{
                backgroundImage: `url(${feed.thumbnail})`,
                // backgroundImage: `url(${imagesLink[index]})`, backgroundRepeat: "no-repeat",
                backgroundSize: "cover", backgroundPosition: "center"
              }}
            >

              <div className='text-xs text-white font-bold px-4 h-full flex items-center justify-center bg-red-700 bg-opacity-50 transition-all duration-700 ease-in-out opacity-0 hover:opacity-100'>
                {feed.title}
              </div>

            </div>

          </a>
        ))}
      </figure>

      <div className='flex justify-center items-center mt-4'>
        <a href="https://medium.com/degen-in-the-house" target="_blank" rel="noreferrer" className="btn-solid hover-gradient px-4 py-1.5">View More</a>
      </div>
    </section>
  )
}

export default BlogPosts
