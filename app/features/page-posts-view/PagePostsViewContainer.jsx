import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { pageSelected, loadPosts } from './page-posts-view-actions.js';
import { postError } from '../post-dialog/post-dialog-actions.js';
import { openInsights, insightMetricLoaded, insightsPresented } from '../insights-dialog/insights-dialog-actions.js';
import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'
import PagePostsView from './PagePostsView.jsx';

class PagePostsViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onPageSelected = this.onPageSelected.bind(this);
        this.onPageNext = this.onPageNext.bind(this);
        this.onPagePrev = this.onPagePrev.bind(this);
    }
    onPageSelected(e, k, page) {
        const uri = `/${page.id}/promotable_posts?fields=reactions.summary(true),message,link,scheduled_publish_time,is_published,created_time`;
        this.props.pageSelected(page);
        const callback = (response) => {
            console.log(response);
            if (response && !response.error) this.props.loadPosts(response);
            else this.props.postError("Oops! Something went wrong while loading the posts, please try again.");
        }
        FB.api(uri, "GET", {}, callback);
    }
    onPageNext() {
        const uri = this.props.pgPaging.next.split("v2.8")[1];
        const callback = (response) => {
            console.log(response);
            if (response && !response.error && response.data.length > 0) this.props.loadPosts(response);
            else this.props.postError("There are no more posts to load.");
        }
        FB.api(uri, "GET", {}, callback);
    }
    onPagePrev() {
        const uri = this.props.pgPaging.previous.split("v2.8")[1];
        const callback = (response) => {
            console.log(response);
            if (response && !response.error && response.data.length > 0) this.props.loadPosts(response);
            else this.props.postError("There are no more posts to load.");
        }
        FB.api(uri, "GET", {}, callback);
    }
    render() {
        return PagePostsView(this.props.pgPage, 
        this.props.myPages, 
        this.props.pgPosts, 
        this.props.pgPaging, 
        this.onPageSelected, 
        this.onPageNext, 
        this.onPagePrev, 
        this.props.openInsights);
    }
}

const mapStateToProps = ({postDialogReducer, pagePostsViewReducer, insightsDialogReducer}) => {
    return Object.assign({}, postDialogReducer, pagePostsViewReducer, insightsDialogReducer);
};

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const actions = {
        pageSelected: (page) => dispatch(pageSelected(page)),
        loadPosts: (postsResponse) => dispatch(loadPosts(postsResponse)),
        postError: (errorMessage) => dispatch(postError(errorMessage)),
        openInsights: (post) => dispatch(openInsights(post))
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(PagePostsViewContainer)




