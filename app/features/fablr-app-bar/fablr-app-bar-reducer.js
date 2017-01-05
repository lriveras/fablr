const appBarReducer = (state, action)=>{
        if(action.type==='LOGIN') 
            return Object.assign({},state, {logged:true});
        else if(action.type==='LOGOUT') 
            return Object.assign({},state, {logged:false});
        else return Object.assign({}, state);
    };

export default appBarReducer;