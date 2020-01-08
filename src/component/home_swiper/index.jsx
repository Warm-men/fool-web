import { useEffect, useState } from 'react'
import './index.scss'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import urls from 'src/lib/urls'
import ajaxs from 'src/lib/axios'

export default function HomeSwiper(props) {
  const [swiperData, setSwiperData] = useState([])
  useEffect(() => {
    getBanner()
  }, [])

  const getBanner = async () => {
    const params = { page: 1, size: 10 }
    const res = await ajaxs({ url: urls.getBannerList, params, methods: 'get', isJson: true })
    if (res) {
      const { list } = res
      setSwiperData(list)
    }
  }

  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    loop: true
  }
  return (
    <div className="home-swiper-container">
      <div className="swiper_wrapper_container">
        {swiperData.length > 0 ? (
          <Swiper {...params}>
            {_.map(swiperData, (item, index) => {
              return (
                <div className="item" key={item.id}>
                  <img src={item.cover} alt="" />
                </div>
              )
            })}
          </Swiper>
        ) : null}
      </div>
    </div>
  )
}
