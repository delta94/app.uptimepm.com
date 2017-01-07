import React from 'react';
import { Button, Row, Col, Input, Select, message, Icon } from 'antd';
import { SaveDealerContactMutation, useSaveDealerContactMutation, DealerContactInput, PhoneTypeEnum, useDealersContactQuery } from 'generated';
import ContainerHeader from 'components/ContainerHeader';
import DealerContactBox from './DealerContactBox';
import FormItem from 'antd/lib/form/FormItem';
import './index.scss';
import { ExecutionResult } from 'graphql';
import { ValidateStatuses } from 'components/SingleDropdown';
import { SelectValue } from 'antd/lib/select';
import { capitalizeFirstLetter } from 'helpers/utils';

const Option = Select.Option;

export interface IProps {
  handleChange: any;
  defValue: DealerContactInput[];
  placeholder: string;
  type: string;
}

export const Representative = (props: IProps) => {
  const [state, setState] = React.useState({
    showInsert: false,
    firstName: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    lastName: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    email: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    phone: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    phoneType: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    phoneExt: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    item: { representativeType: props.type } as DealerContactInput,
    defValue: props.defValue,
    dealerContactSearch: '',
  });

  const { loading, data } = useDealersContactQuery({
    fetchPolicy: 'network-only',
    variables: { skip: 0, pageSize: 100, searchText: state.dealerContactSearch, type: props.type },
  });

  const [saveDealerContact] = useSaveDealerContactMutation();

  const handleInputChange = (evt: any) => {
    (state.item as any)[evt.target.name] = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: {
        ...valRequiredField(evt.target.value, evt.target.name),
        value: evt.target.value,
      },
      item: state.item,
    });
  };

  const handlePhoneChange = (evt: any) => {
    setState({
      ...state,
      [evt.target.name]: {
        ...valRequiredField(evt.target.value, evt.target.name),
        value: evt.target.value,
      },
      item: state.item,
    });
  };

  const valEmail = (value: string) => {
    const re = new RegExp( // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!value) {
      // if field doesn't have value
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: '',
      };
    }

    if (re.test(value.toLowerCase())) {
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: '',
      };
    }
    return {
      validateStatus: ValidateStatuses.Error,
      errorMsg: 'Please enter a valid email',
    };
  };

  const handleEmailChange = (evt: any) => {
    (state.item as any)[evt.target.name] = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: {
        ...valEmail(evt.target.value),
        value: evt.target.value,
      },
      item: state.item,
    });
  };

  const valRequiredField = (value: any, fieldName: string) => {
    if (value) {
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: '',
      };
    }
    return {
      validateStatus: ValidateStatuses.Error,
      errorMsg: fieldName + ' is a required field',
    };
  };

  const validate = () => {
    const firstNameObj = valRequiredField(state.firstName.value, 'First Name');
    const lastNameObj = valRequiredField(state.lastName.value, 'Last Name');
    const emailObj = valEmail(state.email.value);

    setState({
      ...state,
      firstName: {
        ...firstNameObj,
        value: state.firstName.value,
      },
      lastName: {
        ...lastNameObj,
        value: state.lastName.value,
      },
      email: {
        ...emailObj,
        value: state.email.value,
      },
    });

    let validationStatus = ValidateStatuses.Success;
    if (firstNameObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (lastNameObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (emailObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    return validationStatus;
  };

  const insert = () => {
    state.showInsert = true;
    setState({ ...state, showInsert: state.showInsert });
  };

  const cancel = () => {
    state.showInsert = false;
    setState({ ...state, showInsert: state.showInsert });
  };

  const getTitle = () => {
    if (state.showInsert) return 'Add ' + capitalizeFirstLetter(props.type) + ' representative';
    else return capitalizeFirstLetter(props.type) + ' Representative';
  };

  const handleTypeChange = (e: any) => {
    // console.log('e, index', e);

    setState({
      ...state,
      phoneType: {
        ...valRequiredField(e, 'Type'),
        value: e,
      },
      item: state.item,
    });
  };

  const handleSubmit = async () => {
    const status = validate();
    if (!(status === ValidateStatuses.Success)) {
      // console.log(status);
      return false;
    }
    if (state.phone.value) {
      const typed = PhoneTypeEnum[state.phoneType.value as keyof typeof PhoneTypeEnum];
      state.item.phone = {
        digits: state.phone.value,
        extension: state.phoneExt.value,
        type: typed,
      };
    }

    let result: void | ExecutionResult<SaveDealerContactMutation>;
    try {
      result = await saveDealerContact({
        variables: { data: state.item },
      });
      if (result && result.data) {
        message.success('Representative successfully added!');
        state.defValue = state.defValue.concat(result.data.saveDealerContact);
        setState({ ...state, showInsert: false, defValue: state.defValue });
        // console.log(state.defValue);
        props.handleChange(state.defValue);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleSearch = (s: string) => {
    // console.log('searching=', s);
    setState({ ...state, dealerContactSearch: s });
  };

  return (
    <>
      <ContainerHeader
        title={getTitle()}
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Row gutter={10} type="flex">
            <Col className={state.showInsert ? 'hide' : ''} onClick={insert}>
              <Button>Insert</Button>
            </Col>
            <Col className={state.showInsert ? 'primary' : 'hide'}>
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Col>
            <Col className={state.showInsert ? '' : 'hide'}>
              <Button onClick={cancel}>Cancel</Button>
            </Col>
          </Row>
        }
      />

      <Row type="flex" gutter={10}>
        <Col xs={24} sm={24} className={!state.showInsert ? '' : 'hide'}>
          <DealerContactBox
            type={props.type}
            data={data && data.dealersContact ? data.dealersContact.dealers : []}
            handleSearch={handleSearch}
            handleChange={props.handleChange}
            loading={loading}
            defValue={state.defValue}
            placeholder="Search Dealer Contact..."
          />
        </Col>

        <Col xs={24} sm={24} className={state.showInsert ? '' : 'hide'}>
          <FormItem label="First Name" validateStatus={state.firstName.validateStatus} help={state.firstName.errorMsg}>
            <Input value={state.firstName.value} name="firstName" onChange={e => handleInputChange(e)} placeholder="First Name" />
          </FormItem>

          <FormItem label="Last Name" validateStatus={state.lastName.validateStatus} help={state.lastName.errorMsg}>
            <Input value={state.lastName.value} name="lastName" onChange={e => handleInputChange(e)} placeholder="Last Name" />
          </FormItem>

          <FormItem label="Email" validateStatus={state.email.validateStatus} help={state.email.errorMsg}>
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={state.email.value}
              type="email"
              name="email"
              onChange={e => handleEmailChange(e)}
              placeholder="Email"
            />
          </FormItem>

          <Row type="flex" gutter={10}>
            <Col xs={24} sm={8}>
              <FormItem label="Phone Number">
                <Input value={state.phone.value} name="phone" onChange={e => handlePhoneChange(e)} placeholder="Phone number" />
              </FormItem>
            </Col>
            <Col xs={24} sm={8}>
              <FormItem label="Type">
                <Select value={state.phoneType.value} onChange={(event: SelectValue) => handleTypeChange(event)} placeholder="Please select a Phone Type">
                  <Option value="Home">Home</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Fax">Fax</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="Department">Department</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} sm={8}>
              <FormItem label="Extension">
                <Input placeholder="Extension" value={state.phoneExt.value} name="phoneExt" onChange={e => handlePhoneChange(e)} />
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Representative;
