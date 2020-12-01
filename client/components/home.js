import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const array = useSelector((s) => s.game.grid)
  const cols = useSelector((s) => s.game.cols)
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-wrap" style={{width: `${cols * 5}rem`}}>
        {array.map((cell) => {
          return (
            <div key={`${cell}`} className={`m-2 w-16 h-16 rounded-full bg-${cell.color}-400`}>
              {/* 0 */}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
