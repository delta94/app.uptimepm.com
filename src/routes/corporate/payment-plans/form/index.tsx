import GetPaymentPlan from './GetPaymentPlan';
import GraphQLError from 'components/GraphQLError';
import { Form, Input, InputNumber, Select, Row, Col } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { SAVE_PAYMENT_PLAN } from '../paymentPlan.mutations';
import React, { Component, FormEvent } from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import { clone } from 'lodash';
import ActionButtons from 'components/Forms/ActionButtons';
import { PaymentPlan } from 'generated';

const FormItem = Form.Item;
const Option = Select.Option;

export interface SavePaymentPlanProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  paymentPlan?: PaymentPlan;
}

interface SavePaymentPlanState {
  minimumUsers: number;
}

interface SavePaymentPlanResponse {
  SavePaymentPlan: {
    id: string;
    name: string;
  };
}

interface SavePaymentPlanVariables {
  paymentPlan: PaymentPlan;
}

class SavePaymentPlan extends Component<SavePaymentPlanProps, SavePaymentPlanState> {
  state: SavePaymentPlanState = {
    minimumUsers: 1
  };

  componentDidMount() {
    const paymentPlan = this.props.paymentPlan ? this.props.paymentPlan : ({} as PaymentPlan);
    this.props.form.setFieldsValue({ name: paymentPlan.name, minimumUsers: paymentPlan.minimumUsers });
  }

  add = () => {
    // this.setState(prevState => ({
    //   models: prevState.models.concat([{} as IPayModel]),
    // }));
  };

  cancel = () => {
    this.props.history.push('/corporate/paymentPlans');
  };

  delete = (index: number) => {
    // const models = this.state.models;
    // if (index !== -1) {
    //   models.splice(index, 1);
    //   this.setState({
    //     models: models.length > 0 ? models : [{} as IPayModel],
    //   });
    // }
  };

  onChangeMinimumUsers = (value: any) => {
    // console.log('changed', value);
    this.setState({ minimumUsers: value });
  };

  render() {
    const form = this.props.form;
    const { getFieldDecorator } = form;
    const paymentPlan = this.props.paymentPlan;
    const isEditMode = paymentPlan ? true : false;
    return (
      <Mutation<SavePaymentPlanResponse, SavePaymentPlanVariables> mutation={SAVE_PAYMENT_PLAN}>
        {(SavePaymentPlan, { error }) => {
          const handleSubmit = (e: FormEvent<any>) => {
            e.preventDefault();
            const form = this.props.form;
            form.validateFields(async (err: any, values: PaymentPlan) => {
              if (err) {
                return false;
              }

              const result = await SavePaymentPlan({ variables: { paymentPlan: values } });

              if (result && result.data) {
                form.resetFields();
                this.props.history.push('/corporate/paymentPlans');
              }
            });
          };

          const paymentPlan: PaymentPlan = this.props.paymentPlan ? clone(this.props.paymentPlan) : ({ models: [{} as PaymentPlan] } as any);

          return (
            <Form layout="vertical" onSubmit={handleSubmit}>
              <ContainerHeader
                title={`${isEditMode ? 'Edit' : 'Add'} Payment Plan`}
                icon="pe-7s-display1 icon-gradient bg-premium-dark"
                actions={<ActionButtons onCancel={this.cancel} submitText="Save Payment Plan" />}
              />
              <GraphQLError error={error} />
              <Widget>
                <Row>
                  <Col xs={24}>
                    <FormItem style={{ height: 0, padding: 0, margin: 0 }}>
                      {getFieldDecorator('id', {
                        initialValue: paymentPlan.id
                      })(<Input placeholder="id" type="hidden" />)}
                    </FormItem>
                    <FormItem label="Name">
                      {getFieldDecorator('name', {
                        initialValue: paymentPlan.name,
                        rules: [{ required: true, message: 'Please enter a Name!' }]
                      })(<Input placeholder="Name" />)}
                    </FormItem>
                    <FormItem label="Minimum Users">
                      {getFieldDecorator('minimumUsers', {
                        initialValue: paymentPlan.minimumUsers,
                        rules: [{ required: true, message: 'Please enter a number of minimum users!' }]
                      })(<InputNumber placeholder="Minimum users" style={{ width: '100%' }} min={1} onChange={this.onChangeMinimumUsers} />)}
                    </FormItem>
                    <FormItem label="Maximum Users">
                      {getFieldDecorator('maximumUsers', {
                        initialValue: paymentPlan.maximumUsers,
                        rules: [{ required: true, message: 'Please enter a number of max users!' }]
                      })(<InputNumber placeholder="Max users" style={{ width: '100%' }} min={this.state.minimumUsers} />)}
                    </FormItem>
                    <FormItem label="Price Per User">
                      {getFieldDecorator('pricePerUser', {
                        initialValue: paymentPlan.pricePerUser,
                        rules: [{ required: true, message: 'Please enter a price per user!' }]
                      })(<InputNumber style={{ width: '100%' }} placeholder="Price per user" min={0} parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')} />)}
                    </FormItem>

                    <FormItem label="Maintenance Fee">
                      {getFieldDecorator('maintenanceFee', {
                        initialValue: paymentPlan.maintenanceFee,
                        rules: [{ required: true, message: 'Please enter a maintenance fee!' }]
                      })(<InputNumber style={{ width: '100%' }} placeholder="Maintenance fee per user" />)}
                    </FormItem>
                  </Col>
                </Row>
              </Widget>

              <Widget>
                <Row>
                  <Col>
                    <h3>Billing & Discount</h3>
                  </Col>
                </Row>

                <Row type="flex" gutter={10}>
                  <Col xs={24} sm={8}>
                    <FormItem label="On Boarding fee per User">
                      {getFieldDecorator('onboardingFeePerUser', {
                        initialValue: paymentPlan.onboardingFeePerUser,
                        rules: [{ required: true, message: 'Please enter an onboarding fee per user!' }]
                      })(<InputNumber style={{ width: '100%' }} placeholder="Onboarding fee per user" />)}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={8}>
                    <FormItem label="Billing Period">
                      {getFieldDecorator('billingPeriod', {
                        initialValue: paymentPlan.billingPeriod,
                        rules: [
                          {
                            required: true,
                            message: 'Please select a billing period'
                          }
                        ]
                      })(
                        <Select placeholder="Please Select a Billing Period">
                          <Option value="Monthly">Monthly</Option>
                          <Option value="Annual">Annual</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>

                <Row type="flex" gutter={10}>
                  <Col xs={24} sm={8}>
                    <FormItem label="Discount Amount">
                      {getFieldDecorator('discountAmount', {
                        initialValue: paymentPlan.discountAmount,
                        rules: [{ required: true, message: 'Please enter a discount amount!' }]
                      })(<InputNumber style={{ width: '100%' }} placeholder="Discount amount" />)}
                    </FormItem>{' '}
                  </Col>
                  <Col xs={24} sm={8}>
                    <FormItem label="Discount Type">
                      {getFieldDecorator('discountType', {
                        initialValue: paymentPlan.discountType,
                        rules: [
                          {
                            required: true,
                            message: 'Please select the type of discount'
                          }
                        ]
                      })(
                        <Select placeholder="Please select the type of discount">
                          <Option value="Percentage">Percentage</Option>
                          <Option value="Fixed">Fixed</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Widget>

              <Row>
                <Col xs={24} sm={12}>
                  <ActionButtons onCancel={this.cancel} submitText="Save Payment Plan" />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Form.create()(GetPaymentPlan(SavePaymentPlan));
