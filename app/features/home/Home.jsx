import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FablrAppBarContainer from '../fablr-app-bar/FablrAppBarContainer.jsx';
import PagePostsViewContainer from '../page-posts-view/PagePostsViewContainer.jsx';
import InsightsDialogContainer from '../insights-dialog/InsightsDialogContainer.jsx';

const Home = () => <div>
            <FablrAppBarContainer/>
            <PagePostsViewContainer/>
            <InsightsDialogContainer/>
        </div>;

export default Home;




