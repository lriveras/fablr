import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { onLogin, onLogout } from './fablr-app-bar-actions';
import { openPostDialog, myPagesLoaded } from '../post-dialog/post-dialog-actions';
import PostDialogContainer from '../post-dialog/PostDialogContainer.jsx';
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




class FablrAppBar extends React.Component {
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
    }
    onLoginCallback(response) {
        if (response.accessToken) {
            this.props.onLogin(response);
            FB.api('/me/accounts', 'GET', {}, this.loadMyPages);
        }
    }

    render() {
        return <AppBar
            iconElementLeft={AppBarUserActions(this.props, this.openDialog)}
            iconElementRight={AppBarUserInfo(this.props, this.onLoginCallback, this.onLogoutClick)}
            />;
    }
}

const AppBarUserActions = (props, openDialog) => {
    if (props.logged) {
        return LoggedUserActions(openDialog);
    }
    else {
        return FablrHomeButton();
    }
};

const LoggedUserActions = (openDialog) => <div>
    {FablrHomeButton()}
    {PostActionButton(openDialog)}
    <PostDialogContainer />
</div>

const FablrHomeButton = () => <FlatButton
    label="Fablr"
    labelPosition="after"
    icon={<Home color={fullWhite} />}
    labelStyle={{ color: fullWhite, fontSize: 25 }}
    />;

const PostActionButton = (openDialog) => <FlatButton
    label="Post"
    labelStyle={{ color: fullWhite }}
    onTouchTap={openDialog}
    />;

const AppBarUserInfo = (props, onLoginCallback, onLogoutClick) => {
    if (props.logged) {
        return LoggedUserInfo(props, onLogoutClick);
    }
    else {
        return GuestUserInfo(onLoginCallback);
    }
}

const GuestUserInfo = (onLoginCallback) => <FacebookLogin
    appId="1816468645258885"
    size={"small"}
    textButton={"Login"}
    icon={"fa-facebook"}
    autoLoad={true}
    fields="name,email,picture"
    scope="public_profile,manage_pages,publish_pages,read_insights,pages_show_list,pages_manage_cta,pages_manage_instant_articles"
    callback={onLoginCallback}
    />;

const LoggedUserInfo = (props, onLogoutClick) => <div>
    <IconMenu
        iconButtonElement={
            <IconButton><Avatar src={props.session.picture.data.url} />{props.session.name}</IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
        <MenuItem primaryText="Sign out" onTouchTap={onLogoutClick} />
    </IconMenu>
</div>;

const initialState = { logged: false };

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
        myPagesLoaded: (pages) => dispatch(myPagesLoaded(pages))
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(FablrAppBar)




