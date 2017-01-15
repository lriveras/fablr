
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
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
import { Tabs, Tab } from 'material-ui/Tabs';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';

import { BarChart } from 'rd3';
import { fullWhite } from 'material-ui/styles/colors';
import { PieChart, Pie, Legend, Tooltip, Text } from 'recharts'



const InsightsDialog = (open, onClose, selectedTabValue, onTabChange, message, link,
    impressionsData, consData, organicVsViralData, reachData) => {


    const dialog = <div>
        <Dialog
            title="Post Insights"
            actions={<FlatButton
                label="Close"
                onTouchTap={onClose}
                />}
            modal={true}
            open={open}
            onRequestClose={onClose}
            autoScrollBodyContent={true}
            >
            <Row>
                <Col xs={6} md={12} lg={12}>
                    Post: {message}
                    <br /><br />
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={12} lg={12}>
                    Link: {link}
                    <br /><br />
                </Col>
            </Row>
            {InsightsCharts(selectedTabValue, onTabChange, impressionsData, consData,
                organicVsViralData, reachData)}

        </Dialog>
    </div>;
    return dialog;
}

const BarChartWrapper = (data, width, height, title, xAxisLabel, yAxisLabel, legend) =>
    <BarChart
        data={data}
        width={width}
        height={height}
        title={title}
        xAxisClassName={{ width: 100 }}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        legend={legend}
        />;
const PieChartWrapper = (data, width, height, radius, innerRadius, title) =>
    <PieChart
        data={data}
        width={width}
        height={height}
        radius={radius}
        innerRadius={innerRadius}
        sectorBorderColor="white"
        valueTextFormatter={(val) => val}
        title={title}
        />;
const RechartPieChartWrapper = (data, width, height, radius, innerRadius, title) =>
    <PieChart width={width} height={height}>
        <Pie isAnimationActive={true} data={data} cx={width * 3 / 4} cy={height / 2} outerRadius={radius} fill="#20adcd" label={title} />
        <Legend verticalAlign="middle" align="left" iconSize="18" height={36} layout="vertical"/>
        <Tooltip />
    </PieChart>;

const InsightsCharts = (selectedTabValue, onTabChange, impressionsData, consData, organicVsViralData, reachData) => {
    const width = 500, height = 200, radius = 80, innerRadius = 10;
    const xAxisLabel = "", yAxisLabel = "Impressions", legend = true, width2 = 500;
    return <Row>
        <Col xs={12} md={12}>
            {impressionsData.length > 0? RechartPieChartWrapper(impressionsData, width2, height, radius, innerRadius, "Impressions Summary") : <div/> }<br/><br/>
            {consData.length > 0? RechartPieChartWrapper(consData, width2, height, radius, innerRadius, "Impressions Summary") : <div/> }<br/><br/>
            {organicVsViralData.length > 0? RechartPieChartWrapper(organicVsViralData, width2, height, radius, innerRadius, "Impressions Summary") : <div/> }
        </Col>
    </Row>;
};

export default InsightsDialog;