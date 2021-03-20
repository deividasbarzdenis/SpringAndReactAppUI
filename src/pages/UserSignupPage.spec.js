import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';

beforeEach(cleanup);

describe('UserSignupPage', () => {
    describe('Layout', () => {
        // it refers to testing component
        it('has header of Sign Up', () => {
            const { container }= render(<UserSignupPage />)
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });
        it('has input for display name', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>)
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for user name', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>)
            const userNameInput = queryByPlaceholderText('Your user name');
            expect(userNameInput).toBeInTheDocument();
        });
        it('has input for password', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>)
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>)
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for password repeat', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>)
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat).toBeInTheDocument();
        });
        it('has password type for password reRepeatinput', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>)
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeat.type).toBe('password');
        });
        it('has submit button', () => {
            const { container } = render(<UserSignupPage />)
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })
    });

    describe('Interactions', () => {

        const changeEvent = (content) =>{
            return {
                target: {
                    value: content
                }
            }
        };

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve ({});
                    }, 3000)
                })
            })
        }

        let button, displayNameInput, userNameInput, passwordInput, passwordRepeatInput;

        const setupForSubmit = (props) => {
            const rendered = render(
                <UserSignupPage {...props} />);

            const {container, queryByPlaceholderText} = rendered;

            displayNameInput = queryByPlaceholderText('Your display name');
            userNameInput = queryByPlaceholderText('Your user name');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'))
            fireEvent.change(userNameInput, changeEvent('my-user-name'))
            fireEvent.change(passwordInput, changeEvent('P4ssword'))
            fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'))

            button = container.querySelector('button');

            return rendered;
        }
        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>)
            const displayNameInput = queryByPlaceholderText('Your display name')

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));

            expect(displayNameInput).toHaveValue('my-display-name');
        })
        it('sets the userName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>)
            const userNameInput = queryByPlaceholderText('Your user name')

            fireEvent.change(userNameInput, changeEvent('my-user-name'));

            expect(userNameInput).toHaveValue('my-user-name');
        })
        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>)
            const passwordInput = queryByPlaceholderText('Your password')

            fireEvent.change(passwordInput, changeEvent('P4ssword'));

            expect(passwordInput).toHaveValue('P4ssword');
        })
        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage/>)
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password')

            fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

            expect(passwordRepeatInput).toHaveValue('P4ssword');
        })

        it('calls postSignup when the fields are valid and actions are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({actions});

            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        })

        it('does not throw exeception when clicking the button when actions not provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        })

        it('calls post with user body when the fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({actions});
            fireEvent.click(button);
            const expectedUserObject = {
                userName: 'my-user-name',
                displayName: 'my-display-name',
                password: 'P4ssword'
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        })

        it('does not allow user to click the Sign Up button when there is an ongoing api calls', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            }

            setupForSubmit({actions});
            fireEvent.click(button);

            fireEvent.click(button);
            expect(actions.postSignup).toBeCalledTimes(1);
        })

        it('displays spinner when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            }

            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);

            const spinner = queryByText('Loading...')
            expect(spinner).toBeInTheDocument();
        })

        it('hides spinner after api call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            }

            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);

            await waitForDomChange();

            const spinner = queryByText('Loading...')
            expect(spinner).not.toBeInTheDocument();
        })

        it('hides spinner after api call finishes with error', async () => {
            const actions = {
                postSignup:jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: { data: {}}
                            })
                        }, 300);
                    });
                })
            };

            const {queryByText} = setupForSubmit({actions});
            fireEvent.click(button);

            await waitForDomChange();

            const spinner = queryByText('Loading...')
            expect(spinner).not.toBeInTheDocument();
        })
    });

});

console.error = () => {};