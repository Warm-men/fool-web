import './index.scss'
import { useState, useEffect } from 'react'
export default function Cases(props) {
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    return onChangeTab()
  }, [activeTab])

  const tabArr = [
    { key: 'all', value: '全部' },
    { key: 'PC', value: 'PC' },
    { key: 'H5', value: 'H5' },
    { key: 'miniPro', value: '小程序' }
  ]

  const contentArr = [
    {
      imgUrl: require('src/assets/images/cases/case1.png'),
      name: '天利',
      id: 1,
      type: 'pc',
      link: 'https://'
    },
    {
      imgUrl: require('src/assets/images/cases/case2.png'),
      name: '集美名家',
      id: 2,
      type: 'h5',
      link: 'https://'
    },
    {
      imgUrl: require('src/assets/images/cases/case2.png'),
      name: '集美名家',
      id: 3,
      type: 'miniPro',
      link: 'https://',
      qrCode: require('src/assets/images/cases/QR_code.png')
    }
  ]

  const onChangeTab = () => {}

  return (
    <div className="cases-container">
      <div className="title-view">
        <div className="border-left"></div>
        成功案例
      </div>
      {/* 筛选tab */}
      <div className="tab-view">
        <div className="text">终端：</div>
        <div className="tabs">
          {_.map(tabArr, (item, index) => {
            const style = item.key === activeTab ? 'tab-item active' : 'tab-item'
            return (
              <div className={style} key={index} onClick={() => setActiveTab(item.key)}>
                {item.value}
              </div>
            )
          })}
        </div>
      </div>
      {/* case内容 */}
      <div className="cases-content">
        {_.map(contentArr, (item, index) => {
          return (
            <div className="case-item" key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.imgUrl} alt="" />
                <div className="desc">{item.name}</div>
              </a>
              {item.type === 'miniPro' ? (
                <div className="qr-code">
                  <div className="guide">微信扫码浏览</div>
                  <img src={item.qrCode} alt="" />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
