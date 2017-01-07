import React from 'react';
import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';

import IntlMessages from '../util/IntlMessages';
import CircularProgress from '../components/CircularProgress/index';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface SignInProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  showAuthLoader: any;
  userSignIn: any;
  showMessage: boolean;
  hideMessage: any;
  authUser: any;
  loader: any;
  alertMessage: any;
  userGoogleSignIn: any;
  userFacebookSignIn: any;
  userGithubSignIn: any;
  userTwitterSignIn: any;
}

class SignIn extends React.Component<SignInProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.showAuthLoader();
        // this.props.userSignIn(values);
      }
    });
  };

  componentDidUpdate() {
    // if (this.props.showMessage) {
    //   setTimeout(() => {
    //     this.props.hideMessage();
    //   }, 100);
    // }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const {showMessage, loader, alertMessage} = this.props;

    return (
      <div className="upm-app-login-wrap">
        <div className="upm-app-login-container">
          <div className="upm-app-login-main-content">
            <div className="upm-app-logo-content">
              <div className="upm-app-logo-content-bg">
                <img src="https://via.placeholder.com/272x395" alt="Neature" />
              </div>
              <div className="upm-app-logo-wid">
                <h1>
                  <IntlMessages id="app.userAuth.signIn" />
                </h1>
                <p>
                  <IntlMessages id="app.userAuth.bySigning" />
                </p>
                <p>
                  <IntlMessages id="app.userAuth.getAccount" />
                </p>
              </div>
              <div className="upm-app-logo">
                <img alt="example" src={require('../assets/images/UptimePM-Logo-Dark.svg')} />
              </div>
            </div>
            <div className="upm-app-login-content">
              <Form onSubmit={this.handleSubmit} className="upm-signin-form upm-form-row0">
                <FormItem>
                  {getFieldDecorator('email', {
                    initialValue: 'demo@example.com',
                    rules: [
                      {
                        required: true,
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                    ],
                  })(<Input placeholder="Email" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    initialValue: 'demo#123',
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(<Input type="password" placeholder="Password" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>
                      <IntlMessages id="appModule.iAccept" />
                    </Checkbox>
                  )}
                  <span className="upm-signup-form-forgot upm-link">
                    <IntlMessages id="appModule.termAndCondition" />
                  </span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="upm-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>{' '}
                  <Link to="/signup">
                    <IntlMessages id="app.userAuth.signUp" />
                  </Link>
                </FormItem>
                <div className="upm-flex-row upm-justify-content-between">
                  <span>or connect with</span>
                  <ul className="upm-social-link">
                    <li>
                      <Icon
                        type="google"
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userGoogleSignIn();
                        }}
                      />
                    </li>
                    <li>
                      <Icon
                        type="facebook"
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userFacebookSignIn();
                        }}
                      />
                    </li>
                    <li>
                      <Icon
                        type="github"
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userGithubSignIn();
                        }}
                      />
                    </li>
                    <li>
                      <Icon
                        type="twitter"
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userTwitterSignIn();
                        }}
                      />
                    </li>
                  </ul>
                </div>
                <span className="upm-text-light upm-fs-sm"> demo user email: 'demo@example.com' and password: 'demo#123'</span>
              </Form>
            </div>

            {/* {loader ?
              <div className="upm-loader-view">
                <CircularProgress/>
              </div> : null}
            {showMessage ?
              message.error(alertMessage.toString()) : null} */}
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

export default WrappedNormalLoginForm;
