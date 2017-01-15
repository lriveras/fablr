import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { onLogin, onLogout } from './fablr-app-bar-actions';
import { openPostDialog, myPagesLoaded } from '../post-dialog/post-dialog-actions';
import {cleanPosts} from '../page-posts-view/page-posts-view-actions';
import PostDialogContainer from '../post-dialog/PostDialogContainer.jsx';
import FablrAppBar from './FablrAppBar.jsx'
import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Home from 'material-ui/svg-icons/action/home';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FacebookLogin from 'react-facebook-login';
import Avatar from 'material-ui/Avatar';
import { fullWhite } from 'material-ui/styles/colors';

class FablrAppBarContainer extends React.Component {
    constructor(props) {
        super(props);
        injectTapEventPlugin();
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onLoginCallback = this.onLoginCallback.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.loadMyPages = this.loadMyPages.bind(this);
    }
    openDialog() {
        this.props.openPostDialog();
        if(!this.props.myPages)
            FB.api('/me/accounts', 'GET', {}, this.loadMyPages);
        else 
            this.props.myPagesLoaded(this.props.myPages);
    }
    loadMyPages(response) {
        this.props.myPagesLoaded(response.data);
    }
    onLogoutClick() {
        FB.logout(this.props.onLogout);
        this.props.cleanPosts();
    }
    onLoginCallback(response) {
        if (response.accessToken) {
            this.props.onLogin(response);
            FB.api('/me/accounts', 'GET', {}, this.loadMyPages);
        }
    }

    render() {
        return FablrAppBar(this.props, this.openDialog, this.loadMyPages, this.onLogoutClick, this.onLoginCallback );
    }
}

const mapStateToProps = ({appBarReducer, postDialogReducer}) => {
    return Object.assign({}, appBarReducer, postDialogReducer) ;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { logged } = stateProps;
    const { dispatch } = dispatchProps;
    const actions = {
        onLogin: (session) => dispatch(onLogin(session)),
        onLogout: () => dispatch(onLogout()),
        openPostDialog: () => dispatch(openPostDialog()),
        myPagesLoaded: (pages) => dispatch(myPagesLoaded(pages)),
        cleanPosts: () => dispatch(cleanPosts())
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(FablrAppBarContainer)




