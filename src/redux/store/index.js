import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
// import thunk from 'redux-thunk';

const store = createStore(() => console.log('oi'), composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}
export default store;
