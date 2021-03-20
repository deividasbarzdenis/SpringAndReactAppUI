import React from 'react';
import Input from '../components/input';

export class UserSignupPage extends React.Component {
    state = {
        displayName: '',
        userName: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
        errors: {}
    }

    onChangeDisplayName = (e) => {
        const value = e.target.value;
        this.setState({displayName: value})
    }

    onChangeUserName = (e) => {
        const value = e.target.value;
        this.setState({userName: value})
    }
    onChangePassword = (e) => {
        const value = e.target.value;
        this.setState({password: value})
    }
    onChangePasswordRepeat = (e) => {
        const value = e.target.value;
        this.setState({passwordRepeat: value})
    }

    onClickSignup = () => {
        const user = {
            displayName: this.state.displayName,
            userName: this.state.userName,
            password: this.state.password,
        };
        this.setState({pendingApiCall: true});
        this.props.actions
            .postSignup(user)
            .then((response) => {
                this.setState({pendingApiCall: false})
            }).catch((apiError) => {
            let errors = {...this.state.errors}
            if (apiError.response.data && apiError.response.data.validationError){
                errors = {...apiError.response.data.validationError};
            }
            this.setState({pendingApiCall: false})
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Display Name"
                        placeholder="Your display name"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>Display User Name</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Your user name"
                           value={this.state.userName}
                           onChange={this.onChangeUserName}/>
                </div>
                <div className="col-12 mb-3">
                    <label>Password</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Your password"
                           value={this.state.password}
                           onChange={this.onChangePassword}/>
                </div>
                <div className="col-12 mb-3">
                    <label>Password Repeat</label>
                    <input type="password"
                           className="form-control"
                           placeholder="Repeat your password"
                           value={this.state.passwordRepeat}
                           onChange={this.onChangePasswordRepeat}/>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary"
                            onClick={this.onClickSignup}
                            disabled={this.state.pendingApiCall}>
                        {this.state.pendingApiCall && (<div className="spinner-border text-light spinner-border-sm mr-sm-1">
                            <span className="sr-only">Loading...</span>
                        </div>)}
                        Sign Up</button>
                </div>
            </div>
        );
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({})
            })
    }
};

export default UserSignupPage;