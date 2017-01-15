import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { pageSelected, loadPosts } from './page-posts-view-actions.js';
import { postError } from '../post-dialog/post-dialog-actions.js';
import { openInsights, insightMetricLoaded, insightsPresented } from '../insights-dialog/insights-dialog-actions.js';
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
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';



const PagePostsView = (pgPage = {}, myPages, pgPosts, pgPaging,
    onPageSelected, onPageNext, onPagePrev, openInsights) => <div>
        <Grid>
            {NoPagesToShowWarning(myPages)}
            {PageSelectRow(pgPage, myPages, onPageSelected)}
            <Row>
                <Col xs={12} md={12}>
                    {PostTable(pgPosts, pgPaging, onPageNext, onPagePrev, openInsights)}
                </Col>
            </Row>
        </Grid>
    </div>;

const NoPagesToShowWarning = (myPages) => {
    if (!myPages || myPages.length < 1) {
        return <h3>No pages to show...</h3>;
    }
}

const PageSelectRow = (pgPage, myPages, onPageSelected) => {
    if (!myPages || myPages.length < 1) return;
    const items = myPages.map((item) => <MenuItem value={item} key={item.id} primaryText={item.name} />);
    return <Row>
        <Col xs={8} md={8}>
            <SelectField
                value={pgPage}
                onChange={onPageSelected}
                floatingLabelText="Select page..."
                floatingLabelFixed={true}
                >
                {items}
            </SelectField>
        </Col>
    </Row>
};

const PostTable = (pgPosts, pgPaging, onPageNext, onPagePrev, openInsights) => {
    if (!pgPosts || pgPosts.length < 1) return <h3>No posts to show</h3>;
    let postRows = pgPosts.map((post) => PostTableRow(post, openInsights));
    return <Table
        height={"250"}
        fixedHeader={true}
        fixedFooter={true}
        selectable={false}
        multiSelectable={false}
        >
        {PostTableHeader()}
        <TableBody displayRowCheckbox={false}>
            {postRows}
        </TableBody>
        {PostTableFooter(onPageNext, onPagePrev)}
    </Table>
}

const PostTableHeader = () => {
    return <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
        >
        <TableRow>
            <TableHeaderColumn tooltip="Post Message">Message</TableHeaderColumn>
            <TableHeaderColumn tooltip="Post Link">Link</TableHeaderColumn>
            <TableHeaderColumn tooltip="The time when the post was scheduled for creation">Created Time</TableHeaderColumn>
            <TableHeaderColumn tooltip="If the post is already published in the page">Published</TableHeaderColumn>
            <TableHeaderColumn tooltip="Time when the post is scheduled to be published">Scheduled Time</TableHeaderColumn>
            <TableHeaderColumn tooltip="How many people have reacted to this post">Reactions</TableHeaderColumn>
            <TableHeaderColumn tooltip="View insights on the selected post, such as how many impressions the post have">Insights</TableHeaderColumn>
        </TableRow>
    </TableHeader>
}

const PostTableRow = (post, openInsights) => {
    return <TableRow key={post.id} selectable={false}>
        <TableRowColumn>{post.message}</TableRowColumn>
        <TableRowColumn>{post.link}</TableRowColumn>
        <TableRowColumn>{post.created_time}</TableRowColumn>
        <TableRowColumn>{post.is_published ? "Yes" : "No"}</TableRowColumn>
        <TableRowColumn>{post.scheduled_publish_time}</TableRowColumn>
        <TableRowColumn>{post.reactions.summary.total_count}</TableRowColumn>
        <TableRowColumn><FlatButton
            label="Insights"
            primary={true}
            keyboardFocused={false}
            onTouchTap={()=> openInsights(post)}
            /></TableRowColumn>
    </TableRow>
}

const PostTableFooter = (onPageNext, onPagePrev) => {
    return <TableFooter
        adjustForCheckbox={false}
        ><TableRow>
            <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                <FlatButton
                    label="Prev"
                    primary={true}
                    keyboardFocused={false}
                    onTouchTap={onPagePrev}
                    />
                <FlatButton
                    label="Next"
                    primary={true}
                    keyboardFocused={false}
                    onTouchTap={onPageNext}
                    />
            </TableRowColumn>
        </TableRow>
    </TableFooter>;
}

const CircularProgressRow = () => <Row>
    <Col xs={6} md={6}>
    </Col>
    <Col xs={6} md={6}>
        <CircularProgress size={100} thickness={5} />
    </Col>
</Row>;

export default PagePostsView;




