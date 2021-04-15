import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux'
import { clearStatus } from '../redux/reducers/game'

const Result = () => {
  const dispatch = useDispatch()
  const { status, cells } = useSelector((s) => s.game)
  const Back = () => {
    dispatch(clearStatus())
    history.push('/')
  }
  return (
    <div className="bg-orange-600 text-white font-bold rounded-lg border shadow-lg p-10">
      <div className="flex justify-center text-3xl pb-1">{status}</div>
      <div className="flex justify-center">green: {cells.green}</div>
      <div className="flex justify-center">red: {cells.red}</div>
      <button
        type="button"
        onClick={Back}
        className="flex justify-center shadow rounded bg-orange-900 hover:bg-orange-800 m-2 px-4 py-2 font-bold"
      >
        Play Again
      </button>
    </div>
  )
}

Result.propTypes = {}

export default Result
