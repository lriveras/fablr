import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { togglefbLoaded } from './home-actions';
import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'
import FablrAppBar from '../fablr-app-bar/FablrAppBar.jsx';
import PagePostView from '../page-posts-view/PagePostsView.jsx';
import InsightsDialogContainer from '../insights-dialog/InsightsDialogContainer.jsx';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(props) {

    }
    componentDidMount() {

    }
    render() {
        return <div>
            <FablrAppBar/>
            <PagePostView/>
            <InsightsDialogContainer/>
        </div>;
    }
}

// Home.propTypes = {
//   fbLoaded: PropTypes.bool.isRequired,
//   authenticated: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

const initialState = { fbLoaded: false, authenticated: false };

const mapStateToProps = ({}) => ({

});

function mergeProps(stateProps, dispatchProps, ownProps) {
    const {  } = stateProps;
    const { dispatch } = dispatchProps;
    const actions = {

    };
    return Object.assign({}, stateProps, ownProps, actions);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(Home)




