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



class PostDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onPageSelected = this.onPageSelected.bind(this);
        this.onPageNext = this.onPageNext.bind(this);
        this.onPagePrev = this.onPagePrev.bind(this);
        this.onInsightMetricLoaded = this.onInsightMetricLoaded.bind(this);
        this.fetchAllInsights = this.fetchAllInsights.bind(this);
    }
    onPageSelected(e, k, page) {
        const uri = "/" + page.id + "/promotable_posts?fields=reactions.summary(true),message,link,scheduled_publish_time,is_published,created_time"
        this.props.pageSelected(page);
        const callback = (response) => {
            console.log(response);
            if (response && !response.error) this.props.loadPosts(response);
            else this.props.postError("Oops! Something went wrong while loading the posts, please try again.");
        }
        FB.api(uri, "GET", {}, callback);

    }
    onPageNext() {
        const uri = this.props.pgPaging.next.split("v2.8")[1];
        const callback = (response) => {
            console.log(response);
            if (response && !response.error && response.data.length > 0) this.props.loadPosts(response);
            else this.props.postError("There are no more posts to load.");
        }
        FB.api(uri, "GET", {}, callback);
    }
    onPagePrev() {
        const uri = this.props.pgPaging.previous.split("v2.8")[1];
        const callback = (response) => {
            console.log(response);
            if (response && !response.error && response.data.length > 0) this.props.loadPosts(response);
            else this.props.postError("There are no more posts to load.");
        }
        FB.api(uri, "GET", {}, callback);
    }
    onInsightMetricLoaded(response) {
        const responseData = response.data[0];
        if (responseData.name == "post_impressions_by_paid_non_paid") {
            const values = responseData.values[0].value
            const metric = [];
            if (values.unpaid) metric.push({ name: "Unpaid Impressions", value: values.unpaid });
            if (values.paid) metric.push({ name: "Paid Impressions", value: values.paid });
            this.props.insightMetricLoaded(metric, "paidVsNonPaidImpressions");
        }
        else if (responseData.name == "post_consumptions_by_type") {
            const values = responseData.values[0].value
            const metric = [];
            if (values["other clicks"]) metric.push({ name: "Reactions, comments and shares", value: values["other clicks"] });
            if (values["link clicks"]) metric.push({ name: "Link Clicks", value: values["link clicks"] });
            this.props.insightMetricLoaded(metric, "consumptions");
        }
        else if (responseData.name == "post_impressions_organic_unique") {
            const dataPoint = responseData.values[0].value
            const metric = [];
            if (dataPoint) metric.push({ name: "Organic Impressions", value: dataPoint });
            this.props.insightMetricLoaded(metric, "organicVsViral");
        }
        else if (responseData.name == "post_impressions_viral_unique") {
            const dataPoint = responseData.values[0].value
            const metric = [];
            if (dataPoint) metric.push({ name: "Viral Impressions", value: dataPoint });
            this.props.insightMetricLoaded(metric, "organicVsViral");
        }
        if (this.props.insightsData.insightsLoadedCount == 4) {
            this.props.insightsPresented();
        }
    }
    fetchAllInsights(page) {

        let uri = `/${page.id}/insights/post_impressions_organic_unique`;
        FB.api(uri, "GET", {}, (response) => this.onInsightMetricLoaded(response));

        uri = `/${page.id}/insights/post_impressions_viral_unique`;
        FB.api(uri, "GET", {}, (response) => this.onInsightMetricLoaded(response));

        //paid non
        uri = `/${page.id}/insights/post_impressions_by_paid_non_paid`;
        FB.api(uri, "GET", {}, (response) => this.onInsightMetricLoaded(response));
        //eng
        //consum
        uri = `/${page.id}/insights/post_consumptions_by_type`;
        FB.api(uri, "GET", {}, (response) => this.onInsightMetricLoaded(response));

        uri = `/${page.id}/insights/post_consumptions_by_type_unique`;
        //eng summary
        // uri = `/${page.id}/insights/post_engaged_users`;
        // uri = `/${page.id}/insights/post_engaged_fan`;
        // uri = `/${page.id}/insights/post_fan_reach`;
        // FB.api(`${uri}/`, "GET", {}, callback);
    }
    render() {
        return PagePostGrid(this.props, this.onPageSelected, this.onPageNext, this.onPagePrev, this.fetchAllInsights, this.props.openInsights);
    }
}

const PagePostGrid = (props, onPageSelected, onPageNext, onPagePrev, fetchAllInsights, openInsights) => <div>
    <Grid>
        {NoPagesToShowWarning(props)}
        {PageSelectRow(props, onPageSelected)}
        <Row>
            <Col xs={12} md={12}>
                {PostTable(props, onPageNext, onPagePrev, fetchAllInsights, openInsights)}
            </Col>
        </Row>
    </Grid>
</div>;

const NoPagesToShowWarning = ({myPages}) => {
    if (!myPages || myPages.length < 1) {
        return <p>No pages to show...</p>;
    }
}

const PageSelectRow = ({pgPage = {}, myPages}, onPageSelected) => {
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

const PostTable = ({pgPosts, pgPaging}, onPageNext, onPagePrev, fetchAllInsights, openInsights) => {
    if (!pgPosts || pgPosts.length < 1) return <p>No posts to show</p>;
    let postRows = pgPosts.map((post) => PostTableRow(post, fetchAllInsights, openInsights));
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

const PostTableRow = (post, fetchAllInsights, openInsights) => {
    const onInsightsClick = (p) => {
        return () => { openInsights(p); fetchAllInsights(p) };
    }
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
            onTouchTap={onInsightsClick(post)}
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

const mapStateToProps = ({postDialogReducer, pagePostsViewReducer, insightsDialogReducer}) => {
    return Object.assign({}, postDialogReducer, pagePostsViewReducer, insightsDialogReducer);
};

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const actions = {
        pageSelected: (page) => dispatch(pageSelected(page)),
        loadPosts: (postsResponse) => dispatch(loadPosts(postsResponse)),
        postError: (errorMessage) => dispatch(postError(errorMessage)),
        openInsights: (post) => dispatch(openInsights(post)),
        insightMetricLoaded: (metric, metricType) => dispatch(insightMetricLoaded(metric, metricType)),
        insightsPresented: () => dispatch(insightsPresented())
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(PostDialog)




