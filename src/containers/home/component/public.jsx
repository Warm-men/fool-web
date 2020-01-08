import { Component } from 'react'
// import './index.scss'
import Helmet from 'src/lib/pagehelmet.js'

export default class Home extends Component {
  // componentDidMount() {}

  render() {
    return (
      <div className="home_container">
        <Helmet title="home" link="/home" />
        <div>public</div>
      </div>
    )
  }
}
