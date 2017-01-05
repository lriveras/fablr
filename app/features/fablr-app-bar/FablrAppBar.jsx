import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { onLogin, onLogout } from './fablr-app-bar-actions';
import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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


    }
    componentWillMount(props) {

    }
    componentDidMount() {

    }
    checkLoginStatus() {
        FB.getLoginStatus(function (response) {
            console.log(response);
        });
    }
    onLogoutClick() {
        FB.logout(this.props.onLogout);
    }
    onLoginCallback(response) {
        console.log(response);
        if (response.accessToken) {
            this.props.onLogin(response);
        }
    }
    getRightElement() {
        let element;
        if (this.props.logged) {
            element = <div>
                <IconMenu
                    iconButtonElement={
                        <FlatButton
                            icon={<Avatar src={this.props.session.picture.data.url} />}
                            label={this.props.session.name} default={true} />
                    }
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" onTouchTap={this.onLogoutClick} />
                </IconMenu>
            </div>;
        }
        else {
            element =
                <FacebookLogin
                    appId="1810351719203911"
                    size={"small"}
                    textButton={"Login"}
                    icon={"fa-facebook"}
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,manage_pages,publish_pages,read_insights,pages_show_list,pages_manage_cta,pages_manage_instant_articles"
                    callback={this.onLoginCallback}
                    />;
        }
        return element;
    }
    getLeftElement() {
        let home =
            <FlatButton
                label="Fablr"
                labelPosition="after"
                icon={<Home color={fullWhite} />}
                labelStyle={{ color: fullWhite, fontSize: 25 }}
                />;
        let element;
        if (this.props.logged) {
            element =
                <div>
                    {home}
                </div>;
        }
        else {
            element = home;
        }
        return element;
    }
    render() {
        const appBar =
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <AppBar
                    iconElementLeft={this.getLeftElement()}
                    iconElementRight={this.getRightElement()}
                    />
            </MuiThemeProvider>
        return appBar;
    }
}

const initialState = { logged: false };

const mapStateToProps = ({logged = initialState.logged, session}) => ({
    logged,
    session
});

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { logged } = stateProps;
    const { dispatch } = dispatchProps;
    const actions = {
        onLogin: (session) => dispatch(onLogin(session)),
        onLogout: () => dispatch(onLogout())
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(FablrAppBar)




