import postDialogReducer from './features/post-dialog/post-dialog-initial-state.js';
import pagePostsViewReducer from './features/page-posts-view/page-post-view-initial-state.js';
import insightsDialogReducer from './features/insights-dialog/insights-dialog-initial-state.js';

const initialState = Object.assign({}, {postDialogReducer, pagePostsViewReducer, insightsDialogReducer});

export default initialState;