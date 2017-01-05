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



class FablrAppBar extends React.Component {
    constructor(props) {
        super(props);
        injectTapEventPlugin();
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }
    componentWillMount(props) {

    }
    componentDidMount() {

    }
    onLogoutClick(){
        this.props.onLogout();
    }
    onLoginClick(){
        FB.getLoginStatus(function(response) {
    console.log(response);
    });
        // this.props.onLogin();
    }
    render() {
        const loggedMenu = <IconMenu
            iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" onTouchTap={ this.onLogoutClick }/>
        </IconMenu>;

        const loginButton = <FlatButton label="Login" onTouchTap={ this.onLoginClick }></FlatButton>;

        const appBar =
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <AppBar
                    title="Fablr"
                    iconElementLeft={<IconButton><Home /></IconButton>}
                    iconElementRight={this.props.logged ? loggedMenu : loginButton}
                    />
            </MuiThemeProvider>

        return appBar;
    }
}

const initialState = { logged: false };

const mapStateToProps = ({logged = initialState.logged}) => ({
    logged
});

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { logged } = stateProps;
    const { dispatch } = dispatchProps;
    const actions = {
        onLogin: () => dispatch(onLogin()),
        onLogout: () => dispatch(onLogout())
    };
    return Object.assign({}, stateProps, ownProps, actions);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(FablrAppBar)




