const postDialogReducer = (state, {type, pdErrorMessage, pdScheduled, 
    postDialog, pdLoading, pdPage, pdText, pdLink,
    pdDate, pdTime, pdValid, pdPosting, pdPost, myPages, 
    pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError})=>{
        if(type==='CLOSE_POST_DIALOG'){
            return Object.assign({},state, {postDialog});
        } 
        else if(type==='OPEN_POST_DIALOG') {
            return Object.assign({},state, {postDialog, pdLoading, pdPage, pdText, 
                pdDate, pdTime, pdValid, pdPosting, 
                pdPost, myPages, pdScheduled, pdPageError, pdTextError, pdDateError, pdTimeError});
        }
        else if(type==='MY_PAGES_LOADED') {
            return Object.assign({},state, {myPages, pdLoading});
        } 
        else if(type==='PAGE_SELECTED') {
            return Object.assign({},state, {pdPage});
        } 
        else if(type==='POST_TEXT_CHANGED') {
            return Object.assign({},state, {pdText});
        } 
        else if(type==='POST_LINK_CHANGED') {
            return Object.assign({},state, {pdLink});
        } 
        else if(type==='POST_DATE_CHANGED') {
            return Object.assign({},state, {pdDate});
        } 
        else if(type==='POST_TIME_CHANGED') {
            return Object.assign({},state, {pdTime});
        }
        else if(type==='POSTING') {
            return Object.assign({},state, {pdPosting});
        } 
        else if(type==='POSTED') {
            return Object.assign({},state, {pdPost, postDialog, pdPosting});
        } 
        else if(type==='TOGGLE_SCHEDULING') {
            return Object.assign({},state, {pdScheduled});
        }
        else if(type==='POST_ERROR'){
            return Object.assign({},state, {pdErrorMessage, pdPosting});
        }
        else if(type==='DISMISS_POST_ERROR'){
            return Object.assign({},state, {pdErrorMessage, pdPost});
        }
        else if(type==='FORM_VALIDATED'){
            return Object.assign({},state, {pdErrorMessage, pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError});
        }
        else{
            return Object.assign({},state,);
        } 
            
    };

export default postDialogReducer;