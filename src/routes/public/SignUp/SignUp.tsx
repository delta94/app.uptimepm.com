import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';

import IntlMessages from '../../../util/IntlMessages';
import { message } from 'antd/lib/index';
import CircularProgress from '../../../components/CircularProgress';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface SignupProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  showAuthLoader: any;
  userSignUp: any;
  showMessage: any;
  hideMessage: any;
  authUser: any;
  loader: any;
  alertMessage: any;
}

interface SignupState {
  email: string;
  password: string;
}

const Signup = (props: SignupProps) => {
  // class Signup extends React.Component<SignupProps, SignupState> {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      // console.log('values', values);
      if (!err) {
        props.showAuthLoader();
        props.userSignUp(values);
      }
    });
  };

  // constructor(props: SignupProps) {
  //   super(props);
  //   state = {
  //     email: 'demo@example.com',
  //     password: 'demo#123',
  //   };
  // }

  // componentDidUpdate() {
  //   if (props.showMessage) {
  //     setTimeout(() => {
  //       props.hideMessage();
  //     }, 100);
  //   }
  //   if (props.authUser !== null) {
  //     props.history.push('/');
  //   }
  // }

  const { getFieldDecorator } = props.form;
  const { showMessage, loader, alertMessage } = props;
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
                <IntlMessages id="app.userAuth.signUp" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
            </div>
            <div className="upm-app-logo">
              <img alt="example" src={require('assets/images/UptimePM-Logo-Dark.svg')} />
            </div>
          </div>

          <div className="upm-app-login-content">
            <Form onSubmit={handleSubmit} className="upm-signup-form upm-form-row0">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ],
                })(<Input placeholder="Username" />)}
              </FormItem>

              <FormItem>
                {getFieldDecorator('email', {
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
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ],
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
                <span className="upm-link upm-signup-form-forgot">
                  <IntlMessages id="appModule.termAndCondition" />
                </span>
              </FormItem>
              <FormItem>
                <Button type="primary" className="upm-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signUp" />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>{' '}
                <Link to="/signin">
                  <IntlMessages id="app.userAuth.signIn" />
                </Link>
              </FormItem>
              {/* <div className="upm-flex-row upm-justify-content-between">
                  <span>or connect with</span>
                  <ul className="upm-social-link">
                    <li>
                      <Icon type="google" onClick={() => {
                        props.showAuthLoader();
                        props.userGoogleSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="facebook" onClick={() => {
                        props.showAuthLoader();
                        props.userFacebookSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="github" onClick={() => {
                        props.showAuthLoader();
                        props.userGithubSignIn();
                      }}/>
                    </li>
                    <li>
                      <Icon type="twitter" onClick={() => {
                        props.showAuthLoader();
                        props.userTwitterSignIn();
                      }}/>
                    </li>
                  </ul>
                </div> */}
            </Form>
          </div>
          {loader && (
            <div className="upm-loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && message.error(alertMessage)}
        </div>
      </div>
    </div>
  );
};

export default Form.create()(Signup);
