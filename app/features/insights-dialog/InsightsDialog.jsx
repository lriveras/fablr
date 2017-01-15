
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
import { fullWhite } from 'material-ui/styles/colors';
import { PieChart, Pie, Legend, Tooltip, Text } from 'recharts'



const InsightsDialog = (open, onClose, message, link,
    impressionsData, consData, organicVsViralData) => {
    return <div>
        <Dialog
            actions={<FlatButton
                label="Close"
                onTouchTap={onClose}
                />}
            modal={true}
            open={open}
            onRequestClose={onClose}
            autoScrollBodyContent={true}
            >
            <h1>Post Insights</h1>
            <Row>
                <Col xs={6} md={10} lg={10}>
                    {message? <div><h2>Post</h2> {message} <br /><br /></div> : <div/>}
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={10} lg={10}>
                    {link? <div><h2>Link</h2> <a href={link}>{link}</a> <br /><br /></div> : <div/>}
                </Col>
            </Row>
            {InsightsCharts(impressionsData, consData,
                organicVsViralData)}
        </Dialog>
    </div>;
}

const RechartPieChartWrapper = (data, width, height, radius, innerRadius, title) =>
    <div>
        <h2 className={{ align: 'center' }}>{title}</h2>
        <PieChart width={width} height={height}>
            <Pie isAnimationActive={true} data={data} cx={width * 3 / 4} cy={height / 2} outerRadius={radius} fill="#20adcd" label={title} />
            <Legend verticalAlign="middle" align="left" iconSize="18" height={36} layout="vertical" />
            <Tooltip />
        </PieChart>
    </div>;

const InsightsCharts = (impressionsData, consData, organicVsViralData, reachData) => {
    const width = 500, height = 200, radius = 80, innerRadius = 10;
    return <Row>
        <Col xs={12} md={12}>
            {impressionsData.length > 0 ? RechartPieChartWrapper(impressionsData, width, height, radius, innerRadius, "Impressions Summary") : <h3>No Impression Summary Available</h3>}<br /><br />
            {consData.length > 0 ? RechartPieChartWrapper(consData, width, height, radius, innerRadius, "Consumptions Summary") : <h3>No Consumptions Summary Available</h3>}<br /><br />
            {organicVsViralData.length > 0 ? RechartPieChartWrapper(organicVsViralData, width, height, radius, innerRadius, "Reach Summary") : <h3>No Reach Summary Available</h3>}
        </Col>
    </Row>;
};

export default InsightsDialog;