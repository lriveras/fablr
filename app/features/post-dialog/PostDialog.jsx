import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    closePostDialog, openPostDialog, myPagesLoaded,
    pageSelected, postTextChanged,
    postDateChanged, postTimeChanged,
    postFormValidated, posting, posted, toggleScheduling, postError, dismissPostError, invalidFormError
} from './post-dialog-actions.js';
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
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';







class PostDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onPost = this.onPost.bind(this);
        this.onValidate = this.onValidate.bind(this);

    }
    onValidate(){
        let pdErrorMessage = "";
        let pdPageError = !this.props.pdPage || !this.props.pdPage.id;
        let pdTextError = !this.props.pdText || this.props.pdText=="";
        let pdDateError = false;
        let pdTimeError = false;
        if(this.props.pdScheduled){
            pdDateError = !Date.parse(this.props.pdDate);
            pdTimeError = !Date.parse(this.props.pdTime);
        }
        if(pdPageError || pdTextError || pdDateError || pdTimeError){
            pdErrorMessage = "There are some errors in the post please review the form.";
            this.props.invalidFormError(pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError);
        }
        else{
            this.props.invalidFormError(pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError);
            this.onPost();
        }
        
    }
    onPost() {
        if (this.props.pdPosting) return;
        const uri = "/" + this.props.pdPage.id + "/feed";
        let post = {};
        post.message = this.props.pdText;
        post.access_token = this.props.pdPage.access_token;
        if (this.props.pdScheduled) {
            let date = new Date(this.props.pdDate);
            date.setHours(this.props.pdTime.getHours());
            date.setMinutes(this.props.pdTime.getMinutes());
            post.scheduled_publish_time = parseInt(date.getTime() / 1000);//converting to linux epoch
            post.published = false;
        }
        const callback = (response) => {
            if (response && !response.error) this.props.posted();
            else this.props.postError("Oops! Something went wrong while posting to Facebook, please try again.");
        }
        FB.api(uri, "POST", post, callback);
        this.props.posting();
    }
    render() {
        const items = this.props.myPages.map((item) => <MenuItem value={item} key={item.id} primaryText={item.name} />);

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => { if (this.props.pdPosting) return; this.props.closePostDialog() } }
                />,
            <FlatButton
                label="Post"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onValidate}
                />,
        ];

        const errorSnackbar = (!this.props.pdErrorMessage || this.props.pdErrorMessage=="") ? <div></div> : 
            <Snackbar
                open={true}
                message={this.props.pdErrorMessage}
                autoHideDuration={4000}
                onRequestClose={this.props.dismissPostError}
                />;

        const pageSelect = <Row>
            <Col xs={8} md={8}>
                <SelectField
                    value={this.props.pdPage}
                    onChange={(e, k, page) => this.props.pageSelected(page)}
                    floatingLabelText="Select page..."
                    floatingLabelFixed={true}
                    errorText={this.props.pdPageError? "This field is required" : ""}
                    >
                    {items}
                </SelectField>
            </Col>
        </Row>;

        const toggleSchedule = <Row>
            <Col xs={3} md={3}>
                <Toggle
                    label="Schedule"
                    defaultToggled={this.props.pdScheduled}
                    onToggle={() => this.props.toggleScheduling(this.props.pdScheduled)}
                    />
            </Col>
        </Row>;
        const postText = <Row>
            <Col xs={12} md={12}>
                <TextField
                    hintText="Write something..."
                    value={this.props.pdText}
                    multiLine={true}
                    fullWidth={true}
                    rows={4}
                    errorText={this.props.pdTextError? "This field is required" : ""}
                    rowsMax={6}
                    maxLength="420"
                    onChange={(e, t) => this.props.postTextChanged(t)}
                    />
            </Col>
        </Row>;
        const scheduledDate = <DatePicker
            hintText="Select date..."
            value={this.props.pdDate}
            onChange={(e, d) => this.props.postDateChanged(d)}
            errorText={this.props.pdDateError? "This field is required" : ""}

            />;
        const scheduledTime = <TimePicker
            format="ampm"
            hintText="Select time..."
            value={this.props.pdTime}
            onChange={(e, t) => this.props.postTimeChanged(t)}
            errorText={this.props.pdTimeError? "This field is required" : ""}
            />;

        const scheduled = (!this.props.pdScheduled) ? <Row></Row> : <Row>
            <Col xs={3} md={3}>
                {scheduledDate}
            </Col>
            <Col xs={3} md={3}>
                {scheduledTime}
            </Col>
        </Row>

        const progress = <Row>
            <Col xs={6} md={6}>
            </Col>
            <Col xs={6} md={6}>
                <CircularProgress size={100} thickness={5} />
            </Col>
        </Row>;

        let content = <div>{pageSelect}  {postText}  {toggleSchedule}  {scheduled} </div>;
        if (this.props.pdLoading || this.props.pdPosting) content = progress;
        //prepare if scheduled or post selection
        return (<div>
            <Grid><Dialog
                title="Page Post"
                actions={actions}
                modal={true}
                open={this.props.postDialog}
                onRequestClose={this.props.closePostDialog}
                >
                {content}

            </Dialog></Grid> {errorSnackbar}</div>
        );
    }
}

const mapStateToProps = ({postDialogReducer}) => ((Object.keys(postDialogReducer).length === 0) ? initialState : postDialogReducer);

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const actions = {
        closePostDialog: () => dispatch(closePostDialog()),
        openPostDialog: () => dispatch(openPostDialog()),
        myPagesLoaded: (pages) => dispatch(myPagesLoaded(pages)),
        pageSelected: (page) => dispatch(pageSelected(page)),
        postTextChanged: (text) => dispatch(postTextChanged(text)),
        postDateChanged: (date) => dispatch(postDateChanged(date)),
        postTimeChanged: (time) => dispatch(postTimeChanged(time)),
        postFormValidated: (valid) => dispatch(postFormValidated(valid)),
        posting: () => dispatch(posting()),
        posted: (post) => dispatch(posted(post)),
        toggleScheduling: (currVal) => dispatch(toggleScheduling(currVal)),
        postError: (errorMessage) => dispatch(postError(errorMessage)),
        dismissPostError: () => dispatch(dismissPostError()),
        invalidFormError: (pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError) => 
            dispatch(invalidFormError(pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError))
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(PostDialog)




