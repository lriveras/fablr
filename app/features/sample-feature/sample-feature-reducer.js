const appBarReducer = (state, action)=>{
        if(action.type==='LOGIN') 
            return Object.assign({},state, {logged:true, session:action.session});
        else if(action.type==='LOGOUT') 
            return Object.assign({},state, {logged:false, session:null});
        else return Object.assign({}, state);
    };

export default appBarReducer;