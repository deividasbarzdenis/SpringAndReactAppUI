import React from 'react';
import { render } from '@testing-library/react';
import UserPage from './UserPage';

describe('UserPage', () => {
    describe('Layout', () => {
        it('it root user page div', () => {
            const {queryByTestId} = render(<UserPage/>);
            const userPageDiv = queryByTestId('userpage');
            expect(userPageDiv).toBeInTheDocument();
        })
    });
});