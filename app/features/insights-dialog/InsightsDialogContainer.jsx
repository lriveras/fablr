import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { openInsights, insightMetricLoaded, insightsPresented, closeInsights } from './insights-dialog-actions.js';
import { bindActionCreators } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'
import InsightsDialog from './InsightsDialog.jsx';


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



class InsightsDialogContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const pieData = [
            { label: 'Paid', value: 40 },
            { label: 'Non Paid', value: 150 }
        ];
        const total = 190;
        var barData = [
            {
                "name": "Duplicates",
                "values": [
                    { "x": "Paid", "y": 91 },
                    { "x": "Non Paid", "y": 290 }
                ]
            },
            {
                "name": "Unique",
                "values": [
                    { "x": "Paid", "y": 91 },
                    { "x": "Non Paid", "y": 290 }
                ]
            }
        ];
        var barDataUnique = [
            {
                "name": "Non-Paid vs Paid Unique Impressions",
                "values": [
                    { "x": "Paid", "y": 91 },
                    { "x": "Non Paid", "y": 290 }
                ]
            }
        ];
        const open = this.props.insightsOpen, onClose = this.props.closeInsights, selectedTabValue = "imp", onTabChange = () => { };
        return InsightsDialog(open, onClose, selectedTabValue, onTabChange, this.props.insightsData.post.message, this.props.insightsData.post.link,
            this.props.insightsData.insightCharts.paidVsNonPaidImpressions, this.props.insightsData.insightCharts.consumptions, 
            this.props.insightsData.insightCharts.organicVsViral, barData);
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




