import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { pageSelected, loadPosts } from './page-posts-view-actions.js';
import { postError } from '../post-dialog/post-dialog-actions.js';
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



class PostDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onPageSelected = this.onPageSelected.bind(this);
    }
    onPageSelected(e, k, page){
        const uri = "/" + page.id + "/promotable_posts?fields=reactions.summary(true),message,link,scheduled_publish_time,is_published,created_time"
        this.props.pageSelected(page);
        const callback = (response) => {
            console.log(response);
            if (response && !response.error) this.props.loadPosts(response);
            else this.props.postError("Oops! Something went wrong while loading the posts, please try again.");
        }
        FB.api(uri, "GET", { }, callback);

    }
    render() {
        return PagePostGrid(this.props, this.onPageSelected);
    }
}

const PagePostGrid = (props, onPageSelected) => <div>
    <Grid>
        {NoPagesToShowWarning(props)}
        {PageSelectRow(props, onPageSelected)}
        <Row>
            <Col xs={12} md={12}>
                {PostTable(props)}
            </Col>
        </Row>
    </Grid>
</div>;

const NoPagesToShowWarning = ({myPages}) => {
    if(!myPages || myPages.length < 1){
        return <p>No pages to show...</p>;
    }
}

const PageSelectRow = ({pgPage = {}, myPages}, onPageSelected) => {
    if(!myPages || myPages.length < 1) return;
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

const PostTable = ({pgPosts, pgPaging}) => {
    if(!pgPosts || pgPosts.length < 1) return <p>No posts to show</p>;
    let postRows = pgPosts.map((post) => PostTableRow(post));
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
        {PostTableFooter()}
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

const PostTableRow = (post) => {
return <TableRow key={post.id} selectable={false}>
        <TableRowColumn>{post.message}</TableRowColumn>
        <TableRowColumn>{post.link}</TableRowColumn>
        <TableRowColumn>{post.created_time}</TableRowColumn>
        <TableRowColumn>{post.is_published?"Yes":"No"}</TableRowColumn>
        <TableRowColumn>{post.scheduled_publish_time}</TableRowColumn>
        <TableRowColumn>{post.reactions.summary.total_count}</TableRowColumn>
        <TableRowColumn><FlatButton
            label="Insights"
            primary={true}
            keyboardFocused={false}
            onTouchTap={() => { } }
            /></TableRowColumn>
    </TableRow>
}

const PostTableFooter = () => {
    return <TableFooter
        adjustForCheckbox={false}
        ><TableRow>
            <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                Back Next
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

const mapStateToProps = ({postDialogReducer, pagePostsViewReducer}) => {
    return Object.assign({}, postDialogReducer, pagePostsViewReducer) ;
};

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const actions = { 
        pageSelected: (page) => dispatch(pageSelected(page)),
        loadPosts: (postsResponse) => dispatch(loadPosts(postsResponse)),
        postError: (errorMessage) => dispatch(postError(errorMessage))
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(PostDialog)




