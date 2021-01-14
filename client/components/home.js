import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeColor, greenifyCircle } from '../redux/reducers/game'

const Home = () => {
  const dispatch = useDispatch()
  const array = useSelector((s) => s.game.grid)
  const cols = useSelector((s) => s.game.cols)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(changeColor())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])


  // useEffect(() => {
  //   setInterval(() => {
  //     dispatch(redCircle())
  //   }, 1000)
  // }, [])

  const onClick = () => {
    dispatch(changeColor())
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <button type="button" className="bg-orange-800" onClick={onClick}>
          To Yellow
        </button>
      </div>
      <div className="flex flex-wrap" style={{ width: `${cols * 5}rem` }}>
        {array.map((cell, index) => {
          return (
            <button
              key={`${cell}${index}`}
              id={`${cell.id}`}
              type="button"
              className={`m-2 w-16 h-16 rounded-full bg-${cell.color}-400`}
              onClick={() => dispatch(greenifyCircle(cell.id))}
            />
          )
        })}
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
