import { createStore, combineReducers } from 'redux'

let sheetDataReducer = function (state = {}, action) {
  console.log('Action', action)

  if (action.type == 'SET_NAMES') {
    return Object.assign(state, {
      character_name: action.character_name,
      player_name: action.player_name,
    })
  }

  if (action.type == 'SET_CHARACTER_RACE') {
    return Object.assign(state, {
      race_data: action.race_data,
    })
  }

  if (action.type == 'SET_CHARACTER_CLASS') {
    return Object.assign(state, {
      class_data: action.class_data,
    })
  }

  if (action.type == 'SET_ATTRIBUTES') {
    return Object.assign(state, {
      attributes_data: action.attributes_data,
    })
  }

  return state
}

let rootReducer = combineReducers({
  sheet_data: sheetDataReducer,
})

export let store = createStore(
  rootReducer,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
