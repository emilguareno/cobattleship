import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { store } from '../store';
import { incrementUserWord, decrementUserWord } from '../actions';
import User from './User';


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

let props;
const mapDispatchToProps = (dispatch, ownProps) => {
    props = ownProps;
    return {
        onIncrementUserWord: () => {
            dispatch(incrementUserWord());
        },
        onDecrementUserWord: () => {
            dispatch(decrementUserWord());
        }
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(User);

export default UserContainer;
/**
 * 
 * When the user word index increases or decreases, the regular Redux state is used, as we want the 
 * ui to be updated immediately. Below, we register to the Redux state changes and update the 
 * firebase word index for the user whenever the state changes
 */
let currentValue;
function onStateChange() {
    let previousValue = currentValue;
    const state = store.getState();
    currentValue = state.user.wordIndex;
    if (typeof previousValue !== 'undefined' && previousValue !== currentValue) {
        const battleId = props.battle.id;
        const { uid } = props.auth;
        const firebase = getFirebase();
        firebase.set(`battles/${battleId}/users/${uid}/wordIndex`, currentValue);
    }
}

store.subscribe(onStateChange);