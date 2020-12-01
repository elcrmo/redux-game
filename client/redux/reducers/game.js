const SET_GRID = 'SET_GRID'
const CHANGE_COLOR = 'CHANGE_COLOR'

const initialState = {
  rows: 1,
  cols: 1,
  grid: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID: {
      return {
        ...state,
        rows: action.rows,
        cols: action.cols,
        grid: Array.from({ length: action.rows * action.cols })
          .fill(null)
          .map((item, index) => ({ id: index, color: 'gray' }))
      }
    }
    case CHANGE_COLOR: {
      return {
        ...state,
        grid: action.newGrid
      }
    }
    default:
      return state
  }
}

export function setGrid(rows, cols) {
  return {
    type: SET_GRID,
    rows,
    cols
  }
}

export function changeColor() {
  return (dispatch, getState) => {
    const store = getState
    const { grid } = store.game
    const gridRandom = grid[Math.floor(Math.random() * grid.length)]
    const newGrid = grid.map((item) => {
      const updatedItem = item.id === gridRandom.id ? {...gridRandom, color: 'yellow'} : item
      return updatedItem
    })
    dispatch({
      type: CHANGE_COLOR,
      newGrid
    })
  }
}
