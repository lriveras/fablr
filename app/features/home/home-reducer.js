const homeReducer = (state, action)=>{
        if(action.type==='LOGIN') 
            return Object.assign({},state, {fbLoaded:action.fbLoaded});
        else return Object.assign({}, state);
    };

export default homeReducer;