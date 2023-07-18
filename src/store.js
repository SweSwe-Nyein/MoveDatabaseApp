import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import movieReducer from './screens/Movie/movieReducer';


//combine all the reducers
const rootReducer = combineReducers({
  movieReducer,
});

//creating a store witht the help of middleware thunk
export const store = createStore(rootReducer, applyMiddleware(thunk));