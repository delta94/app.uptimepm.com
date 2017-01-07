import React, { FormEvent } from 'react';
import { useResetPasswordMutation, ResetPasswordInput } from 'generated';
import { Button, Form, Input, message } from 'antd';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import signinImg from 'assets/images/signin/Signin-303x395.jpg';
import logo from 'assets/images/UptimePM-Logo-Dark.svg';
import './resetPassword.scss';
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

const ResetPassword = (props: ISigninProps) => {
  const token = props.match.params.token;
  // console.log(token);
  const [resetPass] = useResetPasswordMutation();
  const { getFieldDecorator } = props.form;

  const [state, setState] = React.useState({ confirmDirty: false, autoCompleteResult: [] });

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: ResetPasswordInput) => {
      if (err) {
        return false;
      }

      const result = await resetPass({ variables: { data: values } });

      if (result && result.data) {
        const status = result.data.resetPassword.status;
        if (status) {
          message.success('Your password was updated successfully. Redirecting...');
          setTimeout(() => props.history.push('/signin'), 1000);
        } else {
          message.error('Something went wrong. Please try again');
        }
      }
    });
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = props;
    if (value && state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    setState({ ...state, confirmDirty: state.confirmDirty || !!value });
  };

  return (
    <div className="upm-app-login-wrap reset-password">
      <div className="upm-app-login-container">
        <div className="upm-app-login-main-content">
          <div className="upm-app-logo-content">
            <div className="upm-app-logo-content-bg">
              <img src={signinImg} alt="UptimePM LLC" />
            </div>
            <div className="upm-app-logo-wid">
              <h1>
                <Trans defaults="Reset Password">Reset Password</Trans>
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
              {getFieldDecorator('token', {
                initialValue: token,
              })(<Input placeholder="token" type="hidden" />)}

              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={handleConfirmBlur} />)}
              </Form.Item>

              <FormItem>
                <Button type="primary" className="upm-mb-0" htmlType="submit">
                  <Trans defaults="Reset">Reset</Trans>
                </Button>
                <Link className="signInBtn" to="/signin">
                  <Trans defaults="Back to signin">Back to signin</Trans>
                </Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(ResetPassword);
