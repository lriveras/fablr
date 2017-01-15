import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { expect, should, assert } from 'chai';
import InsightsDialog from '../../app/features/insights-dialog/InsightsDialogContainer.jsx';
import reducers from '../../app/reducers.js';
import initialState from '../../app/initial-state.js';
import { insightMetricLoaded, insightsPresented, closeInsights, fetchInsights } from '../../app/features/insights-dialog/insights-dialog-actions.js';

describe('Testing InsightsDialog Component Actions', () => {

    describe('on metric loaded', () => {
        it('dipatches action', (done) => {
            const metric = {value:"50", name:"paid_impression"};
            const metricType = "paidVsNonPaid";
            const action = insightMetricLoaded(metric, metricType);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<InsightsDialog />, store);
            component.props().insightMetricLoaded(metric, metricType);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on insights presented', () => {
        it('dipatches action', (done) => {
            const action = insightsPresented();
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<InsightsDialog />, store);
            component.props().insightsPresented();
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on close insights dialog', () => {
        it('dipatches action', (done) => {
            const action = closeInsights();
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<InsightsDialog />, store);
            component.props().closeInsights();
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on fetch insights', () => {
        it('dipatches action', (done) => {
            const action = fetchInsights();
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<InsightsDialog />, store);
            component.props().fetchInsights();
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

});
