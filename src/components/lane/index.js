import './index.css'

import {connect} from 'react-redux'
import React from 'react'
import laneItems from '../../selectors/laneItems'

const mapStateToProps = (state, props) => ({
  items: laneItems(state, props)
})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onButtonClick (id) {
//       dispatch(toggleFeedActive(id))
//     }
//   }
// }

const Lane = () => {
  return (
    <div className='Lane'>Im a lane</div>
  )
}

export default connect(
  mapStateToProps
)(Lane)
