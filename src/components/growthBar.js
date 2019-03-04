import React, { useState } from 'react'

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const GrowthBar = ({ initialTime, decrement, onTimeout }) => {
console.log(initialTime);
  const [ timeLeft, changeTimeLeft ] = useState(initialTime)

  if(timeLeft === 0){
    onTimeout()
  }
  else {
    const countDown = setTimeout(()=>changeTimeLeft(timeLeft - decrement), 100)
  }

  return <Progress percent={timeLeft} />
}
GrowthBar.defaultProps = {
	initialTime: 100,
	decrement: 1,
	inTimeout: ()=>{}
}

export default GrowthBar