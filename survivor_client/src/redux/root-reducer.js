import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import uiReducer from './reducers/uiReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data'],
}

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
})

export default persistReducer(persistConfig, rootReducer)
