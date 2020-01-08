import { Component } from 'react'
import './index.scss'
export default class MenuAndNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'home'
    }
    this.tab = [
      { type: 'home', key: '首页', icon: <i className="iconfont icon">&#xe734;</i> },
      { type: 'cases', key: '成功案例', icon: <i className="iconfont icon">&#xe6ef;</i> },
      { type: 'label', key: '解决方案', icon: <i className="iconfont icon">&#xe629;</i> },
      { type: 'center', key: '公告中心', icon: <i className="iconfont icon">&#xe663;</i> },
      { type: 'about', key: '关于我们', icon: <i className="iconfont icon">&#xe663;</i> }
    ]
  }
  // componentDidMount() {}

  onTab = activeTab => {
    this.setState({ activeTab }, () => this.props.updateMenu(activeTab))
  }

  render() {
    const { activeTab } = this.state
    return (
      <div className="menu-and-navigation">
        <div className="main-title-view">
          <span className="english-title">Company Title</span>
          <span className="chn-title">广告装饰有限公司</span>
        </div>

        <div className="menu-tab-view">
          {_.map(this.tab, (item, index) => {
            const isActive = activeTab === item.type
            const tabClass = isActive ? 'tab-item active' : 'tab-item'
            return (
              <div className={tabClass} key={index} onClick={() => this.onTab(item.type)}>
                {item.icon}
                {item.key}
                {isActive && <span className="circle">●</span>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
