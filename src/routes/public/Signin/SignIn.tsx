import React, { FormEvent } from 'react';
// import * as React from 'react';
import { useSigninMutation, MutationSigninArgs, RoleTypeEnum } from 'generated/index';

import { Button, Form, Input, message } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Trans } from '@lingui/macro';

import { WrappedFormUtils } from 'antd/lib/form/Form';
import signinImg from 'assets/images/signin/Signin-303x395.jpg';
import logo from 'assets/images/UptimePM-Logo-Dark.svg';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

const FormItem = Form.Item;

interface ISigninProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  showAuthLoader: any;
  userSignIn: any;
  showMessage: boolean;
  hideMessage: any;
  authUser: any;
  loader: any;
  alertMessage: any;
}

const Signin = (props: ISigninProps) => {
  const [state] = React.useState({
    redirectUrl: props.location && props.location.state && props.location.state.from ? props.location.state.from.pathname : '',
  });

  const [signin] = useSigninMutation();
  const userContext = React.useContext(CurrentUserContext);
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: MutationSigninArgs) => {
      if (err) {
        message.error(err);
        return false;
      }
      const result = await signin({
        variables: { ...values },
      });

      // debugger;

      // if (result && result.errors) {
      //   result.errors.map(({ message: msg, locations, path }) => {
      //     message.error(msg);
      //     return false;
      //   });
      // }

      if (result && result.data) {
        form.resetFields();
        const data = result.data.signin;
        if (userContext) {
          userContext.onLogin(data.user, data.token);
        }
        userContext.user = data.user;

        const isUserCorporate = data.user.roles.findIndex(x => x.type === RoleTypeEnum.Corporate) !== -1 ? true : false;

        if (state.redirectUrl !== '') {
          const isUrlCorporate = state.redirectUrl.indexOf('corporate') !== -1;
          if (isUserCorporate && isUrlCorporate) {
            // corp
            return props.history.push(state.redirectUrl);
          } else if (!isUserCorporate && !isUrlCorporate) {
            // client
            console.log('I am heer');
            return props.history.push(state.redirectUrl);
          }
        }

        if (isUserCorporate) {
          return props.history.push('/corporate/equipment');
        } else {
          return props.history.push('/client/dashboard');
        }
      }
    });
  };

  return (
    <div className="upm-app-login-wrap">
      <div className="upm-app-login-container">
        <div className="upm-app-login-main-content">
          <div className="upm-app-logo-content">
            <div className="upm-app-logo-content-bg">
              <img src={signinImg} alt="UptimePM LLC" />
            </div>
            <div className="upm-app-logo-wid">
              <h1>
                <Trans defaults="Sign In">Sign In</Trans>
              </h1>
              <p>
                <Trans defaults="By Signing In, you can access all features of our services.">
                  By Signing In, you can access all features of our services.
                </Trans>
              </p>
              <p>
                <Trans defaults="Register an Account.">Register an Account</Trans>
              </p>
            </div>
            <div className="upm-app-logo">
              <img alt="example" src={logo} />
            </div>
          </div>
          <div className="upm-app-login-content">
            <Form onSubmit={handleSubmit} className="upm-signin-form upm-form-row0">
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
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(<Input type="password" placeholder="Password" />)}
              </FormItem>
              <FormItem>
                <Button type="primary" className="upm-mb-0" htmlType="submit">
                  <Trans defaults="Sign In...">Sign In...</Trans>
                </Button>
                <Link to="/signup">
                  <Trans defaults="Sign Up">Sign Up</Trans>
                </Link>
              </FormItem>
              <FormItem>
                <Link to="forgot-password">
                  <Trans defaults="Forgot Password">Forgot Password</Trans>
                </Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(Signin);
