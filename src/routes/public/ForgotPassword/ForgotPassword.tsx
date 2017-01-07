import React, { FormEvent } from 'react';
import { useForgotPasswordMutation, ForgotPasswordInput } from 'generated';
import { Button, Form, Input, message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import signinImg from 'assets/images/signin/Signin-303x395.jpg';
import logo from 'assets/images/UptimePM-Logo-Dark.svg';
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

const ForgotPassword = (props: ISigninProps) => {
  const [forgotPass] = useForgotPasswordMutation();
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: ForgotPasswordInput) => {
      if (err) {
        return false;
      }

      const result = await forgotPass({ variables: { data: values } });

      if (result && result.data) {
        const status = result.data.forgotPassword.status;
        if (status) {
          message.success('An email has been sent to ' + values.email);
        } else {
          message.error('There is no user with that email address, please try again');
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
                <Trans defaults="Forgot Password">Forgot Password</Trans>
              </h1>
              <p>
                <Trans defaults="Please insert your email to reset you password.">Please insert your email to reset you password.</Trans>
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
                <Button type="primary" className="upm-mb-0" htmlType="submit">
                  <Trans defaults="Reset">Reset</Trans>
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(ForgotPassword);
