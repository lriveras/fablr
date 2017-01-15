import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { expect, should, assert } from 'chai';
import FablrAppBarContainer from '../../app/features/fablr-app-bar/FablrAppBarContainer.jsx';
import reducers from '../../app/reducers.js';
import initialState from '../../app/initial-state.js';
import { onLogin, onLogout } from '../../app/features/fablr-app-bar/fablr-app-bar-actions';

describe('Testing FablrAppBar Component Actions', () => {

    describe('on user login', () => {
        it('dipatches action', (done) => {
            const session = {
                name: 'Name',
                picture: {
                    data: {
                        is_silhouette: false,
                        url: 'https://apicture.testing'
                    }
                },
                id: '10000',
                accessToken: 'EEEEE',
                userID: '10000',
                expiresIn: 1000,
                signedRequest: 'EEEEEEE'
            };
            const action = onLogin(session);
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<FablrAppBarContainer />, store);
            component.props().onLogin(session);
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });

    describe('on user logout', () => {
        it('dipatches action', (done) => {
            const action = onLogout();
            const store = createMockStore(reducers, initialState);
            const component = shallowWithStore(<FablrAppBarContainer />, store);
            component.props().onLogout();
            expect(store.isActionDispatched(action)).to.be.equal(true);
            done();
        });
    });
});
