const SET_GRID = 'SET_GRID'
const CHANGE_COLOR = 'CHANGE_COLOR'
const TO_GREEN = 'TO_GREEN'
const CLEARSTATUS = 'CLEARSTATUS'

const initialState = {
  rows: 1,
  cols: 1,
  grid: [],
  activeTimer: 0,
  status: 'in progress',
  colorsCounter: 0,
  currentId: -1,
  cells: {
    gray: 0,
    yellow: 0,
    red: 0,
    green: 0
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID: {
      return {
        ...initialState,
        rows: action.rows,
        cols: action.cols,
        grid: action.grid,
        cells: { ...state.cells, ...action.cells }
      }
    }
    case CHANGE_COLOR: {
      return {
        ...state,
        grid: action.newGrid,
        colorsCounter: action.updatedCounter,
        currentId: action.updatedId,
        cells: action.cellsColors,
        status: action.status,
        activeTimer: action.timerOn
      }
    }
    case TO_GREEN: {
      return {
        ...state,
        grid: action.grid
      }
    }
    case CLEARSTATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    default:
      return state
  }
}

export function setGrid(rows, cols) {
  const grid = Array.from({ length: rows * cols })
    .fill(null)
    .map((item, index) => ({ id: index, color: 'gray' }))
  const cells = {
    gray: grid.length
  }
  return {
    type: SET_GRID,
    rows,
    cols,
    grid,
    cells
  }
}

export function changeColor() {
  const newColor = (array, count = 0) => {
    console.log(array)
    const counter = count + 1
    const gridRandom = array[Math.floor(Math.random() * array.length)]
    if (gridRandom.color === 'gray') {
      return { ...gridRandom, color: 'yellow' }
    }
    if (counter <= array.length) {
      return newColor(array, counter)
    }
    return { ...gridRandom }
  }
  return (dispatch, getState) => {
    const store = getState()
    const { activeTimer, grid: oldGrid, colorsCounter, currentId, status } = store.game
    const grid = oldGrid.map((item) => {
      return item.id === currentId && item.color !== 'green' ? { ...item, color: 'red' } : item
    })
    if (status === 'in progress') {
      if (grid.length !== colorsCounter) {
        const gridRandom = newColor(grid)
        const newGrid = grid.map((item) => {
          const updatedItem = item.id === gridRandom.id ? gridRandom : item
          return updatedItem
        })
        const updatedCounter = colorsCounter + 1
        const updatedId = gridRandom.id
        const cellsColors = newGrid.reduce(
          (acc, rec) => ({ ...acc, [rec.color]: acc[rec.color] + 1 }),
          {
            gray: 0,
            yellow: 0,
            red: 0,
            green: 0
          }
        )
        const timerOn = setTimeout(() => {
          dispatch(changeColor())
        }, 1000)
        let newStatus = status
        if (cellsColors.red > newGrid.length / 2 && cellsColors.green < newGrid.length / 2) {
          newStatus = 'You loose!'
        }
        if (cellsColors.red < newGrid.length / 2 && cellsColors.green >= newGrid.length / 2) {
          newStatus = 'You win!'
        }
        dispatch({
          type: CHANGE_COLOR,
          newGrid,
          updatedCounter,
          updatedId,
          cellsColors,
          status: newStatus,
          timerOn
        })
      }
    } else clearTimeout(activeTimer)
  }
}

export function toGreen(id = -1) {
  return (dispatch, getState) => {
    const store = getState()
    const { grid: oldGrid, currentId } = store.game
    if (id === currentId) {
      const grid = oldGrid.map((item) =>
        item.id === currentId ? { ...item, color: 'green' } : item
      )
      dispatch({
        type: TO_GREEN,
        grid
      })
    }
  }
}

export function clearStatus() {
  return {
    type: CLEARSTATUS,
    status: 'in progress'
  }
}
