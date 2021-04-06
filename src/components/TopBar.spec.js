import {render} from '@testing-library/react';
import TopBar from './TopBar';
import {MemoryRouter} from 'react-router-dom';
import React from "react";

const setup = (path) => {
    return render(
        <>
            <MemoryRouter initialEntries={[path]}>
                <TopBar/>
            </MemoryRouter>
        </>
    )
};

describe('TopBar', () => {
    describe('Layout', () => {
        it('has application logo', () => {
            const {container} = setup('/');
            const image = container.querySelector('img');
            expect(image.src).toContain('hoaxify-logo.png')
        });
        it('has link to home from logo', () => {
            const {container} = setup('/');
            const image = container.querySelector('img');
            expect(image.parentElement.getAttribute('href')).toBe('/')
        });
        it('has link to signup', () => {
            const {queryByText} = setup('/signup');
            const signupLink = queryByText('Sign Up');
            expect(signupLink.getAttribute('href')).toBe('/signup');
        });
        it('has link to login', () => {
            const {queryByText} = setup('/login');
            const loginLink = queryByText('Login');
            expect(loginLink.getAttribute('href')).toBe('/login');
        });
    });
});