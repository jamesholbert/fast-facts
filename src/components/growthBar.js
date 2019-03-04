import React, { useState } from 'react'

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const GrowthBar = ({ percent, onTimeout }) => {
  return <Progress percent={percent} />
}
GrowthBar.defaultProps = {
	onTimeout: ()=>{}
}

export default GrowthBar