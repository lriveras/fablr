import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    closePostDialog, openPostDialog, myPagesLoaded,
    pageSelected, postTextChanged, postLinkChanged,
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

const PostDialog = ({
    postDialog, 
    pdPosting, 
    closePostDialog, 
    pdErrorMessage, 
    dismissPostError, 
    pdPost, 
    pdPage, 
    pageSelected, 
    pdLoading,
    pdPageError, 
    myPages, 
    pdScheduled, 
    toggleScheduling, 
    pdText, 
    pdTextError, 
    postTextChanged, 
    pdLink, 
    pdLinkError, 
    postLinkChanged,
    pdDate, 
    postDateChanged, 
    pdDateError,
    pdTime, 
    postTimeChanged, 
    pdTimeError}, 
    onValidate,
    ) => {

    const PostForm = () => {
        return (pdLoading || pdPosting) ? CircularProgressRow() :
            <div>
                {PostDialogPageSelectRow()}
                {PostDialogTextFieldRow()}
                {PostDialogLinkFieldRow()}
                {PostDialogToggleScheduleRow()}
                {PostScheduledTimeRow()}
            </div>;
    };

    const PostDialogActions = () => [
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

    const PostDialogSnackbar = () => {
        let posted = (pdPost && pdPost.id), error = (pdErrorMessage && pdErrorMessage != "")
        let message = error ? pdErrorMessage : posted ? "Posted successfully to Facebook page " + pdPage.name : "";
        return !error && !posted ? <div></div> :
            <Snackbar
                open={true}
                message={message}
                autoHideDuration={4000}
                onRequestClose={dismissPostError}
                />;
    };

    const PostDialogPageSelectRow = () => {
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

    const PostDialogToggleScheduleRow = () => <Row>
        <Col xs={3} md={3}>
            <Toggle
                label="Schedule"
                defaultToggled={pdScheduled}
                onToggle={() => toggleScheduling(pdScheduled)}
                />
        </Col>
    </Row>;

    const PostDialogTextFieldRow = () => <Row>
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

    const PostDialogLinkFieldRow = () => <Row>
        <Col xs={12} md={12}>
            <TextField
                hintText="Paste some link..."
                value={pdLink}
                multiLine={false}
                fullWidth={true}
                rows={1}
                errorText={pdLinkError ? "This field is required" : ""}
                rowsMax={1}
                maxLength="420"
                onChange={(e, t) => postLinkChanged(t)}
                />
        </Col>
    </Row>;

    const PostDatePicker = () => <DatePicker
        hintText="Select date..."
        value={pdDate}
        onChange={(e, d) => postDateChanged(d)}
        errorText={pdDateError ? "This field is required" : ""}
        />;

    const PostTimePicker = () => <TimePicker
        format="ampm"
        hintText="Select time..."
        value={pdTime}
        onChange={(e, t) => postTimeChanged(t)}
        errorText={pdTimeError ? "This field is required" : ""}
        />;

    const PostScheduledTimeRow = () => (!pdScheduled) ? <Row></Row> : <Row>
        <Col xs={3} md={3}>
            {PostDatePicker()}
        </Col>
        <Col xs={3} md={3}>
            {PostTimePicker()}
        </Col>
    </Row>

    const CircularProgressRow = () => <Row>
        <Col xs={6} md={6}>
        </Col>
        <Col xs={6} md={6}>
            <CircularProgress size={100} thickness={5} />
        </Col>
    </Row>;

    return <div>
        <Grid>
            <Dialog
                title="Page Post"
                actions={PostDialogActions()}
                modal={true}
                open={postDialog}
                onRequestClose={closePostDialog}
                >
                {PostForm()}
            </Dialog>
        </Grid>
        {PostDialogSnackbar()}
    </div>;
}

export default PostDialog;




