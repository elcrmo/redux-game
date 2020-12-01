import React, { useState } from 'react'
import Head from './head'
import { history } from '../redux'

const Main = () => {
  const [rows, setRows] = useState('')
  const [cols, setCols] = useState('')
  const onClick = () => {
    history.push('/field')
  }
  const onChange = (e) => {
    const regExp = /\d/g
    if (regExp.test(e.target.value)) {
      setRows(e.target.value)
      setCols(e.target.value)
    }
  }
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-orange-600 text-white font-bold rounded-lg border shadow-lg p-6">
          <div className="text-black">
            <input
              type="text"
              className="border-2 rounded m-2 w-64"
              placeholder="Enter rows amount..."
              value={rows}
              onChange={onChange}
            />
          </div>
          <div className="text-black">
            <input
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
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
