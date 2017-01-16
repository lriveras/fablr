import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { onLogin, onLogout } from './fablr-app-bar-actions';
import { openPostDialog, myPagesLoaded } from '../post-dialog/post-dialog-actions';
import PostDialogContainer from '../post-dialog/PostDialogContainer.jsx';
import FablrConst from '../../fablr-const.js';
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

/*
FablrAppBar Component is a presentational container
*/
const FablrAppBar = ({logged, session}, openDialog, loadMyPages, onLogoutClick, onLoginCallback) => {

    const AppBarUserActions = () => {
        if (logged) {
            return LoggedUserActions();
        }
        else {
            return FablrHomeButton();
        }
    };

    const LoggedUserActions = () => <div>
        {FablrHomeButton()}
        {PostActionButton()}
        <PostDialogContainer />
    </div>

    const FablrHomeButton = () => <FlatButton
        label="Fablr"
        labelPosition="after"
        icon={<Home color={fullWhite} />}
        labelStyle={{ color: fullWhite, fontSize: 25 }}
        />;

    const PostActionButton = () => <FlatButton
        label="Post"
        labelStyle={{ color: fullWhite }}
        onTouchTap={openDialog}
        />;

    const AppBarUserInfo = () => {
        if (logged) {
            return LoggedUserInfo();
        }
        else {
            return GuestUserInfo();
        }
    }

    const GuestUserInfo = () => <FacebookLogin
        appId={FablrConst.appId}
        size={"small"}
        textButton={"Login"}
        icon={"fa-facebook"}
        autoLoad={false}
        fields="name,email,picture"
        scope={FablrConst.appScope}
        callback={onLoginCallback}
        />;

    const LoggedUserInfo = () => <div>
        <IconMenu
            iconButtonElement={
                <IconButton><Avatar src={session.picture.data.url} />{session.name}</IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
            <MenuItem primaryText="Sign out" onTouchTap={onLogoutClick} />
        </IconMenu>
    </div>;

    return <AppBar
        iconElementLeft={AppBarUserActions()}
        iconElementRight={AppBarUserInfo()}
        />;
}
export default FablrAppBar;




