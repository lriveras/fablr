const pagePostsViewReducer = (state, {type, pgPage, pgPosts, pgPaging})=>{
        if(type==='PAGE_SELECTED_ON_VIEW') {
            return Object.assign({},state, {pgPage});
        } 
        else if(type ==='LOAD_POSTS') {
            return Object.assign({},state, {pgPaging, pgPosts});
        } 
        else if(type ==='CLEAN_POSTS') {
            return Object.assign({},state, {pgPaging, pgPosts});
        }
        else{
            return Object.assign({},state,);
        } 
            
    };

export default pagePostsViewReducer;