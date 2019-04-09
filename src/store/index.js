import {createStore} from 'redux';
/*
* 初始化state
 */

const initState = {
    count: 0
};


var reducer = function(state, action){
    switch (action.type) {
        case 'add_todo':
            return state.concat(action.text);
        default:
            return state;
    }
};




let store = createStore(reducer);

export default store;