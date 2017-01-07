import { Col, Form, Input, Row, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent, useContext } from 'react';
import { ExecutionResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import GetDealer from './GetDealer';
import Widget from 'components/Widget';
import { Dealer, Phone, useSaveDealerMutation, Address, SaveDealerMutation, DealerContactInput } from 'generated';
import Addresses from 'components/Addresses';
import PhonesList from 'components/Phones';
import { removeTypename } from 'helpers/utils';
import ContainerHeader from 'components/ContainerHeader';
import ActionButtons from 'components/Forms/ActionButtons';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import Representative from './Representative';

const FormItem = Form.Item;

export interface SaveDealerProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  dealer: Dealer;
}

interface ISaveDealerResponse {
  saveDealer: {
    id: string;
    name: string;
  };
}

export const AddDealer = (props: SaveDealerProps) => {
  const dealer = props.dealer;

  const [state, setState] = React.useState({
    dealerContactSearch: '',
    selectedSales: dealer.sales,
    selectedService: dealer.service,
    selectedParts: dealer.parts,
    type: 'Sales',
  });
  const currentUserContext = useContext(CurrentUserContext);
  const [saveDealer] = useSaveDealerMutation();

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        // console.log(err);
        return false;
      }
      let result: void | ExecutionResult<SaveDealerMutation>;
      try {
        values.location = values.addresses[0]; // Dealer needs only one address
        delete values.addresses;
        if (values.location.lineOne === undefined) delete values.location;
        if (values.phones[0].digits === undefined) delete values.phones;
        // console.log('sal', state.selectedSales);
        values.sales = removeTypename(state.selectedSales);
        values.service = removeTypename(state.selectedService);
        values.parts = removeTypename(state.selectedParts);

        result = await saveDealer({ variables: { data: values } });
        if (result && result.data) {
          form.resetFields();
          currentUserContext.client.cache.data.delete('ROOT_QUERY'); // Clearing from apollo cache => refresh the table with new values
          props.history.goBack();
        }
      } catch (ex) {}
    });
  };

  const cancel = () => {
    props.history.goBack();
  };

  const handleSalesChange = (s: DealerContactInput[]) => {
    setState({ ...state, selectedSales: s });
  };

  const handleServiceChange = (s: DealerContactInput[]) => {
    setState({ ...state, selectedService: s });
  };

  const handlePartsChange = (s: DealerContactInput[]) => {
    setState({ ...state, selectedParts: s });
  };

  const {
    form: { getFieldDecorator },
    location,
  } = props;
  const id = location.state ? location.state.id : undefined;
  const isEditMode = id ? true : false;

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <ContainerHeader
        title="Dealer"
        subheading="An Administration view of all dealers."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={<ActionButtons onCancel={cancel} submitText="Save Dealer" />}
      />
      <Widget>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={24}>
            <FormItem style={{ height: 0, padding: 0, margin: 0 }}>
              {getFieldDecorator('id', {
                initialValue: dealer.id,
              })(<Input placeholder="id" type="hidden" />)}
            </FormItem>

            <FormItem label="Name">
              {getFieldDecorator('name', {
                initialValue: dealer.name,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: true, message: 'Please enter dealer name!' }],
              })(<Input placeholder="Dealer name" />)}
            </FormItem>
          </Col>

          <Col xs={24} sm={24}>
            <FormItem label="Website">
              {getFieldDecorator('website', {
                initialValue: dealer.website,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: false, type: 'url', message: "Url not valid, url must start with 'http://'" }],
              })(<Input prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Website" />)}
            </FormItem>
          </Col>

          <Col xs={24} sm={24}>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                initialValue: dealer.email,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: false, type: 'email', message: 'Email not valid' }],
              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </FormItem>
          </Col>
        </Row>
      </Widget>
      <Widget>
        <Row>
          <Col>
            <h3>Address Information</h3>
          </Col>
        </Row>
        <Addresses
          isRequired={false}
          isSingle={true}
          addresses={isEditMode && dealer.location ? [dealer.location as Address] : [{} as Address]}
          form={props.form}
        />
      </Widget>

      <Widget>
        <Row>
          <Col>
            <h3>Phone Information</h3>
          </Col>
        </Row>
        <PhonesList isRequired={false} phones={isEditMode && dealer.phones ? (dealer.phones as Phone[]) : [{} as Phone]} form={props.form} />
      </Widget>

      <Widget>
        <Representative type="Sales" handleChange={handleSalesChange} defValue={isEditMode && dealer.sales ? dealer.sales : []} placeholder="Search sales..." />
      </Widget>

      <Widget>
        <Representative
          type="Service"
          handleChange={handleServiceChange}
          defValue={isEditMode && dealer.service ? dealer.service : []}
          placeholder="Search service..."
        />
      </Widget>

      <Widget>
        <Representative type="Parts" handleChange={handlePartsChange} defValue={isEditMode && dealer.parts ? dealer.parts : []} placeholder="Search parts..." />
      </Widget>

      <Row>
        <Col xs={24} sm={24}>
          <FormItem>
            <ActionButtons onCancel={cancel} submitText="Save Dealer" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};
export default Form.create()(GetDealer(AddDealer));
