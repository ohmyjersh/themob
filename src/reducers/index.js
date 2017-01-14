const ADD_MOBSTER = 'ADD_MOBSTER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const SWITCH_NEXT = 'SWITCH_NEXT';
const UPDATE_STATE = 'UPDATE_STATE';


function addMobsterReducer(state, text) {
  var newMobsters = state.mobsters.concat(text);
  return Object.assign({}, state, {mobsters: newMobsters});
}

function updateOrderReducer(state, mobsters) {
  return Object.assign({}, state, {mobsters: mobsters})
}

function switchNextReducer(state) {
  state.mobsters.push(state.mobsters.shift());
  return Object.assign({}, state, {mobsters: state.mobsters});
}

function updateState(state, update) {
  return Object.assign({}, state, update);
}

function initialState(){
  return { 
      add:'',
      mobsters:[],
      isPlaying: false,
      isSwitching:false,
      showSettings: false,
      setting: {
        mobDuration:5,
        waitDuration:5,
        saveLocal:false
      }
    };
}

export default function(state = initialState(), action) {
  switch (action.type) {
    case ADD_MOBSTER:
      return addMobsterReducer(state, action.text);
    case UPDATE_ORDER:
      return updateOrderReducer(state, action.mobsters);
    case SWITCH_NEXT: {
      return switchNextReducer(state);
    }
    case UPDATE_STATE: {
      return updateState(state, action.update);
    }
      default:
        return state;
  }
}

export const actionCreators = {
  updateState: (update) => ({ type: UPDATE_STATE, update }),
  addMobster: (text) => ({ type: ADD_MOBSTER, text }),
  updateOrder: (mobsters) => ({ type: UPDATE_ORDER, mobsters }),
  switchNext: () => ({ type: SWITCH_NEXT })
}
