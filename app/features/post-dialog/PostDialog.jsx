import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    closePostDialog, openPostDialog, myPagesLoaded,
    pageSelected, postTextChanged,
    postDateChanged, postTimeChanged,
    posting, posted, toggleScheduling, postError, dismissPostError, formValidated
} from './post-dialog-actions.js';
import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'

import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
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
    onValidate() {
        let pdErrorMessage = "",
        pdPageError = !this.props.pdPage || !this.props.pdPage.id, 
        pdTextError = !this.props.pdText || this.props.pdText == "", 
        pdDateError = false, 
        pdTimeError = false;
        if (this.props.pdScheduled) {
            pdDateError = !Date.parse(this.props.pdDate);
            pdTimeError = !Date.parse(this.props.pdTime);
        }
        if (pdPageError || pdTextError || pdDateError || pdTimeError) {
            pdErrorMessage = "There are some errors in the post please review the form.";
            this.props.formValidated(pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError);
        }
        else {
            this.props.formValidated(pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError);
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
        return PostDialogGrid(this.props, this.onValidate);
    }
}

const PostDialogGrid = (props, onValidate) => <div>
    <Grid>
        <Dialog
            title="Page Post"
            actions={PostDialogActions(props, onValidate)}
            modal={true}
            open={props.postDialog}
            onRequestClose={props.closePostDialog}
            >
            {PostForm(props)}
        </Dialog>
    </Grid>
    {PostDialogSnackbar(props)}
</div>;

const PostForm = (props) => {
    return (props.pdLoading || props.pdPosting) ? CircularProgressRow() :
        <div>
            {PostDialogPageSelectRow(props)}
            {PostDialogTextFieldRow(props)}
            {PostDialogToggleScheduleRow(props)}
            {PostScheduledTimeRow(props)}
        </div>;
};

const PostDialogActions = ({pdPosting, closePostDialog}, onValidate) => [
    <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => { if (pdPosting) return; closePostDialog() } }
        />,
    <FlatButton
        label="Post"
        primary={true}
        keyboardFocused={true}
        onTouchTap={onValidate}
        />,
];

const PostDialogSnackbar = ({pdErrorMessage, dismissPostError}) => {
    return (!pdErrorMessage || pdErrorMessage == "") ? <div></div> :
        <Snackbar
            open={true}
            message={pdErrorMessage}
            autoHideDuration={4000}
            onRequestClose={dismissPostError}
            />;
};

const PostDialogPageSelectRow = ({pdPage, pageSelected, pdPageError, myPages}) => {
    const items = myPages.map((item) => <MenuItem value={item} key={item.id} primaryText={item.name} />);
    return <Row>
        <Col xs={8} md={8}>
            <SelectField
                value={pdPage}
                onChange={(e, k, page) => pageSelected(page)}
                floatingLabelText="Select page..."
                floatingLabelFixed={true}
                errorText={pdPageError ? "This field is required" : ""}
                >
                {items}
            </SelectField>
        </Col>
    </Row>
};

const PostDialogToggleScheduleRow = ({pdScheduled, toggleScheduling}) => <Row>
    <Col xs={3} md={3}>
        <Toggle
            label="Schedule"
            defaultToggled={pdScheduled}
            onToggle={() => toggleScheduling(pdScheduled)}
            />
    </Col>
</Row>;

const PostDialogTextFieldRow = ({pdText, pdTextError, postTextChanged}) => <Row>
    <Col xs={12} md={12}>
        <TextField
            hintText="Write something..."
            value={pdText}
            multiLine={true}
            fullWidth={true}
            rows={4}
            errorText={pdTextError ? "This field is required" : ""}
            rowsMax={6}
            maxLength="420"
            onChange={(e, t) => postTextChanged(t)}
            />
    </Col>
</Row>;

const PostDatePicker = ({pdDate, postDateChanged, pdDateError}) => <DatePicker
    hintText="Select date..."
    value={pdDate}
    onChange={(e, d) => postDateChanged(d)}
    errorText={pdDateError ? "This field is required" : ""}
    />;

const PostTimePicker = ({pdTime, postTimeChanged, pdTimeError}) => <TimePicker
    format="ampm"
    hintText="Select time..."
    value={pdTime}
    onChange={(e, t) => postTimeChanged(t)}
    errorText={pdTimeError ? "This field is required" : ""}
    />;

const PostScheduledTimeRow = (props) => (!props.pdScheduled) ? <Row></Row> : <Row>
    <Col xs={3} md={3}>
        {PostDatePicker(props)}
    </Col>
    <Col xs={3} md={3}>
        {PostTimePicker(props)}
    </Col>
</Row>

const CircularProgressRow = () => <Row>
    <Col xs={6} md={6}>
    </Col>
    <Col xs={6} md={6}>
        <CircularProgress size={100} thickness={5} />
    </Col>
</Row>;

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
        posting: () => dispatch(posting()),
        posted: (post) => dispatch(posted(post)),
        toggleScheduling: (currVal) => dispatch(toggleScheduling(currVal)),
        postError: (errorMessage) => dispatch(postError(errorMessage)),
        dismissPostError: () => dispatch(dismissPostError()),
        formValidated: (pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError) =>
            dispatch(formValidated(pdErrorMessage, pdPageError, pdTextError, pdDateError, pdTimeError))
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(PostDialog)




