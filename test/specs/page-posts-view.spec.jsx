import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { expect, should, assert } from 'chai';
import PagePostsViewContainer from '../../app/features/page-posts-view/PagePostsViewContainer.jsx';
import reducers from '../../app/reducers.js';
import initialState from '../../app/initial-state.js';
import { pageSelected, loadPosts } from '../../app/features/page-posts-view/page-posts-view-actions.js';
import { postError } from '../../app/features/post-dialog/post-dialog-actions.js';
import { openInsights } from '../../app/features/insights-dialog/insights-dialog-actions.js';

describe('Testing PagePostsView Component Actions', () => {

    describe('on page selected', () => {
        it('dipatches action', (done) => {
            const page = {id:152};
            const action = pageSelected(page);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PagePostsViewContainer />, store);
            component.props().pageSelected(page);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on load posts', () => {
        it('dipatches action', (done) => {
            const postResponse = { data: [], paging: {next:"link", prev:"link"} };
            const action = loadPosts(postResponse);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PagePostsViewContainer />, store);
            component.props().loadPosts(postResponse);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on load error', () => {
        it('dipatches action', (done) => {
            const error = "error message";
            const action = postError(error);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PagePostsViewContainer />, store);
            component.props().postError(error);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });
});
