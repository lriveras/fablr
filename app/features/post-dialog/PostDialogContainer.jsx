import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    closePostDialog, openPostDialog, myPagesLoaded,
    pageSelected, postTextChanged, postLinkChanged,
    postDateChanged, postTimeChanged,
    posting, posted, toggleScheduling, postError, dismissPostError, formValidated
} from './post-dialog-actions.js';
import PostDialog from './PostDialog.jsx';
import { pageSelected as reselectPostsViewPage, loadPosts } from '../page-posts-view/page-posts-view-actions.js';

import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'

class PostDialogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onPost = this.onPost.bind(this);
        this.onValidate = this.onValidate.bind(this);
        this.preparePost = this.preparePost.bind(this);
        this.afterPost = this.afterPost.bind(this);
        this.reloadPostsView = this.reloadPostsView.bind(this);
    }
    onValidate() {
        let pdErrorMessage = "",
            pdPageError = !this.props.pdPage || !this.props.pdPage.id,
            pdTextError = !this.props.pdText || this.props.pdText == "",
            pdLinkError = false,
            pdDateError = false,
            pdTimeError = false;
        if (this.props.pdScheduled) {
            pdDateError = !Date.parse(this.props.pdDate);
            pdTimeError = !Date.parse(this.props.pdTime);
        }
        if (pdPageError || pdTextError || pdLinkError || pdDateError || pdTimeError) {
            pdErrorMessage = "There are some errors in the post, please review the form.";
            this.props.formValidated(pdErrorMessage, pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError);
        }
        else {
            this.props.formValidated(pdErrorMessage, pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError);
            this.onPost();
        }
    }
    onPost() {
        if (this.props.pdPosting) return;
        const uri = `/${this.props.pdPage.id}/feed`;
        let post = this.preparePost();
        FB.api(uri, "POST", post, this.afterPost);
        this.props.posting();
    }
    afterPost(response) {
        if (response && !response.error) {
            this.props.posted(response);
            this.reloadPostsView();
        }
        else {
            this.props.postError("Oops! Something went wrong while posting to Facebook, please try again.");
        }
    }
    reloadPostsView() {
        if (this.props.pgPage && this.props.pgPage.id) {
            const uri = `/${this.props.pgPage.id}/promotable_posts?fields=reactions.summary(true),message,link,scheduled_publish_time,is_published,created_time`;
            this.props.reselectPostsViewPage(this.props.pgPage);
            const callback = (response) => {
                if (response && !response.error) this.props.loadPosts(response);
                else this.props.postError("Oops! Something went wrong while loading the posts, please try again.");
            }
            FB.api(uri, "GET", {}, callback);
        }
    }
    preparePost() {
        let post = {};
        post.message = this.props.pdText;
        post.link = this.props.pdLink;
        post.access_token = this.props.pdPage.access_token;
        if (this.props.pdScheduled) {
            let date = new Date(this.props.pdDate);
            date.setHours(this.props.pdTime.getHours());
            date.setMinutes(this.props.pdTime.getMinutes());
            post.scheduled_publish_time = parseInt(date.getTime() / 1000);//converting to linux epoch
            post.published = false;
        }
        return post;
    }
    render() {
        return PostDialog(this.props, this.onValidate);
    }
}

const mapStateToProps = ({postDialogReducer, pagePostsViewReducer}) => (Object.assign({}, postDialogReducer, pagePostsViewReducer));

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const actions = {
        closePostDialog: () => dispatch(closePostDialog()),
        openPostDialog: () => dispatch(openPostDialog()),
        myPagesLoaded: (pages) => dispatch(myPagesLoaded(pages)),
        pageSelected: (page) => dispatch(pageSelected(page)),
        postTextChanged: (text) => dispatch(postTextChanged(text)),
        postLinkChanged: (link) => dispatch(postLinkChanged(link)),
        postDateChanged: (date) => dispatch(postDateChanged(date)),
        postTimeChanged: (time) => dispatch(postTimeChanged(time)),
        posting: () => dispatch(posting()),
        posted: (post) => dispatch(posted(post)),
        toggleScheduling: (currVal) => dispatch(toggleScheduling(currVal)),
        postError: (errorMessage) => dispatch(postError(errorMessage)),
        dismissPostError: () => dispatch(dismissPostError()),
        formValidated: (pdErrorMessage, pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError) =>
            dispatch(formValidated(pdErrorMessage, pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError)),
        loadPosts: (postsResponse) => dispatch(loadPosts(postsResponse)),
        reselectPostsViewPage: (page) => dispatch(reselectPostsViewPage(page))

    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(PostDialogContainer)




