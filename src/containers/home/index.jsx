import { Component, lazy } from 'react'
import './index.scss'
import Helmet from 'src/lib/pagehelmet.js'

const Menu = lazy(() => import('src/containers/home/component/menu'))
const MainContent = lazy(() => import('src/containers/home/component/main_content'))

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuType: 'home'
    }
  }
  // componentDidMount() {}

  updateMenu = menuType => {
    this.setState({ menuType })
  }

  render() {
    const { menuType } = this.state
    return (
      <div className="home_container">
        <Helmet title="home" link="/home" />
        <div className="headband"></div>
        <div className="container-view">
          <Menu updateMenu={this.updateMenu} />
          <MainContent menuType={menuType} />
        </div>
      </div>
    )
  }
}
