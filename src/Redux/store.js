import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import rootReducer from './reducers';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function setStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
}

// export default function setStore(initialState) {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(
//       applyMiddleware(thunk)
//     )
//   );
// }