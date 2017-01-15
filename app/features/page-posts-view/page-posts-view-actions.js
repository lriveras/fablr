
const pageSelected = (page) => {
    return {
        type: 'PAGE_SELECTED_ON_VIEW',
        pgPage: page
    }
};

const loadPosts = (postsResponse) => {
    return {
        type: 'LOAD_POSTS',
        pgPosts: postsResponse.data,
        pgPaging: postsResponse.paging
    }
}

const cleanPosts = () => {
    return {
        type: 'CLEAN_POSTS',
        pgPosts: null,
        pgPaging: null
    }
}


export { pageSelected, loadPosts, cleanPosts };