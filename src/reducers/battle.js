import ActionTypes from '../constants/actionTypes';
const INITIAL_STATE = {
    inProgress: null,
    currentRound: 1,
    error: '',
    success: '',
    rounds: [],
    users: {}
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ActionTypes.GetBattleRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.GetBattleRejected: {
      return {
        ...state,
        inProgress: false,
        error: 'Error in getting text.',
      };
    }
    case ActionTypes.GetBattleFulfilled: {
      const newState = {
        ...state,
        inProgress: false,
        success: 'Got text.',
        ...action.battle
      };
      return newState;
    }
    default:
      return state;
  }
}