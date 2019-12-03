import MobileHeaderContainer from 'src/containers/header/mobile/mobile_header_container'
import { withRouter } from 'react-router'

export function Layout(props) {
  return (
    <div className="g-layout">
      {props.children}
      <MobileHeaderContainer />
    </div>
  )
}

export default withRouter(Layout)
