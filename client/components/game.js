import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeColor, toGreen } from '../redux/reducers/game'
import Result from './result'

const Game = () => {
  const dispatch = useDispatch()
  const { grid, cols, status, activeTimer } = useSelector((s) => s.game)
  useEffect(() => {
    dispatch(changeColor())
    return () => {
      clearInterval(activeTimer)
    }
  }, [])
  return (
    <div className="bg-orange-600 flex justify-center items-center h-screen">
      <div className="flex flex-wrap" style={{ width: `${cols * 5}rem` }}>
        {grid.map((cell, index) => {
          return (
            <button
              key={`${cell}${index}`}
              id={`${cell.id}`}
              type="button"
              className={`m-2 w-16 h-16 rounded-full bg-${cell.color}-400`}
              onClick={() => dispatch(toGreen(cell.id))}
            />
          )
        })}
      </div>
      {status !== 'in progress' && (
        <div className="absolute w-screen h-screen opacity-80 top-0 left-0 flex items-center justify-center">
          <Result />
        </div>
      )}
    </div>
  )
}

Game.propTypes = {}

export default Game
