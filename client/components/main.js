import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from './head'
import { history } from '../redux'
import { setGrid } from '../redux/reducers/game'

const Main = () => {
  const [rows, setRows] = useState('')
  const [cols, setCols] = useState('')
  const dispatch = useDispatch()
  const onClick = () => {
    if (rows !== '' && cols !== '') {
      dispatch(setGrid(rows, cols))
    }
    history.push('/game')
  }
  const onChange = (e) => {
    const regExp = /^\d+$/gm
    if (regExp.test(e.target.value) || e.target.value === '') {
      if (e.target.id === 'rows-id') {
        setRows(e.target.value)
      }
      if (e.target.id === 'cols-id') {
        setCols(e.target.value)
      }
    }
  }
  return (
    <div>
      <Head title="Hello" />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-orange-600 text-white font-bold rounded-lg border shadow-lg p-6">
          <div className="text-black">
            <input
              id="rows-id"
              type="text"
              className="border-2 rounded m-2 w-64"
              placeholder="Enter rows amount..."
              value={rows}
              onChange={onChange}
            />
          </div>
          <div className="text-black">
            <input
              id="cols-id"
              type="text"
              className="border-2 rounded m-2 w-64"
              placeholder="Enter columns amount..."
              value={cols}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="shadow rounded bg-orange-900 hover:bg-orange-800 m-2 px-4 py-2 font-bold"
              onClick={onClick}
            >
              Start
            </button>
          </div>
        </div>
        <p className="text-2xl">Game rules:</p>
        <div>
          <ol className="list-decimal">
            <li>Choose number of vertical and horizontal lines</li>
            <li>
              Press <span className="font-semibold">Start</span>
            </li>
            <li>Click on the circle when it turnes yellow</li>
            <li>If you managed to click on the circle during 1 sec, it turnes green</li>
            <li>Click untill half of the circles on the field turnes green</li>
            <li>You win!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
