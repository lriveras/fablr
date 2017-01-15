import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { expect, should, assert } from 'chai';
import PostDialogContainer from '../../app/features/post-dialog/PostDialogContainer.jsx';
import reducers from '../../app/reducers.js';
import initialState from '../../app/initial-state.js';
import { pageSelected as reselectPostsViewPage, loadPosts } from '../../app/features/page-posts-view/page-posts-view-actions.js';
import {
    closePostDialog, myPagesLoaded,
    pageSelected, postTextChanged, postLinkChanged,
    postDateChanged, postTimeChanged,
    posting, posted, toggleScheduling, postError, dismissPostError, formValidated
} from '../../app/features/post-dialog/post-dialog-actions.js';

describe('Testing PostDialog Component Actions', () => {

    describe('on my pages loaded', () => {
        it('dipatches action', (done) => {
            const pages = [];
            const action = myPagesLoaded(pages);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().myPagesLoaded(pages);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on page selected', () => {
        it('dipatches action', (done) => {
            const page = { id: 152 };
            const action = pageSelected(page);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().pageSelected(page);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on post text change', () => {
        it('dipatches action', (done) => {
            const text = "text";
            const action = postTextChanged(text);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().postTextChanged(text);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on post link change', () => {
        it('dipatches action', (done) => {
            const link = "http://google.com";
            const action = postLinkChanged(link);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().postLinkChanged(link);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on post date change', () => {
        it('dipatches action', (done) => {
            const date = new Date();
            const action = postDateChanged(date);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().postDateChanged(date);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on post time change', () => {
        it('dipatches action', (done) => {
            const time = new Date();
            const action = postTimeChanged(time);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().postTimeChanged(time);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on scheduling toggled', () => {
        it('dipatches action', (done) => {
            const value = true;
            const action = toggleScheduling(value);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().toggleScheduling(value);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on post error', () => {
        it('dipatches action', (done) => {
            const error = "error message";
            const action = postError(error);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().postError(error);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on post validation', () => {
        it('dipatches action', (done) => {
            const action = formValidated(false, false, false, false, false, false);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().formValidated(false, false, false, false, false, false);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on close dialog', () => {
        it('dipatches action', (done) => {
            const action = closePostDialog();
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().closePostDialog();
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on posting', () => {
        it('dipatches action', (done) => {
            const action = posting();
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().posting();
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on posted', () => {
        it('dipatches action', (done) => {
            const post = {id: 111, message: "post"};
            const action = posted(post);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<PostDialogContainer />, store);
            component.props().posted(post);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

});
