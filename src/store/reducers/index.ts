import { basketReducer } from './basketSlice'
import { userReducer } from './userSlice'

const reducers = {
  user: userReducer,
  basket: basketReducer,
}

export default reducers
