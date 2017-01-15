import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { openInsights, insightMetricLoaded, insightsPresented, closeInsights } from './insights-dialog-actions.js';
import InsightsDialog from './InsightsDialog.jsx';


import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';

class InsightsDialogContainer extends React.Component {
    constructor(props) {
        super(props);
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
    };
    return Object.assign({}, stateProps, ownProps, actions, dispatchProps);
}

export default connect(
    mapStateToProps,
    null,
    mergeProps
)(InsightsDialogContainer)




