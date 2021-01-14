const SET_GRID = 'SET_GRID'
const YELLOW_CIRCLE = 'YELLOW_CIRCLE'
// const RED_CIRCLE = 'RED_CIRCLE'
const GREENIFY = 'GREENIFY'

const initialState = {
  rows: 1,
  cols: 1,
  grid: [],
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
    case YELLOW_CIRCLE: {
      return {
        ...state,
        grid: action.newGrid,
        colorsCounter: action.updatedCounter,
        currentId: action.updatedId,
        cells: action.updatedCells,
        status: action.status
      }
    }
    // case RED_CIRCLE: {
    //   return {
    //     ...state,
    //     grid: action.grid,
    //     cells: action.updatedCells
    //   }
    // }
    case GREENIFY: {
      return {
        ...state,
        grid: action.grid
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
    const { grid: oldGrid, colorsCounter, currentId, status } = store.game
    const grid = oldGrid.map((item) => {
      return item.id === currentId && item.color !== 'green' ? { ...item, color: 'red' } : item
    })
    if (grid.length !== colorsCounter) {
      const gridRandom = newColor(grid)
      //  console.log('gridElementId: ', gridRandom.id)
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
      let newStatus = status
      if (cellsColors.red > newGrid.length / 2 || cellsColors.green > newGrid.length / 2) {
        console.log('You loose!')
        newStatus = 'Loose'
      }
      if (cellsColors.red < cellsColors.green) {
        console.log('You win')
        newStatus = 'Win'
      }
      dispatch({
        type: YELLOW_CIRCLE,
        newGrid,
        updatedCounter,
        updatedId,
        cellsColors,
        status: newStatus
      })
    }
  }
}

// export function changeColor() {
//   const newColor = (array, count = 0) => {
//     const counter = count + 1
//     const gridRandom = array[Math.floor(Math.random() * array.length)]
//     if (gridRandom.color === 'gray') {
//       return { ...gridRandom, color: 'yellow' }
//     }
//     if (counter <= array.length) {
//       return newColor(array, counter)
//     }
//     return { ...gridRandom }
//   }
//   return (dispatch, getState) => {
//     const store = getState()
//     const { grid, colorsCounter, cells } = store.game
//     // const grid = oldGrid.map((item) =>
//     // item.id === currentId && item.color !== 'green' ? { ...item, color: 'red' } : item
//     // )
//     if (grid.length !== colorsCounter) {
//       const gridRandom = newColor(grid)
//       console.log('gridElementId: ', gridRandom.id)
//       const newGrid = grid.map((item) => {
//         const updatedItem = item.id === gridRandom.id ? gridRandom : item
//         return updatedItem
//       })
//       const updatedCounter = colorsCounter + 1
//       const updatedId = gridRandom.id
//       const updatedCells = { ...cells, gray: cells.gray - 1, yellow: cells.yellow + 1 }
//       dispatch({
//         type: YELLOW_CIRCLE,
//         newGrid,
//         updatedCounter,
//         updatedId,
//         updatedCells
//       })
//     }
//   }
// }

// export function redCircle() {
//   return (dispatch, getState) => {
//     const store = getState()
//     const { grid: oldGrid, currentId, cells } = store.game
//     const grid = oldGrid.map((item) =>
//       item.id === currentId && item.color !== 'green' ? { ...item, color: 'red' } : item
//     )
//     const updatedCells = { ...cells, yellow: cells.yellow - 1, red: cells.red + 1 }
//     dispatch({
//       type: RED_CIRCLE,
//       grid,
//       updatedCells
//     })
//   }
// }

export function greenifyCircle(id = -1) {
  return (dispatch, getState) => {
    const store = getState()
    const { grid: oldGrid, currentId } = store.game
    if (id === currentId) {
      const grid = oldGrid.map((item) =>
        item.id === currentId ? { ...item, color: 'green' } : item
      )
      dispatch({
        type: GREENIFY,
        grid
      })
    }
  }
}
