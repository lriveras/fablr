import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { openInsights, insightMetricLoaded, insightsPresented, closeInsights, fetchInsights } from './insights-dialog-actions.js';
import InsightsDialog from './InsightsDialog.jsx';


import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';

class InsightsDialogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onPaidNonPaidMetricLoaded = this.onPaidNonPaidMetricLoaded.bind(this);
        this.onConsumptionsByTypeMetricLoaded = this.onConsumptionsByTypeMetricLoaded.bind(this);
        this.onViralUniqueMetricLoaded = this.onViralUniqueMetricLoaded.bind(this);
        this.onOrganicUniqueMetricLoaded = this.onOrganicUniqueMetricLoaded.bind(this);
        this.onMetricLoaded = this.onMetricLoaded.bind(this);
        this.fetchAllInsights = this.fetchAllInsights.bind(this);
    }
    componentDidUpdate(){
        if(this.props.insightsOpen && this.props.insightsLoading && !this.props.insightsFetching){
            this.fetchAllInsights(this.props.insightsData.post);
            this.props.fetchInsights();
        }
    }
    onPaidNonPaidMetricLoaded(response) {
        const values = response.data[0].values[0].value
        const metric = [];
        if (values.unpaid) metric.push({ name: "Unpaid Impressions", value: values.unpaid });
        if (values.paid) metric.push({ name: "Paid Impressions", value: values.paid });
        this.props.insightMetricLoaded(metric, "paidVsNonPaidImpressions");
        this.onMetricLoaded();
    }
    onConsumptionsByTypeMetricLoaded(response) {
        const values = response.data[0].values[0].value
        const metric = [];
        if (values["other clicks"]) metric.push({ name: "Reactions, comments and shares", value: values["other clicks"] });
        if (values["link clicks"]) metric.push({ name: "Link Clicks", value: values["link clicks"] });
        this.props.insightMetricLoaded(metric, "consumptions");
        this.onMetricLoaded();
    }
    onOrganicUniqueMetricLoaded(response) {
        const dataPoint = response.data[0].values[0].value
        const metric = [];
        if (dataPoint) metric.push({ name: "Organic Impressions", value: dataPoint });
        this.props.insightMetricLoaded(metric, "organicVsViral");
        this.onMetricLoaded();
    }
    onViralUniqueMetricLoaded(response) {
        const dataPoint = response.data[0].values[0].value
        const metric = [];
        if (dataPoint) metric.push({ name: "Viral Impressions", value: dataPoint });
        this.props.insightMetricLoaded(metric, "organicVsViral");
        this.onMetricLoaded();
    }
    onMetricLoaded(){
        if (this.props.insightsData.insightsLoadedCount == 4) {
            this.props.insightsPresented();
        }
    }
    fetchAllInsights(page) {
        let uri = `/${page.id}/insights/post_impressions_organic_unique`;
        FB.api(uri, "GET", {}, (response) => this.onOrganicUniqueMetricLoaded(response));

        uri = `/${page.id}/insights/post_impressions_viral_unique`;
        FB.api(uri, "GET", {}, (response) => this.onViralUniqueMetricLoaded(response));

        //paid non
        uri = `/${page.id}/insights/post_impressions_by_paid_non_paid`;
        FB.api(uri, "GET", {}, (response) => this.onPaidNonPaidMetricLoaded(response));
        //eng
        //consum
        uri = `/${page.id}/insights/post_consumptions_by_type`;
        FB.api(uri, "GET", {}, (response) => this.onConsumptionsByTypeMetricLoaded(response));

        uri = `/${page.id}/insights/post_consumptions_by_type_unique`;
        //eng summary
        // uri = `/${page.id}/insights/post_engaged_users`;
        // uri = `/${page.id}/insights/post_engaged_fan`;
        // uri = `/${page.id}/insights/post_fan_reach`;
        // FB.api(`${uri}/`, "GET", {}, callback);
    }
    render() {
        return InsightsDialog(this.props.insightsOpen, this.props.closeInsights, this.props.insightsData.post.message, this.props.insightsData.post.link,
            this.props.insightsData.insightCharts.paidVsNonPaidImpressions, this.props.insightsData.insightCharts.consumptions, 
            this.props.insightsData.insightCharts.organicVsViral);
    }
}

const mapStateToProps = ({insightsDialogReducer, pagePostsViewReducer}) => {
    return Object.assign({}, insightsDialogReducer, pagePostsViewReducer);
};

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const actions = {
        closeInsights: () => dispatch(closeInsights()),
        fetchInsights: () => dispatch(fetchInsights()),
        insightMetricLoaded: (metric, metricType) => dispatch(insightMetricLoaded(metric, metricType)),
        insightsPresented: () => dispatch(insightsPresented())
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(InsightsDialogContainer)




