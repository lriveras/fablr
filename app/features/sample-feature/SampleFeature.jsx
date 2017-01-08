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
        this.onPost = this.onPost.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }
    componentWillMount(props) {

    }
    componentDidMount() {

    }
    onPost() {
    }
    onCancel(response) {
    }
    render() {
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




