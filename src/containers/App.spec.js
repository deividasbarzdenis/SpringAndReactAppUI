import React from 'react';
import {fireEvent, render, waitForElement} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';
import {createStore} from 'redux';
import authReducer from "../redux/authReducer";
import {Provider} from "react-redux";
import axios from "axios";

const setup = (path) => {
    const store = createStore(authReducer);
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[path]}>
                <App/>
            </MemoryRouter>
        </Provider>
    )
};
const changeEvent = (content) => {
    return {
        target: {
            value: content
        }
    };
};

describe('App', () => {
    it('displays homepage when url is /', () => {
        const {queryByTestId} = setup('/');
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });
    it('display LoginPage when url is /login', () => {
        const {container} = setup('/login');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });

    it('display only LoginPage when url is /login', () => {
        const {queryByTestId} = setup('/login');
        expect(queryByTestId('homepage')).not.toBeInTheDocument();
    });

    it('display UserSignupPage when url is /signup', () => {
        const {container} = setup('/signup');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });
    it('displays userpage when url than /, /login or /signup', () => {
        const {queryByTestId} = setup('/user1');
        expect(queryByTestId('userpage')).toBeInTheDocument();
    });

    it('displays  topBar when url is /', () => {
        const {container} = setup('/');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('displays  topBar when url is /login', () => {
        const {container} = setup('/login');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('displays  topBar when url is /signup', () => {
        const {container} = setup('/signup');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('displays  topBar when url is /user1', () => {
        const {container} = setup('/user1');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });

    it('shows the UserSignupPage when clicking signup', () => {
        const {container, queryByText} = setup('/');
        const signupLink = queryByText('Sign Up');
        fireEvent.click(signupLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });

    it('shows the LoginPage when clicking login', () => {
        const {container, queryByText} = setup('/');
        const loginLink = queryByText('Login');
        fireEvent.click(loginLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });

    it('shows the HomePage when clicking the logo', () => {
        const {container, queryByTestId} = setup('/login');
        const logo = container.querySelector('img');
        fireEvent.click(logo);
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });
    it('display My profile on TopBar after login success', async () => {
        const {queryByPlaceholderText, container, queryByText} = setup('/login');
        const usernameInput = queryByPlaceholderText('Your username');
        fireEvent.change(usernameInput, changeEvent('my-user-name'));
        const passwordInput = queryByPlaceholderText('Your password');
        fireEvent.change(passwordInput, changeEvent('P4ssword'));
        const button = container.querySelector('button');
        axios.post = jest.fn().mockResolvedValue({
            data: {
                id: 1,
                username: 'user1',
                displayName: 'display1',
                image: 'profile.png'
            }
        });
        fireEvent.click(button);
        const myProfileLink = await waitForElement(() => queryByText('My Profile'));
        expect(myProfileLink).toBeInTheDocument();
    })
    it('display My profile on TopBar after signup succes', async () => {
        const {queryByPlaceholderText, container, queryByText} = setup('/signup');

        const displayNameInput = queryByPlaceholderText('Your display name');
        const usernameInput = queryByPlaceholderText('Your username');
        const passwordInput = queryByPlaceholderText('Your password');
        const passwordRepeat = queryByPlaceholderText('Repeat your password');

        fireEvent.change(displayNameInput, changeEvent('display1'));
        fireEvent.change(usernameInput, changeEvent('user1'));
        fireEvent.change(passwordInput, changeEvent('P4ssword'));
        fireEvent.change(passwordRepeat, changeEvent('P4ssword'));

        const button = container.querySelector('button');
        axios.post = jest.fn().mockResolvedValue({
            data: {
                message: 'User saved',
            }
        }).mockResolvedValue({
            data: {
                id: 1,
                username: 'user1',
                displayName: 'display1',
                image: 'profile.png'
            }
        })
        fireEvent.click(button);
        const myProfileLink = await waitForElement(() => queryByText('My Profile'));
        expect(myProfileLink).toBeInTheDocument();
    })
});