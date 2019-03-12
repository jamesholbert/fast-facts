import React, { Component } from 'react'
import { connect } from 'react-redux'

class UnconnectedWindowListener extends Component {
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.props.setWindowWidth(window.innerWidth)
    this.props.setWindowHeight(window.innerHeight)
  }
  render() {
    return <span />
  }
}

const WindowListener = connect(
  null,
  dispatch => ({
    setWindowWidth: value => {
      dispatch({ type: 'WINDOW_WIDTH_SET', value})
    },
    setWindowHeight: value => {
      dispatch({ type: 'WINDOW_HEIGHT_SET', value})
    }
  })
)(UnconnectedWindowListener)

export default WindowListener