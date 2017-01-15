import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FablrAppBar from '../fablr-app-bar/FablrAppBar.jsx';
import PagePostsViewContainer from '../page-posts-view/PagePostsViewContainer.jsx';
import InsightsDialogContainer from '../insights-dialog/InsightsDialogContainer.jsx';

const Home = () => <div>
            <FablrAppBar/>
            <PagePostsViewContainer/>
            <InsightsDialogContainer/>
        </div>;

export default Home;




