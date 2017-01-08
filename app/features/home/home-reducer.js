const homeReducer = (state, action)=>{
        if(action.type==='HOME') 
            return Object.assign({},state, {fbLoaded:action.fbLoaded});
        return Object.assign({}, state);
    };

export default homeReducer;