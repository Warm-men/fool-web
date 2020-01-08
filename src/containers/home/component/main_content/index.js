import { Component } from 'react'
import './index.scss'
import HomeSwiper from 'src/component/home_swiper'
import Cases from 'src/component/cases'

export default class MainContent extends Component {
  getContent = () => {
    const { menuType } = this.props
    switch (menuType) {
      case 'home':
        return <HomeSwiper />
      case 'cases':
        return <Cases />
      default:
        return <HomeSwiper />
    }
  }

  render() {
    const Content = this.getContent()
    return <div className="main-content-container">{Content}</div>
  }
}
