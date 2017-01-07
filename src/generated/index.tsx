/* eslint-disable import/first */
// tslint:disable
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
};

export type Address = {
   __typename?: 'Address',
  lineOne: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  postalCode: Scalars['String'],
  country: Scalars['String'],
  type: AddressTypeEnum,
  lineTwo?: Maybe<Scalars['String']>,
  lineThree?: Maybe<Scalars['String']>,
};

export type AddressInput = {
  lineOne: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  postalCode: Scalars['String'],
  country: Scalars['String'],
  type: AddressTypeEnum,
  lineTwo?: Maybe<Scalars['String']>,
  lineThree?: Maybe<Scalars['String']>,
};

/** Type of Address */
export enum AddressTypeEnum {
  Mailing = 'Mailing',
  Business = 'Business',
  Home = 'Home',
  Other = 'Other'
}

/** Which type of Agreement? */
export enum AgreementTypeEnum {
  Eula = 'Eula',
  Terms = 'Terms',
  Privacy = 'Privacy'
}

export type Ancestry = {
   __typename?: 'Ancestry',
  depth: Scalars['Int'],
  breadcrumb: Scalars['String'],
  ancestors?: Maybe<Scalars['String']>,
};

export type AppSettings = {
   __typename?: 'AppSettings',
  id?: Maybe<Scalars['ID']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type AvailablePermission = {
   __typename?: 'AvailablePermission',
  name: Scalars['String'],
  type: Scalars['String'],
  privileges: Array<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
};

export type AvailablePermissionInput = {
  name: Scalars['String'],
  type: Scalars['String'],
  privileges: Array<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
};

export type BasicOfficeLocationReference = {
   __typename?: 'BasicOfficeLocationReference',
  name: Scalars['String'],
  id: Scalars['ID'],
};

/** Frequency of Billing Period */
export enum BillingPeriodEnum {
  Monthly = 'Monthly',
  Annual = 'Annual'
}

export type ChecklistItem = {
   __typename?: 'ChecklistItem',
  id?: Maybe<Scalars['String']>,
  title: Scalars['String'],
  type: ChecklistItemTypeEnum,
  consumable: Scalars['Boolean'],
  consumableFluid?: Maybe<Scalars['String']>,
  photoRequired: Scalars['Boolean'],
  statuses?: Maybe<Array<ChecklistItemStatus>>,
};

export type ChecklistItemInput = {
  id?: Maybe<Scalars['ID']>,
  title: Scalars['String'],
  type: ChecklistItemTypeEnum,
  consumable: Scalars['Boolean'],
  consumableFluid?: Maybe<Scalars['String']>,
  photoRequired: Scalars['Boolean'],
  statuses?: Maybe<Array<ChecklistItemStatusInput>>,
};

export type ChecklistItemStatus = {
   __typename?: 'ChecklistItemStatus',
  text: Scalars['String'],
  shouldSendAlert?: Maybe<Scalars['Boolean']>,
  isDefault?: Maybe<Scalars['Boolean']>,
};

export type ChecklistItemStatusInput = {
  text: Scalars['String'],
  shouldSendAlert: Scalars['Boolean'],
  isDefault: Scalars['Boolean'],
};

/** Type of Checklist Item to Display */
export enum ChecklistItemTypeEnum {
  TextInput = 'TextInput',
  NumericInput = 'NumericInput',
  Status = 'Status'
}

export type Classification = {
   __typename?: 'Classification',
  name: Scalars['String'],
};

export type ClassificationTableList = {
   __typename?: 'ClassificationTableList',
  classifications: Array<Classification>,
  totalRows: Scalars['Int'],
};

export type Client = {
   __typename?: 'Client',
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  loginDomain: Scalars['String'],
  uuid?: Maybe<Scalars['String']>,
  paymentPlan?: Maybe<PaymentPlanReference>,
  website?: Maybe<Scalars['String']>,
  ancestry?: Maybe<Ancestry>,
  roles?: Maybe<ClientRoles>,
  phones?: Maybe<Array<Phone>>,
  addresses?: Maybe<Array<Address>>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type ClientInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  loginDomain: Scalars['String'],
  uuid?: Maybe<Scalars['String']>,
  paymentPlan?: Maybe<PaymentPlanReferenceInput>,
  website?: Maybe<Scalars['String']>,
  roles?: Maybe<ClientRolesInput>,
};

export type ClientRole = {
   __typename?: 'ClientRole',
  id: Scalars['String'],
  role: RoleReference,
};

export type ClientRoleInput = {
  id: Scalars['String'],
  role: RoleReferenceInput,
};

export type ClientRoles = {
   __typename?: 'ClientRoles',
  parentId: Scalars['String'],
  roles: Array<ClientRole>,
};

export type ClientRolesInput = {
  parentId: Scalars['String'],
  roles: Array<ClientRoleInput>,
};

export type ClientTableList = {
   __typename?: 'ClientTableList',
  clients: Array<Client>,
  totalRows: Scalars['Int'],
};


export type Dealer = {
   __typename?: 'Dealer',
  name: Scalars['String'],
  website?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  location?: Maybe<DealerAddress>,
  phones?: Maybe<Array<DealerPhone>>,
  sales?: Maybe<Array<DealerContact>>,
  service?: Maybe<Array<DealerContact>>,
  parts?: Maybe<Array<DealerContact>>,
  client?: Maybe<IdNameReference>,
  id?: Maybe<Scalars['ID']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type DealerAddress = {
   __typename?: 'DealerAddress',
  id?: Maybe<Scalars['ID']>,
  lineOne?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  type?: Maybe<AddressTypeEnum>,
  lineTwo?: Maybe<Scalars['String']>,
  lineThree?: Maybe<Scalars['String']>,
};

export type DealerAddressInput = {
  id?: Maybe<Scalars['ID']>,
  lineOne?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  type?: Maybe<AddressTypeEnum>,
  lineTwo?: Maybe<Scalars['String']>,
  lineThree?: Maybe<Scalars['String']>,
};

export type DealerContact = {
   __typename?: 'DealerContact',
  id?: Maybe<Scalars['ID']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<DealerPhone>,
  representativeType: Scalars['String'],
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
  client?: Maybe<IdNameReference>,
};

export type DealerContactInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<DealerPhoneInput>,
  id?: Maybe<Scalars['ID']>,
  representativeType: Scalars['String'],
};

export type DealerContactTableList = {
   __typename?: 'DealerContactTableList',
  dealers: Array<DealerContact>,
  totalRows: Scalars['Int'],
};

export type DealerInput = {
  name: Scalars['String'],
  website?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  location?: Maybe<DealerAddressInput>,
  phones?: Maybe<Array<DealerPhoneInput>>,
  sales?: Maybe<Array<DealerContactInput>>,
  service?: Maybe<Array<DealerContactInput>>,
  parts?: Maybe<Array<DealerContactInput>>,
  id?: Maybe<Scalars['ID']>,
};

export type DealerPhone = {
   __typename?: 'DealerPhone',
  type?: Maybe<PhoneTypeEnum>,
  digits?: Maybe<Scalars['String']>,
  extension?: Maybe<Scalars['String']>,
};

export type DealerPhoneInput = {
  type?: Maybe<PhoneTypeEnum>,
  digits?: Maybe<Scalars['String']>,
  extension?: Maybe<Scalars['String']>,
};

export type DealerTableList = {
   __typename?: 'DealerTableList',
  dealers: Array<Dealer>,
  totalRows: Scalars['Int'],
};

export type DetailedEquipmentReference = {
   __typename?: 'DetailedEquipmentReference',
  id: Scalars['String'],
  name: Scalars['String'],
  nickname: Scalars['String'],
  meterType: Scalars['String'],
  classification?: Maybe<Scalars['String']>,
  make?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  vinOrSerial?: Maybe<Scalars['String']>,
};

export type DetailedEquipmentReferenceInput = {
  id: Scalars['String'],
  name: Scalars['String'],
  nickname: Scalars['String'],
  meterType: Scalars['String'],
  classification?: Maybe<Scalars['String']>,
  make?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  vinOrSerial: Scalars['String'],
};

/** Type of Discount */
export enum DiscountTypeEnum {
  Percentage = 'Percentage',
  Fixed = 'Fixed'
}

export type Equipment = {
   __typename?: 'Equipment',
  id: Scalars['ID'],
  administrator?: Maybe<UserReference>,
  latestInspection?: Maybe<InspectionReference>,
  mechanics?: Maybe<Array<UserReference>>,
  dateOutOfService?: Maybe<Scalars['DateTime']>,
  meterType: Scalars['String'],
  meterValue?: Maybe<Scalars['Float']>,
  type: EquipmentTypeEnum,
  classification?: Maybe<Scalars['String']>,
  attachment?: Maybe<Scalars['String']>,
  totalInspections?: Maybe<Scalars['Int']>,
  operatingHours?: Maybe<Scalars['Int']>,
  serviceInterval?: Maybe<IdTitleReference>,
  warrantyInfo?: Maybe<WarrantyInfo>,
  dealers?: Maybe<Array<IdNameReference>>,
  initialHours?: Maybe<Scalars['Float']>,
  name: Scalars['String'],
  nickname: Scalars['String'],
  manufacturer?: Maybe<Scalars['String']>,
  make?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  vinOrSerial?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['Int']>,
  inspectionTemplate?: Maybe<InspectionTemplateReference>,
  operators?: Maybe<Array<UserReference>>,
  client?: Maybe<IdNameReference>,
  officeLocation?: Maybe<IdNameReference>,
  job?: Maybe<JobReference>,
  dateInService?: Maybe<Scalars['DateTime']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
  expectedUsage?: Maybe<ExpectedUsage>,
};

export type EquipmentInput = {
  id?: Maybe<Scalars['ID']>,
  administrator?: Maybe<UserReferenceInput>,
  mechanics?: Maybe<Array<UserReferenceInput>>,
  dateOutOfService?: Maybe<Scalars['DateTime']>,
  meterType: Scalars['String'],
  meterValue?: Maybe<Scalars['Float']>,
  warrantyInfo?: Maybe<WarrantyInfoInput>,
  dealers?: Maybe<Array<IdNameReferenceInput>>,
  initialHours?: Maybe<Scalars['Float']>,
  type: EquipmentTypeEnum,
  classification?: Maybe<Scalars['String']>,
  attachment?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  nickname: Scalars['String'],
  manufacturer?: Maybe<Scalars['String']>,
  make?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  vinOrSerial?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['Int']>,
  inspectionTemplate?: Maybe<InspectionTemplateReferenceInput>,
  inspectionTemplateId?: Maybe<Scalars['String']>,
  operators?: Maybe<Array<UserReferenceInput>>,
  client?: Maybe<IdNameReferenceInput>,
  officeLocation?: Maybe<IdNameReferenceInput>,
  job?: Maybe<JobReferenceInput>,
  clientId?: Maybe<Scalars['String']>,
  serviceIntervalId?: Maybe<Scalars['String']>,
  serviceInterval?: Maybe<IdTitleReferenceInput>,
  dateInService?: Maybe<Scalars['DateTime']>,
  expectedUsage: ExpectedUsageInput,
};

export type EquipmentReference = {
   __typename?: 'EquipmentReference',
  id: Scalars['String'],
  name: Scalars['String'],
  nickname: Scalars['String'],
  meterType: Scalars['String'],
};

export type EquipmentReferenceInput = {
  id: Scalars['String'],
  name: Scalars['String'],
  nickname: Scalars['String'],
  meterType: Scalars['String'],
};

export type EquipmentTableList = {
   __typename?: 'EquipmentTableList',
  equipment: Array<Equipment>,
  totalRows: Scalars['Int'],
};

/** General Description of Equipment Type */
export enum EquipmentTypeEnum {
  Tracked = 'Tracked',
  Wheeled = 'Wheeled',
  Other = 'Other'
}

export type EquipmentUsageDay = {
   __typename?: 'EquipmentUsageDay',
  day: Scalars['String'],
  estimateUsage: Scalars['Float'],
  actualUsage?: Maybe<Scalars['Float']>,
};

export type EquipmentUsageLog = {
   __typename?: 'EquipmentUsageLog',
  who: UserReference,
  type: Scalars['String'],
  equipment: DetailedEquipmentReference,
  client?: Maybe<IdNameReference>,
  officeLocation?: Maybe<IdNameReference>,
  job?: Maybe<JobReference>,
  estimateUsage: Scalars['Float'],
  actualUsage?: Maybe<Scalars['Float']>,
  percentage: Scalars['Float'],
  meterValueIn: Scalars['Float'],
  meterValueOut: Scalars['Float'],
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type ExpectedUsage = {
   __typename?: 'ExpectedUsage',
  mon: Scalars['Int'],
  tue: Scalars['Int'],
  wed: Scalars['Int'],
  thu: Scalars['Int'],
  fri: Scalars['Int'],
  sat: Scalars['Int'],
  sun: Scalars['Int'],
};

export type ExpectedUsageInput = {
  mon: Scalars['Int'],
  tue: Scalars['Int'],
  wed: Scalars['Int'],
  thu: Scalars['Int'],
  fri: Scalars['Int'],
  sat: Scalars['Int'],
  sun: Scalars['Int'],
};

export type Filter = {
  filters?: Maybe<Scalars['String']>,
};

export type Fluid = {
   __typename?: 'Fluid',
  name: Scalars['String'],
};

export type FluidInput = {
  name: Scalars['String'],
};

export type FluidReport = {
   __typename?: 'FluidReport',
  id?: Maybe<Scalars['ID']>,
  equipment: DetailedEquipmentReference,
  client: IdNameReference,
  officeLocation?: Maybe<IdNameReference>,
  job?: Maybe<JobReference>,
  user: UserReference,
  inspection?: Maybe<InspectionReference>,
  fluid: Scalars['String'],
  meterValue: Scalars['Float'],
  unitOfMeasure: Scalars['String'],
  amount: Scalars['Float'],
  completedOn?: Maybe<Scalars['DateTime']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type FluidReportInput = {
  id?: Maybe<Scalars['ID']>,
  equipment?: Maybe<EquipmentReferenceInput>,
  detailedEquipment?: Maybe<DetailedEquipmentReferenceInput>,
  meterValue: Scalars['Float'],
  fluid: Scalars['String'],
  unitOfMeasure: Scalars['String'],
  amount: Scalars['Float'],
};

export type FluidReportTableList = {
   __typename?: 'FluidReportTableList',
  fluidReports: Array<FluidReport>,
  totalRows: Scalars['Int'],
};

export type FluidTableList = {
   __typename?: 'FluidTableList',
  fluids: Array<Fluid>,
  totalRows: Scalars['Int'],
};

export type ForgotPassword = {
   __typename?: 'ForgotPassword',
  id: Scalars['String'],
  userId: Scalars['String'],
  token: Scalars['String'],
};

export type ForgotPasswordInput = {
  email: Scalars['String'],
};

export type ForgotPasswordResponse = {
   __typename?: 'ForgotPasswordResponse',
  status: Scalars['Boolean'],
};

export type IdNameReference = {
   __typename?: 'IdNameReference',
  name: Scalars['String'],
  id: Scalars['ID'],
};

export type IdNameReferenceInput = {
  name: Scalars['String'],
  id: Scalars['ID'],
};

export type IdTitleReference = {
   __typename?: 'IdTitleReference',
  id: Scalars['String'],
  title: Scalars['ID'],
};

export type IdTitleReferenceInput = {
  id: Scalars['String'],
  title: Scalars['ID'],
};

export type ImageInfoInput = {
  fileName: Scalars['String'],
  fileType: Scalars['String'],
};

export type Inspection = {
   __typename?: 'Inspection',
  id?: Maybe<Scalars['ID']>,
  completed?: Maybe<Scalars['Boolean']>,
  inspectionTemplate?: Maybe<IdTitleReference>,
  client?: Maybe<IdNameReference>,
  officeLocation?: Maybe<IdNameReference>,
  job?: Maybe<JobReference>,
  meterValue?: Maybe<Scalars['Float']>,
  meterImage?: Maybe<Scalars['String']>,
  meterValueDaily?: Maybe<Scalars['Float']>,
  type: Scalars['String'],
  equipment: DetailedEquipmentReference,
  checklist: Array<InspectionChecklistItem>,
  who: UserReference,
  supervisor?: Maybe<UserReference>,
  completedOn?: Maybe<Scalars['DateTime']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type InspectionChart = {
   __typename?: 'InspectionChart',
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  fullName: Scalars['String'],
  total: Scalars['Int'],
};

export type InspectionChecklistItem = {
   __typename?: 'InspectionChecklistItem',
  id?: Maybe<Scalars['ID']>,
  title: Scalars['String'],
  type: ChecklistItemTypeEnum,
  consumable?: Maybe<Scalars['Boolean']>,
  consumableFluid?: Maybe<Scalars['String']>,
  consumableAmount?: Maybe<Scalars['Float']>,
  consumableUnitOfMeasure?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  numericStatus?: Maybe<Scalars['Float']>,
  textStatus?: Maybe<Scalars['String']>,
  completed: Scalars['Boolean'],
  shouldSendAlert?: Maybe<Scalars['Boolean']>,
  photos?: Maybe<Array<Scalars['String']>>,
};

export type InspectionChecklistItemInput = {
  id?: Maybe<Scalars['ID']>,
  title: Scalars['String'],
  type: ChecklistItemTypeEnum,
  consumable?: Maybe<Scalars['Boolean']>,
  consumableFluid?: Maybe<Scalars['String']>,
  consumableAmount?: Maybe<Scalars['Float']>,
  consumableUnitOfMeasure?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  numericStatus?: Maybe<Scalars['Float']>,
  textStatus?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
  shouldSendAlert?: Maybe<Scalars['Boolean']>,
  photos?: Maybe<Array<Scalars['String']>>,
};

export type InspectionEquipmentTableList = {
   __typename?: 'InspectionEquipmentTableList',
  inspectionsForEquipment: Array<Inspection>,
  totalRows: Scalars['Int'],
};

export type InspectionInput = {
  id?: Maybe<Scalars['ID']>,
  equipment?: Maybe<EquipmentReferenceInput>,
  detailedEquipment?: Maybe<DetailedEquipmentReferenceInput>,
  meterValue?: Maybe<Scalars['Float']>,
  meterImage: Scalars['String'],
  equipmentId?: Maybe<Scalars['String']>,
  type: Scalars['String'],
  client?: Maybe<IdNameReferenceInput>,
  clientId?: Maybe<Scalars['String']>,
  checklist: Array<InspectionChecklistItemInput>,
};

export type InspectionNotificationReference = {
   __typename?: 'InspectionNotificationReference',
  id: Scalars['ID'],
  inspectionChecklists: Array<IdTitleReference>,
  title: Scalars['String'],
};

export type InspectionReference = {
   __typename?: 'InspectionReference',
  id: Scalars['ID'],
  inspectionChecklistId: Scalars['String'],
  title: Scalars['String'],
};

export type InspectionTableList = {
   __typename?: 'InspectionTableList',
  inspections: Array<Inspection>,
  totalRows: Scalars['Int'],
};

export type InspectionTemplate = {
   __typename?: 'InspectionTemplate',
  title: Scalars['String'],
  language?: Maybe<Scalars['String']>,
  client?: Maybe<IdNameReference>,
  classification?: Maybe<Scalars['String']>,
  attachment?: Maybe<Scalars['String']>,
  equipmentType: EquipmentTypeEnum,
  checklist: Array<ChecklistItem>,
  id?: Maybe<Scalars['ID']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type InspectionTemplateForSelectionList = {
   __typename?: 'InspectionTemplateForSelectionList',
  inspectionTemplates: Array<InspectionTemplateReference>,
  totalRows: Scalars['Int'],
};

export type InspectionTemplateInput = {
  title: Scalars['String'],
  language?: Maybe<Scalars['String']>,
  equipmentType: EquipmentTypeEnum,
  classification: Scalars['String'],
  attachment?: Maybe<Scalars['String']>,
  checklist: Array<ChecklistItemInput>,
  id?: Maybe<Scalars['ID']>,
};

export type InspectionTemplateReference = {
   __typename?: 'InspectionTemplateReference',
  id: Scalars['String'],
  title: Scalars['String'],
};

export type InspectionTemplateReferenceInput = {
  id: Scalars['String'],
  title: Scalars['String'],
};

export type InspectionTemplateTableList = {
   __typename?: 'InspectionTemplateTableList',
  inspectionTemplates: Array<InspectionTemplate>,
  totalRows: Scalars['Int'],
};

export type Job = {
   __typename?: 'Job',
  jobNumber: Scalars['String'],
  name: Scalars['String'],
  client: IdNameReference,
  officeLocation: IdNameReference,
  foreman: UserReference,
  addresses: Array<Address>,
  equipment: Array<DetailedEquipmentReference>,
  operators: Array<UserReference>,
  mechanics: Array<UserReference>,
  notificationUsers?: Maybe<Array<UserReference>>,
  startDate?: Maybe<Scalars['DateTime']>,
  endDate?: Maybe<Scalars['DateTime']>,
  id?: Maybe<Scalars['ID']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type JobInput = {
  jobNumber: Scalars['String'],
  name: Scalars['String'],
  client: IdNameReferenceInput,
  officeLocation: IdNameReferenceInput,
  foreman: UserReferenceInput,
  addresses: Array<AddressInput>,
  equipment: Array<DetailedEquipmentReferenceInput>,
  operators: Array<UserReferenceInput>,
  mechanics: Array<UserReferenceInput>,
  notificationUsers?: Maybe<Array<UserReferenceInput>>,
  startDate?: Maybe<Scalars['DateTime']>,
  endDate?: Maybe<Scalars['DateTime']>,
  id?: Maybe<Scalars['ID']>,
};

export type JobReference = {
   __typename?: 'JobReference',
  id?: Maybe<Scalars['ID']>,
  jobNumber: Scalars['String'],
  name: Scalars['String'],
};

export type JobReferenceInput = {
  id?: Maybe<Scalars['ID']>,
  jobNumber: Scalars['String'],
  name: Scalars['String'],
};

export type JobTableList = {
   __typename?: 'JobTableList',
  jobs: Array<Job>,
  totalRows: Scalars['Int'],
};


export type LogEntry = {
   __typename?: 'LogEntry',
  id: Scalars['ID'],
  hint: Scalars['String'],
  data: Scalars['JSON'],
  errorMessage?: Maybe<Scalars['String']>,
  stackTrace?: Maybe<Scalars['String']>,
  client?: Maybe<IdNameReference>,
  user?: Maybe<UserReference>,
  createdOn?: Maybe<Scalars['DateTime']>,
};

export type LogEntryInput = {
  id?: Maybe<Scalars['ID']>,
  hint: Scalars['String'],
  data: Scalars['JSON'],
  errorMessage?: Maybe<Scalars['String']>,
  stackTrace?: Maybe<Scalars['String']>,
};

export type LoggedInUser = {
   __typename?: 'LoggedInUser',
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  notificationCount?: Maybe<Scalars['Float']>,
  client?: Maybe<IdNameReference>,
  roles: Array<UserRoleReference>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  user: LoggedInUser,
  token: Scalars['String'],
};

export type Make = {
   __typename?: 'Make',
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  models?: Maybe<Array<MakeModel>>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type MakeInput = {
  name: Scalars['String'],
  models?: Maybe<Array<MakeModelInput>>,
  id?: Maybe<Scalars['ID']>,
};

export type MakeModel = {
   __typename?: 'MakeModel',
  name?: Maybe<Scalars['String']>,
  equipmentType?: Maybe<EquipmentTypeEnum>,
};

export type MakeModelInput = {
  name?: Maybe<Scalars['String']>,
  equipmentType?: Maybe<EquipmentTypeEnum>,
};

export type MakeTableList = {
   __typename?: 'MakeTableList',
  makes: Array<Make>,
  totalRows: Scalars['Int'],
};

export type Manufacturer = {
   __typename?: 'Manufacturer',
  id?: Maybe<Scalars['ID']>,
  brand: Scalars['String'],
  models?: Maybe<Array<ManufacturerModel>>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type ManufacturerModel = {
   __typename?: 'ManufacturerModel',
  name?: Maybe<Scalars['String']>,
  equipmentType?: Maybe<EquipmentTypeEnum>,
};

export type MeResponse = {
   __typename?: 'MeResponse',
  user: LoggedInUser,
};

export type MobileDevice = {
   __typename?: 'MobileDevice',
  deviceId: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  equipmentNames: Array<Scalars['String']>,
  makesForSelect: Array<Scalars['String']>,
  modelsForSelect: Array<Scalars['String']>,
  saveEquipment: Equipment,
  clientsForSelection: Array<IdNameReference>,
  saveClient: Client,
  saveDealer: Dealer,
  saveDealerContact: DealerContact,
  saveInspection: Inspection,
  saveChecklistItem: Inspection,
  saveChecklistItemNotes: Inspection,
  distinctClassifications: Array<Scalars['String']>,
  inspectionTemplatesForSelect: Array<InspectionTemplateReference>,
  saveInspectionTemplate: InspectionTemplate,
  cloneInspectionTemplate: InspectionTemplate,
  saveMake: Make,
  savePaymentPlan: PaymentPlan,
  saveRole: Role,
  findUsersForSelect: Array<UserReference>,
  signin: LoginResponse,
  signinWithBiometrics: LoginResponse,
  saveMyAccount: User,
  saveUser: User,
  forgotPassword: ForgotPasswordResponse,
  resetPassword: ForgotPasswordResponse,
  acceptAgreement: ForgotPasswordResponse,
  getSignedImageUrlsForInspection: Array<SignedImageUrlForInspection>,
  getSignedImageUrlForMeterImage: SignedImageUrlForMeterImage,
  getSignedImageUrlsForWorkOrder: SignedImageUrlForWorkOrder,
  findServiceIntervals: Array<IdTitleReference>,
  saveServiceInterval: ServiceInterval,
  saveWorkOrder: WorkOrder,
  saveWorkOrderStatus: WorkOrder,
  saveProblemReport: WorkOrder,
  saveFluids: Array<Fluid>,
  saveFluidReport: FluidReport,
  saveLogEntry: Scalars['Boolean'],
  findOfficeLocationsForSelect: Array<IdNameReference>,
  findOfficeLocationsReference: Array<OfficeLocationReference>,
  saveOfficeLocation: OfficeLocation,
  findJobsForSelect: Array<JobReference>,
  saveJob: Job,
  saveRolePermission: RolePermission,
  delete: Scalars['Boolean'],
  saveNotification: Make,
};


export type MutationEquipmentNamesArgs = {
  clientId: Scalars['String'],
  name: Scalars['String']
};


export type MutationMakesForSelectArgs = {
  searchText?: Maybe<Scalars['String']>
};


export type MutationModelsForSelectArgs = {
  searchText: Scalars['String'],
  make?: Maybe<Scalars['String']>
};


export type MutationSaveEquipmentArgs = {
  data: EquipmentInput
};


export type MutationClientsForSelectionArgs = {
  searchText?: Maybe<Scalars['String']>
};


export type MutationSaveClientArgs = {
  data: ClientInput
};


export type MutationSaveDealerArgs = {
  data: DealerInput
};


export type MutationSaveDealerContactArgs = {
  data: DealerContactInput
};


export type MutationSaveInspectionArgs = {
  data: InspectionInput
};


export type MutationSaveChecklistItemArgs = {
  data: SaveChecklistItemInput
};


export type MutationSaveChecklistItemNotesArgs = {
  data: SaveChecklistItemNotesInput
};


export type MutationDistinctClassificationsArgs = {
  classification: Scalars['String']
};


export type MutationInspectionTemplatesForSelectArgs = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String'],
  classification: Scalars['String']
};


export type MutationSaveInspectionTemplateArgs = {
  data: InspectionTemplateInput
};


export type MutationCloneInspectionTemplateArgs = {
  idToClone: Scalars['String']
};


export type MutationSaveMakeArgs = {
  data: MakeInput
};


export type MutationSavePaymentPlanArgs = {
  data: PaymentPlanInput
};


export type MutationSaveRoleArgs = {
  data: RoleInput
};


export type MutationFindUsersForSelectArgs = {
  clientId: Scalars['String'],
  searchText?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>
};


export type MutationSigninArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  uuid?: Maybe<Scalars['String']>
};


export type MutationSigninWithBiometricsArgs = {
  uuid: Scalars['String']
};


export type MutationSaveMyAccountArgs = {
  data: UserInput
};


export type MutationSaveUserArgs = {
  data: UserInput
};


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
};


export type MutationAcceptAgreementArgs = {
  agreementType: AgreementTypeEnum,
  sendEmail: Scalars['Boolean']
};


export type MutationGetSignedImageUrlsForInspectionArgs = {
  inspectionId: Scalars['String'],
  checklistId?: Maybe<Scalars['String']>,
  images: Array<ImageInfoInput>
};


export type MutationGetSignedImageUrlForMeterImageArgs = {
  inspectionId: Scalars['String'],
  image: ImageInfoInput
};


export type MutationGetSignedImageUrlsForWorkOrderArgs = {
  images: Array<ImageInfoInput>
};


export type MutationFindServiceIntervalsArgs = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String']
};


export type MutationSaveServiceIntervalArgs = {
  data: ServiceIntervalInput
};


export type MutationSaveWorkOrderArgs = {
  data: WorkOrderInput
};


export type MutationSaveWorkOrderStatusArgs = {
  data: WorkOrderStatusInput
};


export type MutationSaveProblemReportArgs = {
  data: ProblemReportInput
};


export type MutationSaveFluidsArgs = {
  data: Array<FluidInput>
};


export type MutationSaveFluidReportArgs = {
  data: FluidReportInput
};


export type MutationSaveLogEntryArgs = {
  data: LogEntryInput
};


export type MutationFindOfficeLocationsForSelectArgs = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String']
};


export type MutationFindOfficeLocationsReferenceArgs = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String']
};


export type MutationSaveOfficeLocationArgs = {
  data: OfficeLocationInput
};


export type MutationFindJobsForSelectArgs = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String']
};


export type MutationSaveJobArgs = {
  data: JobInput
};


export type MutationSaveRolePermissionArgs = {
  data: RolePermissionInput
};


export type MutationDeleteArgs = {
  id: Scalars['String']
};


export type MutationSaveNotificationArgs = {
  data: MakeInput
};

export type Notification = {
   __typename?: 'Notification',
  id: Scalars['ID'],
  notificationSource: NotificationSourceEnum,
  client: IdNameReference,
  officeLocation: OfficeLocationReference,
  job: JobReference,
  alertedUsers?: Maybe<Array<UserReference>>,
  equipment?: Maybe<DetailedEquipmentReference>,
  oneTime?: Maybe<Scalars['Boolean']>,
  inspection?: Maybe<InspectionReference>,
  serviceInterval?: Maybe<ServiceIntervalReference>,
  workOrderId?: Maybe<Scalars['String']>,
  fluidReportId?: Maybe<Scalars['String']>,
  milestoneMeterValue?: Maybe<Scalars['Int']>,
  milestoneMeterValueMultiplier?: Maybe<Scalars['Int']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
  viewedOn?: Maybe<Scalars['DateTime']>,
  completedOn?: Maybe<Scalars['DateTime']>,
};

/** What Sparked the Notification */
export enum NotificationSourceEnum {
  ServiceItem = 'ServiceItem',
  WorkOrder = 'WorkOrder',
  FluidReport = 'FluidReport',
  Inspection = 'Inspection'
}

export type NotificationTableList = {
   __typename?: 'NotificationTableList',
  notifications: Array<Notification>,
  totalRows: Scalars['Int'],
};

export type OfficeLocation = {
   __typename?: 'OfficeLocation',
  name: Scalars['String'],
  administrator?: Maybe<UserReference>,
  client: IdNameReference,
  equipment?: Maybe<Array<DetailedEquipmentReference>>,
  addresses?: Maybe<Array<Address>>,
  phones?: Maybe<Array<Phone>>,
  operators?: Maybe<Array<UserReference>>,
  mechanics?: Maybe<Array<UserReference>>,
  notificationUsers?: Maybe<Array<UserReference>>,
  id: Scalars['ID'],
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type OfficeLocationInput = {
  name: Scalars['String'],
  client?: Maybe<IdNameReferenceInput>,
  website?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  administrator?: Maybe<UserReferenceInput>,
  equipment?: Maybe<Array<DetailedEquipmentReferenceInput>>,
  addresses?: Maybe<Array<AddressInput>>,
  phones?: Maybe<Array<PhoneInput>>,
  operators?: Maybe<Array<UserReferenceInput>>,
  mechanics?: Maybe<Array<UserReferenceInput>>,
  notificationUsers?: Maybe<Array<UserReferenceInput>>,
  id?: Maybe<Scalars['ID']>,
};

export type OfficeLocationReference = {
   __typename?: 'OfficeLocationReference',
  name: Scalars['String'],
  client: IdNameReference,
  id: Scalars['ID'],
  notificationUsers?: Maybe<Array<UserReference>>,
};

export type OfficeLocationTableList = {
   __typename?: 'OfficeLocationTableList',
  officeLocations: Array<OfficeLocation>,
  totalRows: Scalars['Int'],
};

export type PaymentPlan = {
   __typename?: 'PaymentPlan',
  name: Scalars['String'],
  minimumUsers: Scalars['Int'],
  maximumUsers: Scalars['Int'],
  pricePerUser: Scalars['Float'],
  onboardingFeePerUser: Scalars['Float'],
  billingPeriod: BillingPeriodEnum,
  maintenanceFee: Scalars['Float'],
  discountAmount: Scalars['Int'],
  discountType: DiscountTypeEnum,
  id?: Maybe<Scalars['ID']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type PaymentPlanInput = {
  name: Scalars['String'],
  minimumUsers: Scalars['Int'],
  maximumUsers: Scalars['Int'],
  pricePerUser: Scalars['Float'],
  onboardingFeePerUser: Scalars['Float'],
  billingPeriod: BillingPeriodEnum,
  maintenanceFee: Scalars['Float'],
  discountAmount: Scalars['Int'],
  discountType: DiscountTypeEnum,
  id?: Maybe<Scalars['ID']>,
};

export type PaymentPlanReference = {
   __typename?: 'PaymentPlanReference',
  id: Scalars['String'],
  name: Scalars['String'],
};

export type PaymentPlanReferenceInput = {
  id: Scalars['String'],
  name: Scalars['String'],
};

export type PayTableList = {
   __typename?: 'PayTableList',
  paymentPlans: Array<PaymentPlan>,
  totalRows: Scalars['Int'],
};

export type Permission = {
   __typename?: 'Permission',
  name: Scalars['String'],
  type: RoleTypeEnum,
  privileges: Array<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

export type PermissionInput = {
  name: Scalars['String'],
  type: RoleTypeEnum,
  privileges: Array<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

export type Phone = {
   __typename?: 'Phone',
  type: PhoneTypeEnum,
  digits: Scalars['String'],
  extension?: Maybe<Scalars['String']>,
};

export type PhoneInput = {
  type: PhoneTypeEnum,
  digits: Scalars['String'],
  extension?: Maybe<Scalars['String']>,
};

/** Type of Phone Number */
export enum PhoneTypeEnum {
  Home = 'Home',
  Business = 'Business',
  Fax = 'Fax',
  Mobile = 'Mobile',
  Department = 'Department',
  Other = 'Other'
}

export type ProblemReportInput = {
  id?: Maybe<Scalars['ID']>,
  equipment?: Maybe<EquipmentReferenceInput>,
  detailedEquipment?: Maybe<DetailedEquipmentReferenceInput>,
  notes: Scalars['String'],
  meterValue?: Maybe<Scalars['Float']>,
};

export type Query = {
   __typename?: 'Query',
  equipment: EquipmentTableList,
  chartEquipmentDay: ResponseChartEquipment,
  equipmentForSelect: Array<DetailedEquipmentReference>,
  myEquipment: EquipmentTableList,
  equipmentById: Equipment,
  clients: ClientTableList,
  clientById: Client,
  dealers: DealerTableList,
  dealersSearch: DealerTableList,
  dealersContact: DealerContactTableList,
  dealerById: Dealer,
  inspections: InspectionTableList,
  inspectionsPrint: InspectionTableList,
  chartInspection: ResponseChartInspection,
  chartInspectionByDay: ResponseChartInspection,
  inspectionsForEquipment: InspectionEquipmentTableList,
  inspectionById: Inspection,
  getNewInspection: Inspection,
  classifications: ClassificationTableList,
  inspectionTemplates: InspectionTemplateTableList,
  inspectionTemplatesForSelection: InspectionTemplateForSelectionList,
  inspectionTemplateById: InspectionTemplate,
  makes: MakeTableList,
  makeById: Make,
  paymentPlans: PayTableList,
  paymentPlanById: PaymentPlan,
  roles: RoleTableList,
  availableRoles: RoleTableList,
  roleById: Role,
  rolesByType: Array<Role>,
  availablePermissions: Array<AvailablePermission>,
  saveRolePermissionsByType: RolePermissionsByType,
  me: MeResponse,
  users: UserTableList,
  userById: User,
  userByEmail: User,
  userByRoleType: Array<User>,
  userByClientId: Array<User>,
  serviceIntervals: ServiceIntervalTableList,
  serviceIntervalById: ServiceInterval,
  workOrders: WorkOrderTableList,
  workOrdersPrint: WorkOrderTableList,
  workOrderById: WorkOrder,
  fluids: FluidTableList,
  chartTotal: ResponseChartTotal,
  chartDay: ResponseChartDay,
  fluidReports: FluidReportTableList,
  fluidReportsExcel: FluidReportTableList,
  logEntries: RoleTableList,
  officeLocations: OfficeLocationTableList,
  officeLocationById: OfficeLocation,
  jobs: JobTableList,
  jobById: Job,
  rolePermissions: RolePermissionTableList,
  rolePermissionById: RolePermission,
  rolePermissionsForAssignment: Array<RolePermission>,
  notifications: NotificationTableList,
  notificationById: Notification,
};


export type QueryEquipmentArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryChartEquipmentDayArgs = {
  equipmentId: Scalars['String']
};


export type QueryEquipmentForSelectArgs = {
  clientId: Scalars['String'],
  searchText?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>
};


export type QueryMyEquipmentArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryEquipmentByIdArgs = {
  id: Scalars['String']
};


export type QueryClientsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryClientByIdArgs = {
  id: Scalars['String']
};


export type QueryDealersArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryDealersSearchArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryDealersContactArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  type: Scalars['String']
};


export type QueryDealerByIdArgs = {
  id: Scalars['String']
};


export type QueryInspectionsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryInspectionsPrintArgs = {
  selectedInspections: Array<Scalars['String']>
};


export type QueryChartInspectionByDayArgs = {
  equipmentId: Scalars['String']
};


export type QueryInspectionsForEquipmentArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryInspectionByIdArgs = {
  id: Scalars['String']
};


export type QueryGetNewInspectionArgs = {
  equipmentId: Scalars['String']
};


export type QueryInspectionTemplatesArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryInspectionTemplatesForSelectionArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryInspectionTemplateByIdArgs = {
  id: Scalars['String']
};


export type QueryMakesArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryMakeByIdArgs = {
  id: Scalars['String']
};


export type QueryPaymentPlansArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryPaymentPlanByIdArgs = {
  id: Scalars['String']
};


export type QueryRolesArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryAvailableRolesArgs = {
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  userId?: Maybe<Scalars['String']>
};


export type QueryRoleByIdArgs = {
  id: Scalars['String']
};


export type QueryRolesByTypeArgs = {
  type: Scalars['String']
};


export type QuerySaveRolePermissionsByTypeArgs = {
  data: RolePermissionsByTypeInput
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryUserByIdArgs = {
  id: Scalars['String']
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']
};


export type QueryUserByRoleTypeArgs = {
  roleType: Scalars['String']
};


export type QueryUserByClientIdArgs = {
  clientId: Scalars['String'],
  searchText?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>
};


export type QueryServiceIntervalsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryServiceIntervalByIdArgs = {
  id: Scalars['String']
};


export type QueryWorkOrdersArgs = {
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  completed?: Maybe<Scalars['Boolean']>,
  equipmentId?: Maybe<Scalars['String']>
};


export type QueryWorkOrdersPrintArgs = {
  selectedInspections: Array<Scalars['String']>
};


export type QueryWorkOrderByIdArgs = {
  id: Scalars['String']
};


export type QueryChartDayArgs = {
  dateFrom?: Maybe<Scalars['DateTime']>,
  dateTo?: Maybe<Scalars['DateTime']>,
  selectedFluids?: Maybe<Array<Scalars['String']>>
};


export type QueryFluidReportsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  filter?: Maybe<Filter>,
  id?: Maybe<Scalars['String']>
};


export type QueryLogEntriesArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryOfficeLocationsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryOfficeLocationByIdArgs = {
  id: Scalars['String']
};


export type QueryJobsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryJobByIdArgs = {
  id: Scalars['String']
};


export type QueryRolePermissionsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryRolePermissionByIdArgs = {
  id: Scalars['String']
};


export type QueryNotificationsArgs = {
  skip?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryNotificationByIdArgs = {
  id: Scalars['String']
};

export type ResetPasswordInput = {
  token: Scalars['String'],
  password: Scalars['String'],
  confirm: Scalars['String'],
};

export type ResponseChartDay = {
   __typename?: 'ResponseChartDay',
  chartByDayDataJSON: Scalars['String'],
  fluidNames: Array<Scalars['String']>,
};

export type ResponseChartEquipment = {
   __typename?: 'ResponseChartEquipment',
  chartData: Array<EquipmentUsageDay>,
};

export type ResponseChartInspection = {
   __typename?: 'ResponseChartInspection',
  chartData: Array<InspectionChart>,
};

export type ResponseChartTotal = {
   __typename?: 'ResponseChartTotal',
  chartData: Array<FluidReport>,
};

export type Role = {
   __typename?: 'Role',
  name: Scalars['String'],
  type: RoleTypeEnum,
  scope: RoleScopeEnum,
  permissions: Array<Permission>,
  id?: Maybe<Scalars['ID']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type RoleInput = {
  name: Scalars['String'],
  type: RoleTypeEnum,
  scope: RoleScopeEnum,
  permissions: Array<PermissionInput>,
  id?: Maybe<Scalars['ID']>,
};

export type RolePermission = {
   __typename?: 'RolePermission',
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  type: Scalars['String'],
  privileges: Array<Scalars['String']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type RolePermissionInput = {
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  type: Scalars['String'],
  privileges: Array<Scalars['String']>,
};

export type RolePermissionsByType = {
   __typename?: 'RolePermissionsByType',
  corporate: Array<AvailablePermission>,
  developer: Array<AvailablePermission>,
  client: Array<AvailablePermission>,
};

export type RolePermissionsByTypeInput = {
  corporate: Array<AvailablePermissionInput>,
  developer: Array<AvailablePermissionInput>,
  client: Array<AvailablePermissionInput>,
};

export type RolePermissionTableList = {
   __typename?: 'RolePermissionTableList',
  rolePermissions: Array<RolePermission>,
  totalRows: Scalars['Int'],
};

export type RoleReference = {
   __typename?: 'RoleReference',
  id: Scalars['String'],
  name: Scalars['String'],
  permissions: Array<Scalars['String']>,
};

export type RoleReferenceInput = {
  id: Scalars['String'],
  name: Scalars['String'],
  permissions: Array<Scalars['String']>,
};

/** Determines if a Role is Global or Client Specific */
export enum RoleScopeEnum {
  Global = 'Global',
  Client = 'Client'
}

export type RoleTableList = {
   __typename?: 'RoleTableList',
  roles: Array<Role>,
  totalRows: Scalars['Int'],
};

/** The Basic Types of Roles */
export enum RoleTypeEnum {
  Client = 'Client',
  Corporate = 'Corporate',
  Developer = 'Developer'
}

export type SaveChecklistItemInput = {
  inspectionId: Scalars['String'],
  checklist: InspectionChecklistItemInput,
};

export type SaveChecklistItemNotesInput = {
  inspectionId: Scalars['String'],
  checklistItemId: Scalars['String'],
  notes: Scalars['String'],
};

export type ServiceInterval = {
   __typename?: 'ServiceInterval',
  id?: Maybe<Scalars['ID']>,
  title: Scalars['String'],
  meterType: Scalars['String'],
  make?: Maybe<Scalars['String']>,
  model?: Maybe<Scalars['String']>,
  milestones?: Maybe<Array<ServiceIntervalMilestone>>,
  client?: Maybe<IdNameReference>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type ServiceIntervalInput = {
  id?: Maybe<Scalars['ID']>,
  title: Scalars['String'],
  make: Scalars['String'],
  model: Scalars['String'],
  meterType: Scalars['String'],
  milestones?: Maybe<Array<ServiceIntervalMilestoneInput>>,
  client?: Maybe<IdNameReferenceInput>,
};

export type ServiceIntervalMilestone = {
   __typename?: 'ServiceIntervalMilestone',
  title: Scalars['String'],
  oneTime?: Maybe<Scalars['Boolean']>,
  alertBeforeDue: Scalars['Int'],
  meterValue: Scalars['Int'],
  serviceItems?: Maybe<Array<ServiceIntervalServiceItem>>,
  id?: Maybe<Scalars['Float']>,
};

export type ServiceIntervalMilestoneInput = {
  id: Scalars['Float'],
  title: Scalars['String'],
  oneTime?: Maybe<Scalars['Boolean']>,
  alertBeforeDue: Scalars['Int'],
  meterValue: Scalars['Int'],
  serviceItems?: Maybe<Array<ServiceIntervalServiceItemInput>>,
};

export type ServiceIntervalMilestoneReference = {
   __typename?: 'ServiceIntervalMilestoneReference',
  id: Scalars['String'],
  title: Scalars['String'],
  oneTime?: Maybe<Scalars['Boolean']>,
  serviceDue?: Maybe<Scalars['Boolean']>,
  alertBeforeServiceDue?: Maybe<Scalars['Boolean']>,
};

export type ServiceIntervalNotificationReference = {
   __typename?: 'ServiceIntervalNotificationReference',
  id: Scalars['String'],
  title: Scalars['String'],
  milestone: ServiceIntervalMilestoneReference,
  currentMeterValue: Scalars['Float'],
  meterType: Scalars['String'],
};

export type ServiceIntervalReference = {
   __typename?: 'ServiceIntervalReference',
  id: Scalars['String'],
  title: Scalars['String'],
};

export type ServiceIntervalServiceItem = {
   __typename?: 'ServiceIntervalServiceItem',
  name: Scalars['String'],
  partName?: Maybe<Scalars['String']>,
  partNumber?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  fromMilestoneId?: Maybe<Scalars['String']>,
  isNew?: Maybe<Scalars['Boolean']>,
};

export type ServiceIntervalServiceItemInput = {
  name: Scalars['String'],
  partName?: Maybe<Scalars['String']>,
  partNumber?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  fromMilestoneId?: Maybe<Scalars['String']>,
};

export type ServiceIntervalTableList = {
   __typename?: 'ServiceIntervalTableList',
  serviceIntervals: Array<ServiceInterval>,
  totalRows: Scalars['Int'],
};

export type SignedImageUrl = {
   __typename?: 'SignedImageUrl',
  fileName: Scalars['String'],
  awsWebUrl: Scalars['String'],
  signedUrl: Scalars['String'],
};

export type SignedImageUrlForInspection = {
   __typename?: 'SignedImageUrlForInspection',
  fileName: Scalars['String'],
  awsWebUrl: Scalars['String'],
  signedUrl: Scalars['String'],
  checklistId: Scalars['String'],
};

export type SignedImageUrlForMeterImage = {
   __typename?: 'SignedImageUrlForMeterImage',
  fileName: Scalars['String'],
  awsWebUrl: Scalars['String'],
  signedUrl: Scalars['String'],
};

export type SignedImageUrlForWorkOrder = {
   __typename?: 'SignedImageUrlForWorkOrder',
  images: Array<SignedImageUrl>,
  workOrderId: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  publicId?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  password: Scalars['String'],
  active: Scalars['Boolean'],
  roles: Array<UserRoleReference>,
  id?: Maybe<Scalars['ID']>,
  middleName?: Maybe<Scalars['String']>,
  avatarUrl?: Maybe<Scalars['String']>,
  client?: Maybe<IdNameReference>,
  officeLocations?: Maybe<Array<OfficeLocationReference>>,
  addresses?: Maybe<Array<Address>>,
  phones?: Maybe<Array<Phone>>,
  supervisor?: Maybe<UserReference>,
  mobileDevices?: Maybe<Array<MobileDevice>>,
  agreements?: Maybe<Array<UserAgreement>>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
  name: Scalars['String'],
};

export type UserAgreement = {
   __typename?: 'UserAgreement',
  type: Scalars['String'],
  version: Scalars['Float'],
  createdOn?: Maybe<Scalars['DateTime']>,
};

export type UserInput = {
  publicId?: Maybe<Scalars['String']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  password: Scalars['String'],
  active: Scalars['Boolean'],
  roles?: Maybe<Array<UserRoleReferenceInput>>,
  rolesIds?: Maybe<Array<Scalars['String']>>,
  id?: Maybe<Scalars['ID']>,
  middleName?: Maybe<Scalars['String']>,
  avatarUrl?: Maybe<Scalars['String']>,
  client?: Maybe<IdNameReferenceInput>,
  officeLocations?: Maybe<Array<IdNameReferenceInput>>,
  clientId?: Maybe<Scalars['String']>,
  addresses?: Maybe<Array<AddressInput>>,
  phones?: Maybe<Array<PhoneInput>>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type UserReference = {
   __typename?: 'UserReference',
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
};

export type UserReferenceInput = {
  id: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
};

export type UserRolePermission = {
   __typename?: 'UserRolePermission',
  name: Scalars['String'],
  type: RoleTypeEnum,
  privileges: Array<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

export type UserRolePermissionInput = {
  name: Scalars['String'],
  type: RoleTypeEnum,
  privileges: Array<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

export type UserRoleReference = {
   __typename?: 'UserRoleReference',
  id: Scalars['String'],
  name: Scalars['String'],
  type: Scalars['String'],
  scope: RoleScopeEnum,
  permissions: Array<UserRolePermission>,
};

export type UserRoleReferenceInput = {
  id: Scalars['String'],
  name: Scalars['String'],
  type: Scalars['String'],
  scope: RoleScopeEnum,
  permissions: Array<UserRolePermissionInput>,
};

export type UserTableList = {
   __typename?: 'UserTableList',
  users: Array<User>,
  totalRows: Scalars['Int'],
};

export type WarrantyInfo = {
   __typename?: 'WarrantyInfo',
  duration: Scalars['Int'],
  type: WarrantyInfoTypeEnum,
};

export type WarrantyInfoInput = {
  duration: Scalars['Int'],
  type: WarrantyInfoTypeEnum,
};

/** Duration Type for Warranty */
export enum WarrantyInfoTypeEnum {
  Hours = 'Hours',
  Years = 'Years'
}

export type WorkOrder = {
   __typename?: 'WorkOrder',
  id?: Maybe<Scalars['ID']>,
  equipment?: Maybe<DetailedEquipmentReference>,
  serviceInterval?: Maybe<ServiceIntervalNotificationReference>,
  inspection?: Maybe<InspectionNotificationReference>,
  workItems: Array<WorkOrderWorkItem>,
  client: IdNameReference,
  officeLocation?: Maybe<IdNameReference>,
  job?: Maybe<JobReference>,
  reportedBy: UserReference,
  assignedTo: Array<UserReference>,
  notes: Scalars['String'],
  history: Array<WorkOrderHistoryItem>,
  photos?: Maybe<Array<Scalars['String']>>,
  status: WorkOrderStatusEnum,
  meterValue?: Maybe<Scalars['Float']>,
  assignedOn?: Maybe<Scalars['DateTime']>,
  completedOn?: Maybe<Scalars['DateTime']>,
  createdOn?: Maybe<Scalars['DateTime']>,
  updatedOn?: Maybe<Scalars['DateTime']>,
};

export type WorkOrderHistoryItem = {
   __typename?: 'WorkOrderHistoryItem',
  id: Scalars['String'],
  message: Scalars['String'],
  user: UserReference,
  enteredOn: Scalars['DateTime'],
};

export type WorkOrderInput = {
  id?: Maybe<Scalars['ID']>,
  equipment?: Maybe<EquipmentReferenceInput>,
  detailedEquipment?: Maybe<DetailedEquipmentReferenceInput>,
  equipmentId?: Maybe<Scalars['String']>,
  assignedTo?: Maybe<Array<UserReferenceInput>>,
  assignedToIds?: Maybe<Array<Scalars['String']>>,
  notes: Scalars['String'],
  photos?: Maybe<Array<Scalars['String']>>,
  status?: Maybe<WorkOrderStatusEnum>,
  client?: Maybe<IdNameReferenceInput>,
  clientId?: Maybe<Scalars['String']>,
  meterValue?: Maybe<Scalars['Float']>,
};

/** Status or step of a Work Order */
export enum WorkOrderStatusEnum {
  Open = 'Open',
  AssessingRepair = 'AssessingRepair',
  WaitingForParts = 'WaitingForParts',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export type WorkOrderStatusInput = {
  id?: Maybe<Scalars['ID']>,
  assignedTo?: Maybe<Array<UserReferenceInput>>,
  notes: Scalars['String'],
  status?: Maybe<WorkOrderStatusEnum>,
};

export type WorkOrderTableList = {
   __typename?: 'WorkOrderTableList',
  workOrders: Array<WorkOrder>,
  totalRows: Scalars['Int'],
};

export type WorkOrderWorkItem = {
   __typename?: 'WorkOrderWorkItem',
  id: Scalars['String'],
  title: Scalars['String'],
  partName?: Maybe<Scalars['String']>,
  partNumber?: Maybe<Scalars['String']>,
  history: Array<WorkOrderHistoryItem>,
  photos?: Maybe<Array<Scalars['String']>>,
  completed: Scalars['Boolean'],
  completedBy?: Maybe<UserReference>,
  completedOn?: Maybe<Scalars['DateTime']>,
};

export type ClientsForSelectionMutationVariables = {
  searchText: Scalars['String']
};


export type ClientsForSelectionMutation = (
  { __typename?: 'Mutation' }
  & { clientsForSelection: Array<(
    { __typename?: 'IdNameReference' }
    & Pick<IdNameReference, 'id' | 'name'>
  )> }
);

export type SaveClientMutationVariables = {
  data: ClientInput
};


export type SaveClientMutation = (
  { __typename?: 'Mutation' }
  & { saveClient: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'name' | 'loginDomain' | 'website'>
  ) }
);

export type DistinctClassificationsMutationVariables = {
  classification: Scalars['String']
};


export type DistinctClassificationsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'distinctClassifications'>
);

export type SaveDealerMutationVariables = {
  data: DealerInput
};


export type SaveDealerMutation = (
  { __typename?: 'Mutation' }
  & { saveDealer: (
    { __typename?: 'Dealer' }
    & Pick<Dealer, 'id' | 'name' | 'createdOn' | 'updatedOn'>
    & { location: Maybe<(
      { __typename?: 'DealerAddress' }
      & Pick<DealerAddress, 'id' | 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>, parts: Maybe<Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )>>, sales: Maybe<Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )>>, service: Maybe<Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )>>, phones: Maybe<Array<(
      { __typename?: 'DealerPhone' }
      & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
    )>> }
  ) }
);

export type SaveDealerContactMutationVariables = {
  data: DealerContactInput
};


export type SaveDealerContactMutation = (
  { __typename?: 'Mutation' }
  & { saveDealerContact: (
    { __typename?: 'DealerContact' }
    & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
    & { phone: Maybe<(
      { __typename?: 'DealerPhone' }
      & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
    )> }
  ) }
);

export type DeleteMutationVariables = {
  id: Scalars['String']
};


export type DeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'delete'>
);

export type EquipmentNamesMutationVariables = {
  clientId: Scalars['String'],
  name: Scalars['String']
};


export type EquipmentNamesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'equipmentNames'>
);

export type MakesForSelectMutationVariables = {
  searchText: Scalars['String']
};


export type MakesForSelectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'makesForSelect'>
);

export type ModelsForSelectMutationVariables = {
  searchText: Scalars['String'],
  make: Scalars['String']
};


export type ModelsForSelectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'modelsForSelect'>
);

export type SaveEquipmentMutationVariables = {
  data: EquipmentInput
};


export type SaveEquipmentMutation = (
  { __typename?: 'Mutation' }
  & { saveEquipment: (
    { __typename?: 'Equipment' }
    & Pick<Equipment, 'id' | 'type' | 'name' | 'nickname' | 'vinOrSerial' | 'year' | 'classification' | 'attachment' | 'meterType' | 'meterValue' | 'make' | 'dateInService' | 'dateOutOfService'>
    & { expectedUsage: Maybe<(
      { __typename?: 'ExpectedUsage' }
      & Pick<ExpectedUsage, 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>
    )>, job: Maybe<(
      { __typename?: 'JobReference' }
      & Pick<JobReference, 'id' | 'name' | 'jobNumber'>
    )>, operators: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, mechanics: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, serviceInterval: Maybe<(
      { __typename?: 'IdTitleReference' }
      & Pick<IdTitleReference, 'id' | 'title'>
    )>, dealers: Maybe<Array<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = {
  data: ForgotPasswordInput
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'ForgotPasswordResponse' }
    & Pick<ForgotPasswordResponse, 'status'>
  ) }
);

export type ResetPasswordMutationVariables = {
  data: ResetPasswordInput
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'ForgotPasswordResponse' }
    & Pick<ForgotPasswordResponse, 'status'>
  ) }
);

export type CloneInspectionTemplateMutationVariables = {
  id: Scalars['String']
};


export type CloneInspectionTemplateMutation = (
  { __typename?: 'Mutation' }
  & { cloneInspectionTemplate: (
    { __typename?: 'InspectionTemplate' }
    & Pick<InspectionTemplate, 'id' | 'title' | 'classification' | 'equipmentType'>
    & { checklist: Array<(
      { __typename?: 'ChecklistItem' }
      & Pick<ChecklistItem, 'title' | 'type' | 'consumable' | 'photoRequired'>
      & { statuses: Maybe<Array<(
        { __typename?: 'ChecklistItemStatus' }
        & Pick<ChecklistItemStatus, 'text' | 'shouldSendAlert'>
      )>> }
    )> }
  ) }
);

export type InspectionTemplatesForSelectMutationVariables = {
  searchText: Scalars['String'],
  clientId: Scalars['String'],
  classification: Scalars['String']
};


export type InspectionTemplatesForSelectMutation = (
  { __typename?: 'Mutation' }
  & { inspectionTemplatesForSelect: Array<(
    { __typename?: 'InspectionTemplateReference' }
    & Pick<InspectionTemplateReference, 'id' | 'title'>
  )> }
);

export type SaveInspectionTemplateMutationVariables = {
  data: InspectionTemplateInput
};


export type SaveInspectionTemplateMutation = (
  { __typename?: 'Mutation' }
  & { saveInspectionTemplate: (
    { __typename?: 'InspectionTemplate' }
    & Pick<InspectionTemplate, 'id' | 'title' | 'classification' | 'attachment' | 'equipmentType'>
    & { checklist: Array<(
      { __typename?: 'ChecklistItem' }
      & Pick<ChecklistItem, 'title' | 'type' | 'consumable' | 'consumableFluid' | 'photoRequired'>
      & { statuses: Maybe<Array<(
        { __typename?: 'ChecklistItemStatus' }
        & Pick<ChecklistItemStatus, 'text' | 'shouldSendAlert'>
      )>> }
    )> }
  ) }
);

export type SaveChecklistItemNotesMutationVariables = {
  data: SaveChecklistItemNotesInput
};


export type SaveChecklistItemNotesMutation = (
  { __typename?: 'Mutation' }
  & { saveChecklistItemNotes: (
    { __typename?: 'Inspection' }
    & Pick<Inspection, 'id'>
    & { checklist: Array<(
      { __typename?: 'InspectionChecklistItem' }
      & Pick<InspectionChecklistItem, 'id' | 'notes'>
    )> }
  ) }
);

export type SaveInspectionMutationVariables = {
  data: InspectionInput
};


export type SaveInspectionMutation = (
  { __typename?: 'Mutation' }
  & { saveInspection: (
    { __typename?: 'Inspection' }
    & Pick<Inspection, 'id' | 'meterValue' | 'type'>
    & { equipment: (
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'make' | 'model'>
    ), client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, checklist: Array<(
      { __typename?: 'InspectionChecklistItem' }
      & Pick<InspectionChecklistItem, 'id' | 'title' | 'type' | 'consumable' | 'consumableAmount' | 'consumableUnitOfMeasure' | 'notes' | 'status' | 'photos'>
    )> }
  ) }
);

export type FindJobsForSelectMutationVariables = {
  searchText: Scalars['String'],
  clientId: Scalars['String']
};


export type FindJobsForSelectMutation = (
  { __typename?: 'Mutation' }
  & { findJobsForSelect: Array<(
    { __typename?: 'JobReference' }
    & Pick<JobReference, 'id' | 'name' | 'jobNumber'>
  )> }
);

export type SaveJobMutationVariables = {
  data: JobInput
};


export type SaveJobMutation = (
  { __typename?: 'Mutation' }
  & { saveJob: (
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'jobNumber' | 'name'>
    & { client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), officeLocation: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), notificationUsers: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, foreman: (
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    ), addresses: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>, equipment: Array<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'meterType' | 'classification' | 'make' | 'model' | 'vinOrSerial'>
    )>, operators: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, mechanics: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )> }
  ) }
);

export type SaveMakeMutationVariables = {
  data: MakeInput
};


export type SaveMakeMutation = (
  { __typename?: 'Mutation' }
  & { saveMake: (
    { __typename?: 'Make' }
    & Pick<Make, 'id' | 'name' | 'createdOn' | 'updatedOn'>
    & { models: Maybe<Array<(
      { __typename?: 'MakeModel' }
      & Pick<MakeModel, 'name' | 'equipmentType'>
    )>> }
  ) }
);

export type FindOfficeLocationsForSelectMutationVariables = {
  searchText: Scalars['String'],
  clientId: Scalars['String']
};


export type FindOfficeLocationsForSelectMutation = (
  { __typename?: 'Mutation' }
  & { findOfficeLocationsForSelect: Array<(
    { __typename?: 'IdNameReference' }
    & Pick<IdNameReference, 'id' | 'name'>
  )> }
);

export type FindOfficeLocationsReferenceMutationVariables = {
  searchText: Scalars['String'],
  clientId: Scalars['String']
};


export type FindOfficeLocationsReferenceMutation = (
  { __typename?: 'Mutation' }
  & { findOfficeLocationsReference: Array<(
    { __typename?: 'OfficeLocationReference' }
    & Pick<OfficeLocationReference, 'id' | 'name'>
    & { client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), notificationUsers: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>> }
  )> }
);

export type SaveOfficeLocationMutationVariables = {
  data: OfficeLocationInput
};


export type SaveOfficeLocationMutation = (
  { __typename?: 'Mutation' }
  & { saveOfficeLocation: (
    { __typename?: 'OfficeLocation' }
    & Pick<OfficeLocation, 'id' | 'name'>
    & { phones: Maybe<Array<(
      { __typename?: 'Phone' }
      & Pick<Phone, 'type' | 'digits' | 'extension'>
    )>>, addresses: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>>, notificationUsers: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, operators: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, mechanics: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, equipment: Maybe<Array<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'meterType' | 'classification' | 'make' | 'model' | 'vinOrSerial'>
    )>> }
  ) }
);

export type SaveRolePermissionMutationVariables = {
  data: RolePermissionInput
};


export type SaveRolePermissionMutation = (
  { __typename?: 'Mutation' }
  & { saveRolePermission: (
    { __typename?: 'RolePermission' }
    & Pick<RolePermission, 'id' | 'name' | 'type' | 'privileges'>
  ) }
);

export type FindServiceIntervalsMutationVariables = {
  searchText: Scalars['String'],
  clientId: Scalars['String']
};


export type FindServiceIntervalsMutation = (
  { __typename?: 'Mutation' }
  & { findServiceIntervals: Array<(
    { __typename?: 'IdTitleReference' }
    & Pick<IdTitleReference, 'id' | 'title'>
  )> }
);

export type SaveServiceIntervalMutationVariables = {
  data: ServiceIntervalInput
};


export type SaveServiceIntervalMutation = (
  { __typename?: 'Mutation' }
  & { saveServiceInterval: (
    { __typename?: 'ServiceInterval' }
    & Pick<ServiceInterval, 'id' | 'title' | 'make' | 'model' | 'meterType' | 'createdOn' | 'updatedOn'>
    & { client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, milestones: Maybe<Array<(
      { __typename?: 'ServiceIntervalMilestone' }
      & Pick<ServiceIntervalMilestone, 'id' | 'title' | 'alertBeforeDue' | 'meterValue' | 'oneTime'>
      & { serviceItems: Maybe<Array<(
        { __typename?: 'ServiceIntervalServiceItem' }
        & Pick<ServiceIntervalServiceItem, 'id' | 'name' | 'partName' | 'partNumber' | 'fromMilestoneId'>
      )>> }
    )>> }
  ) }
);

export type FindUsersForSelectMutationVariables = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String'],
  role?: Maybe<Scalars['String']>
};


export type FindUsersForSelectMutation = (
  { __typename?: 'Mutation' }
  & { findUsersForSelect: Array<(
    { __typename?: 'UserReference' }
    & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'MeResponse' }
    & { user: (
      { __typename?: 'LoggedInUser' }
      & Pick<LoggedInUser, 'id' | 'firstName' | 'lastName' | 'email'>
      & { client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, roles: Array<(
        { __typename?: 'UserRoleReference' }
        & Pick<UserRoleReference, 'name' | 'type'>
        & { permissions: Array<(
          { __typename?: 'UserRolePermission' }
          & Pick<UserRolePermission, 'name' | 'privileges'>
        )> }
      )> }
    ) }
  ) }
);

export type SaveMyAccountMutationVariables = {
  data: UserInput
};


export type SaveMyAccountMutation = (
  { __typename?: 'Mutation' }
  & { saveMyAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'active'>
    & { phones: Maybe<Array<(
      { __typename?: 'Phone' }
      & Pick<Phone, 'type' | 'digits' | 'extension'>
    )>>, addresses: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>> }
  ) }
);

export type SaveUserMutationVariables = {
  data: UserInput
};


export type SaveUserMutation = (
  { __typename?: 'Mutation' }
  & { saveUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'password' | 'active'>
    & { roles: Array<(
      { __typename?: 'UserRoleReference' }
      & Pick<UserRoleReference, 'id' | 'name' | 'type'>
      & { permissions: Array<(
        { __typename?: 'UserRolePermission' }
        & Pick<UserRolePermission, 'id' | 'name' | 'type' | 'privileges'>
      )> }
    )>, client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, phones: Maybe<Array<(
      { __typename?: 'Phone' }
      & Pick<Phone, 'type' | 'digits' | 'extension'>
    )>>, addresses: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>> }
  ) }
);

export type SigninMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user: (
      { __typename?: 'LoggedInUser' }
      & Pick<LoggedInUser, 'id' | 'firstName' | 'lastName' | 'email' | 'notificationCount'>
      & { client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, roles: Array<(
        { __typename?: 'UserRoleReference' }
        & Pick<UserRoleReference, 'id' | 'name' | 'type'>
        & { permissions: Array<(
          { __typename?: 'UserRolePermission' }
          & Pick<UserRolePermission, 'name' | 'privileges'>
        )> }
      )> }
    ) }
  ) }
);

export type SaveProblemReportMutationVariables = {
  data: ProblemReportInput
};


export type SaveProblemReportMutation = (
  { __typename?: 'Mutation' }
  & { saveProblemReport: (
    { __typename?: 'WorkOrder' }
    & Pick<WorkOrder, 'id' | 'notes' | 'status' | 'meterValue'>
  ) }
);

export type SaveWorkOrderMutationVariables = {
  data: WorkOrderInput
};


export type SaveWorkOrderMutation = (
  { __typename?: 'Mutation' }
  & { saveWorkOrder: (
    { __typename?: 'WorkOrder' }
    & Pick<WorkOrder, 'id' | 'notes' | 'status' | 'meterValue' | 'completedOn' | 'createdOn' | 'updatedOn'>
    & { equipment: Maybe<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'make' | 'model' | 'meterType' | 'vinOrSerial'>
    )>, client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), assignedTo: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )> }
  ) }
);

export type SaveWorkOrderStatusMutationVariables = {
  data: WorkOrderStatusInput
};


export type SaveWorkOrderStatusMutation = (
  { __typename?: 'Mutation' }
  & { saveWorkOrderStatus: (
    { __typename?: 'WorkOrder' }
    & Pick<WorkOrder, 'id' | 'notes' | 'status' | 'meterValue' | 'completedOn' | 'createdOn' | 'updatedOn'>
    & { equipment: Maybe<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'make' | 'model' | 'meterType' | 'vinOrSerial'>
    )>, client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), assignedTo: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )> }
  ) }
);

export type ClientByIdQueryVariables = {
  id: Scalars['String']
};


export type ClientByIdQuery = (
  { __typename?: 'Query' }
  & { clientById: (
    { __typename?: 'Client' }
    & Pick<Client, 'id' | 'uuid' | 'loginDomain' | 'name' | 'website'>
  ), officeLocations: (
    { __typename?: 'OfficeLocationTableList' }
    & Pick<OfficeLocationTableList, 'totalRows'>
    & { officeLocations: Array<(
      { __typename?: 'OfficeLocation' }
      & Pick<OfficeLocation, 'id' | 'name'>
      & { phones: Maybe<Array<(
        { __typename?: 'Phone' }
        & Pick<Phone, 'type' | 'digits' | 'extension'>
      )>>, addresses: Maybe<Array<(
        { __typename?: 'Address' }
        & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
      )>> }
    )> }
  ) }
);

export type ClientsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type ClientsQuery = (
  { __typename?: 'Query' }
  & { clients: (
    { __typename?: 'ClientTableList' }
    & Pick<ClientTableList, 'totalRows'>
    & { clients: Array<(
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'name' | 'loginDomain' | 'website' | 'updatedOn'>
    )> }
  ) }
);

export type ClientForSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type ClientForSelectionQuery = (
  { __typename?: 'Query' }
  & { clients: (
    { __typename?: 'ClientTableList' }
    & Pick<ClientTableList, 'totalRows'>
    & { clients: Array<(
      { __typename?: 'Client' }
      & Pick<Client, 'id' | 'name'>
    )> }
  ) }
);

export type DealerByIdQueryVariables = {
  id: Scalars['String']
};


export type DealerByIdQuery = (
  { __typename?: 'Query' }
  & { dealerById: (
    { __typename?: 'Dealer' }
    & Pick<Dealer, 'id' | 'name' | 'website' | 'email'>
    & { location: Maybe<(
      { __typename?: 'DealerAddress' }
      & Pick<DealerAddress, 'id' | 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>, parts: Maybe<Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )>>, sales: Maybe<Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )>>, service: Maybe<Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )>>, phones: Maybe<Array<(
      { __typename?: 'DealerPhone' }
      & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
    )>>, client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )> }
  ) }
);

export type DealersQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type DealersQuery = (
  { __typename?: 'Query' }
  & { dealers: (
    { __typename?: 'DealerTableList' }
    & Pick<DealerTableList, 'totalRows'>
    & { dealers: Array<(
      { __typename?: 'Dealer' }
      & Pick<Dealer, 'id' | 'name' | 'website' | 'email' | 'createdOn' | 'updatedOn'>
      & { phones: Maybe<Array<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )>>, parts: Maybe<Array<(
        { __typename?: 'DealerContact' }
        & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
        & { phone: Maybe<(
          { __typename?: 'DealerPhone' }
          & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
        )> }
      )>>, sales: Maybe<Array<(
        { __typename?: 'DealerContact' }
        & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
        & { phone: Maybe<(
          { __typename?: 'DealerPhone' }
          & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
        )> }
      )>>, service: Maybe<Array<(
        { __typename?: 'DealerContact' }
        & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
        & { phone: Maybe<(
          { __typename?: 'DealerPhone' }
          & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
        )> }
      )>>, location: Maybe<(
        { __typename?: 'DealerAddress' }
        & Pick<DealerAddress, 'id' | 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
      )>, client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type DealersForSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type DealersForSelectionQuery = (
  { __typename?: 'Query' }
  & { dealersSearch: (
    { __typename?: 'DealerTableList' }
    & Pick<DealerTableList, 'totalRows'>
    & { dealers: Array<(
      { __typename?: 'Dealer' }
      & Pick<Dealer, 'id' | 'name'>
    )> }
  ) }
);

export type DealersContactQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>,
  type: Scalars['String']
};


export type DealersContactQuery = (
  { __typename?: 'Query' }
  & { dealersContact: (
    { __typename?: 'DealerContactTableList' }
    & Pick<DealerContactTableList, 'totalRows'>
    & { dealers: Array<(
      { __typename?: 'DealerContact' }
      & Pick<DealerContact, 'id' | 'firstName' | 'lastName' | 'email' | 'representativeType'>
      & { phone: Maybe<(
        { __typename?: 'DealerPhone' }
        & Pick<DealerPhone, 'type' | 'digits' | 'extension'>
      )> }
    )> }
  ) }
);

export type ChartEquipmentDayQueryVariables = {
  equipmentId: Scalars['String']
};


export type ChartEquipmentDayQuery = (
  { __typename?: 'Query' }
  & { chartEquipmentDay: (
    { __typename?: 'ResponseChartEquipment' }
    & { chartData: Array<(
      { __typename?: 'EquipmentUsageDay' }
      & Pick<EquipmentUsageDay, 'day' | 'actualUsage' | 'estimateUsage'>
    )> }
  ) }
);

export type EquipmentQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type EquipmentQuery = (
  { __typename?: 'Query' }
  & { equipment: (
    { __typename?: 'EquipmentTableList' }
    & Pick<EquipmentTableList, 'totalRows'>
    & { equipment: Array<(
      { __typename?: 'Equipment' }
      & Pick<Equipment, 'id' | 'type' | 'name' | 'nickname' | 'vinOrSerial' | 'year' | 'make' | 'classification' | 'attachment' | 'meterType' | 'meterValue' | 'updatedOn'>
      & { client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, dealers: Maybe<Array<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>>, officeLocation: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, job: Maybe<(
        { __typename?: 'JobReference' }
        & Pick<JobReference, 'id' | 'name' | 'jobNumber'>
      )> }
    )> }
  ) }
);

export type EquipmentByIdQueryVariables = {
  id: Scalars['String']
};


export type EquipmentByIdQuery = (
  { __typename?: 'Query' }
  & { equipmentById: (
    { __typename?: 'Equipment' }
    & Pick<Equipment, 'id' | 'type' | 'name' | 'nickname' | 'vinOrSerial' | 'year' | 'classification' | 'attachment' | 'meterType' | 'meterValue' | 'totalInspections' | 'make' | 'model' | 'dateInService' | 'dateOutOfService'>
    & { expectedUsage: Maybe<(
      { __typename?: 'ExpectedUsage' }
      & Pick<ExpectedUsage, 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>
    )>, inspectionTemplate: Maybe<(
      { __typename?: 'InspectionTemplateReference' }
      & Pick<InspectionTemplateReference, 'id' | 'title'>
    )>, officeLocation: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, job: Maybe<(
      { __typename?: 'JobReference' }
      & Pick<JobReference, 'id' | 'name' | 'jobNumber'>
    )>, dealers: Maybe<Array<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>>, operators: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, mechanics: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, serviceInterval: Maybe<(
      { __typename?: 'IdTitleReference' }
      & Pick<IdTitleReference, 'id' | 'title'>
    )> }
  ) }
);

export type EquipmentForSelectQueryVariables = {
  searchText?: Maybe<Scalars['String']>,
  clientId: Scalars['String'],
  role?: Maybe<Scalars['String']>
};


export type EquipmentForSelectQuery = (
  { __typename?: 'Query' }
  & { equipmentForSelect: Array<(
    { __typename?: 'DetailedEquipmentReference' }
    & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'meterType' | 'classification' | 'make' | 'model' | 'vinOrSerial'>
  )> }
);

export type EquipmentSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type EquipmentSelectionQuery = (
  { __typename?: 'Query' }
  & { equipment: (
    { __typename?: 'EquipmentTableList' }
    & Pick<EquipmentTableList, 'totalRows'>
    & { equipment: Array<(
      { __typename?: 'Equipment' }
      & Pick<Equipment, 'id' | 'name' | 'nickname' | 'meterType' | 'classification' | 'attachment'>
    )> }
  ) }
);

export type ChartDayQueryVariables = {
  dateFrom?: Maybe<Scalars['DateTime']>,
  dateTo?: Maybe<Scalars['DateTime']>,
  selectedFluids?: Maybe<Array<Scalars['String']>>
};


export type ChartDayQuery = (
  { __typename?: 'Query' }
  & { chartDay: (
    { __typename?: 'ResponseChartDay' }
    & Pick<ResponseChartDay, 'chartByDayDataJSON' | 'fluidNames'>
  ) }
);

export type ChartTotalQueryVariables = {};


export type ChartTotalQuery = (
  { __typename?: 'Query' }
  & { chartTotal: (
    { __typename?: 'ResponseChartTotal' }
    & { chartData: Array<(
      { __typename?: 'FluidReport' }
      & Pick<FluidReport, 'fluid' | 'amount'>
    )> }
  ) }
);

export type FluidReportsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type FluidReportsQuery = (
  { __typename?: 'Query' }
  & { fluidReports: (
    { __typename?: 'FluidReportTableList' }
    & Pick<FluidReportTableList, 'totalRows'>
    & { fluidReports: Array<(
      { __typename?: 'FluidReport' }
      & Pick<FluidReport, 'id' | 'fluid' | 'unitOfMeasure' | 'amount' | 'completedOn' | 'createdOn' | 'updatedOn'>
      & { equipment: (
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model'>
      ), user: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ), client: (
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      ) }
    )> }
  ) }
);

export type FluidSelectionQueryVariables = {};


export type FluidSelectionQuery = (
  { __typename?: 'Query' }
  & { fluids: (
    { __typename?: 'FluidTableList' }
    & Pick<FluidTableList, 'totalRows'>
    & { fluids: Array<(
      { __typename?: 'Fluid' }
      & Pick<Fluid, 'name'>
    )> }
  ) }
);

export type ClassificationsQueryVariables = {};


export type ClassificationsQuery = (
  { __typename?: 'Query' }
  & { classifications: (
    { __typename?: 'ClassificationTableList' }
    & Pick<ClassificationTableList, 'totalRows'>
    & { classifications: Array<(
      { __typename?: 'Classification' }
      & Pick<Classification, 'name'>
    )> }
  ) }
);

export type InspectionTemplateByIdQueryVariables = {
  id: Scalars['String']
};


export type InspectionTemplateByIdQuery = (
  { __typename?: 'Query' }
  & { inspectionTemplateById: (
    { __typename?: 'InspectionTemplate' }
    & Pick<InspectionTemplate, 'id' | 'title' | 'equipmentType' | 'classification' | 'attachment'>
    & { checklist: Array<(
      { __typename?: 'ChecklistItem' }
      & Pick<ChecklistItem, 'id' | 'title' | 'type' | 'consumable' | 'consumableFluid' | 'photoRequired'>
      & { statuses: Maybe<Array<(
        { __typename?: 'ChecklistItemStatus' }
        & Pick<ChecklistItemStatus, 'text' | 'shouldSendAlert' | 'isDefault'>
      )>> }
    )> }
  ) }
);

export type InspectionTemplatesQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type InspectionTemplatesQuery = (
  { __typename?: 'Query' }
  & { inspectionTemplates: (
    { __typename?: 'InspectionTemplateTableList' }
    & Pick<InspectionTemplateTableList, 'totalRows'>
    & { inspectionTemplates: Array<(
      { __typename?: 'InspectionTemplate' }
      & Pick<InspectionTemplate, 'id' | 'title' | 'equipmentType' | 'classification' | 'attachment' | 'updatedOn'>
      & { checklist: Array<(
        { __typename?: 'ChecklistItem' }
        & Pick<ChecklistItem, 'title' | 'type' | 'consumable' | 'consumableFluid' | 'photoRequired'>
        & { statuses: Maybe<Array<(
          { __typename?: 'ChecklistItemStatus' }
          & Pick<ChecklistItemStatus, 'text' | 'shouldSendAlert' | 'isDefault'>
        )>> }
      )> }
    )> }
  ) }
);

export type InspectionTemplatesSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type InspectionTemplatesSelectionQuery = (
  { __typename?: 'Query' }
  & { inspectionTemplates: (
    { __typename?: 'InspectionTemplateTableList' }
    & { inspectionTemplates: Array<(
      { __typename?: 'InspectionTemplate' }
      & Pick<InspectionTemplate, 'id' | 'title' | 'classification' | 'attachment'>
    )> }
  ) }
);

export type ChartInspectionQueryVariables = {};


export type ChartInspectionQuery = (
  { __typename?: 'Query' }
  & { chartInspection: (
    { __typename?: 'ResponseChartInspection' }
    & { chartData: Array<(
      { __typename?: 'InspectionChart' }
      & Pick<InspectionChart, 'id' | 'firstName' | 'lastName' | 'total'>
    )> }
  ) }
);

export type InspectionByIdQueryVariables = {
  id: Scalars['String']
};


export type InspectionByIdQuery = (
  { __typename?: 'Query' }
  & { inspectionById: (
    { __typename?: 'Inspection' }
    & Pick<Inspection, 'id' | 'type' | 'meterValue' | 'meterImage' | 'completedOn' | 'createdOn' | 'updatedOn'>
    & { equipment: (
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model'>
    ), checklist: Array<(
      { __typename?: 'InspectionChecklistItem' }
      & Pick<InspectionChecklistItem, 'id' | 'title' | 'type' | 'consumable' | 'consumableFluid' | 'consumableAmount' | 'consumableUnitOfMeasure' | 'notes' | 'status' | 'photos' | 'numericStatus' | 'textStatus'>
    )>, who: (
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    ), supervisor: Maybe<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )> }
  ) }
);

export type InspectionsForEquipmentQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type InspectionsForEquipmentQuery = (
  { __typename?: 'Query' }
  & { inspectionsForEquipment: (
    { __typename?: 'InspectionEquipmentTableList' }
    & Pick<InspectionEquipmentTableList, 'totalRows'>
    & { inspectionsForEquipment: Array<(
      { __typename?: 'Inspection' }
      & Pick<Inspection, 'id' | 'meterValue' | 'type' | 'completed' | 'completedOn' | 'createdOn' | 'updatedOn'>
      & { checklist: Array<(
        { __typename?: 'InspectionChecklistItem' }
        & Pick<InspectionChecklistItem, 'title'>
      )>, client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, equipment: (
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model'>
      ), who: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ), supervisor: Maybe<(
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      )> }
    )> }
  ) }
);

export type InspectionsForListQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type InspectionsForListQuery = (
  { __typename?: 'Query' }
  & { inspections: (
    { __typename?: 'InspectionTableList' }
    & Pick<InspectionTableList, 'totalRows'>
    & { inspections: Array<(
      { __typename?: 'Inspection' }
      & Pick<Inspection, 'id' | 'meterValue' | 'type' | 'completed' | 'completedOn' | 'createdOn' | 'updatedOn'>
      & { checklist: Array<(
        { __typename?: 'InspectionChecklistItem' }
        & Pick<InspectionChecklistItem, 'title'>
      )>, client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, equipment: (
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model'>
      ), who: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ), supervisor: Maybe<(
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      )> }
    )> }
  ) }
);

export type InspectionsPrintQueryVariables = {
  selectedInspections: Array<Scalars['String']>
};


export type InspectionsPrintQuery = (
  { __typename?: 'Query' }
  & { inspectionsPrint: (
    { __typename?: 'InspectionTableList' }
    & Pick<InspectionTableList, 'totalRows'>
    & { inspections: Array<(
      { __typename?: 'Inspection' }
      & Pick<Inspection, 'id' | 'type' | 'meterValue' | 'completedOn' | 'createdOn' | 'updatedOn'>
      & { equipment: (
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model'>
      ), checklist: Array<(
        { __typename?: 'InspectionChecklistItem' }
        & Pick<InspectionChecklistItem, 'id' | 'title' | 'type' | 'consumable' | 'consumableFluid' | 'consumableAmount' | 'consumableUnitOfMeasure' | 'notes' | 'status' | 'photos' | 'numericStatus' | 'textStatus'>
      )>, who: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ), supervisor: Maybe<(
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      )>, client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type JobByIdQueryVariables = {
  id: Scalars['String']
};


export type JobByIdQuery = (
  { __typename?: 'Query' }
  & { jobById: (
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'jobNumber' | 'name' | 'startDate' | 'endDate'>
    & { client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), officeLocation: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), notificationUsers: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, foreman: (
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    ), addresses: Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>, equipment: Array<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'meterType' | 'classification' | 'make' | 'model' | 'vinOrSerial'>
    )>, operators: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, mechanics: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )> }
  ) }
);

export type JobsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type JobsQuery = (
  { __typename?: 'Query' }
  & { jobs: (
    { __typename?: 'JobTableList' }
    & Pick<JobTableList, 'totalRows'>
    & { jobs: Array<(
      { __typename?: 'Job' }
      & Pick<Job, 'id' | 'jobNumber' | 'name'>
      & { client: (
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      ), foreman: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ), equipment: Array<(
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'meterType'>
      )> }
    )> }
  ) }
);

export type MakeByIdQueryVariables = {
  id: Scalars['String']
};


export type MakeByIdQuery = (
  { __typename?: 'Query' }
  & { makeById: (
    { __typename?: 'Make' }
    & Pick<Make, 'id' | 'name' | 'createdOn' | 'updatedOn'>
    & { models: Maybe<Array<(
      { __typename?: 'MakeModel' }
      & Pick<MakeModel, 'name' | 'equipmentType'>
    )>> }
  ) }
);

export type MakesQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type MakesQuery = (
  { __typename?: 'Query' }
  & { makes: (
    { __typename?: 'MakeTableList' }
    & Pick<MakeTableList, 'totalRows'>
    & { makes: Array<(
      { __typename?: 'Make' }
      & Pick<Make, 'id' | 'name' | 'createdOn' | 'updatedOn'>
      & { models: Maybe<Array<(
        { __typename?: 'MakeModel' }
        & Pick<MakeModel, 'name' | 'equipmentType'>
      )>> }
    )> }
  ) }
);

export type NotificationByIdQueryVariables = {
  id: Scalars['String']
};


export type NotificationByIdQuery = (
  { __typename?: 'Query' }
  & { notificationById: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'notificationSource'>
    & { client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), equipment: Maybe<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name'>
    )>, alertedUsers: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName'>
    )>>, officeLocation: (
      { __typename?: 'OfficeLocationReference' }
      & Pick<OfficeLocationReference, 'id' | 'name'>
    ), serviceInterval: Maybe<(
      { __typename?: 'ServiceIntervalReference' }
      & Pick<ServiceIntervalReference, 'id' | 'title'>
    )> }
  ) }
);

export type NotificationsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: (
    { __typename?: 'NotificationTableList' }
    & Pick<NotificationTableList, 'totalRows'>
    & { notifications: Array<(
      { __typename?: 'Notification' }
      & Pick<Notification, 'id' | 'notificationSource' | 'createdOn' | 'viewedOn'>
      & { client: (
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      ), equipment: Maybe<(
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name'>
      )>, alertedUsers: Maybe<Array<(
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      )>>, officeLocation: (
        { __typename?: 'OfficeLocationReference' }
        & Pick<OfficeLocationReference, 'id' | 'name'>
      ), serviceInterval: Maybe<(
        { __typename?: 'ServiceIntervalReference' }
        & Pick<ServiceIntervalReference, 'id' | 'title'>
      )> }
    )> }
  ) }
);

export type OfficeLocationByIdQueryVariables = {
  id: Scalars['String']
};


export type OfficeLocationByIdQuery = (
  { __typename?: 'Query' }
  & { officeLocationById: (
    { __typename?: 'OfficeLocation' }
    & Pick<OfficeLocation, 'id' | 'name'>
    & { administrator: Maybe<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), phones: Maybe<Array<(
      { __typename?: 'Phone' }
      & Pick<Phone, 'type' | 'digits' | 'extension'>
    )>>, notificationUsers: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, operators: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, mechanics: Maybe<Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>>, addresses: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>>, equipment: Maybe<Array<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'meterType' | 'classification' | 'make' | 'model' | 'vinOrSerial'>
    )>> }
  ) }
);

export type OfficeLocationsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type OfficeLocationsQuery = (
  { __typename?: 'Query' }
  & { officeLocations: (
    { __typename?: 'OfficeLocationTableList' }
    & Pick<OfficeLocationTableList, 'totalRows'>
    & { officeLocations: Array<(
      { __typename?: 'OfficeLocation' }
      & Pick<OfficeLocation, 'id' | 'name'>
      & { client: (
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      ), phones: Maybe<Array<(
        { __typename?: 'Phone' }
        & Pick<Phone, 'type' | 'digits' | 'extension'>
      )>>, addresses: Maybe<Array<(
        { __typename?: 'Address' }
        & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
      )>> }
    )> }
  ) }
);

export type RolePermissionByIdQueryVariables = {
  id: Scalars['String']
};


export type RolePermissionByIdQuery = (
  { __typename?: 'Query' }
  & { rolePermissionById: (
    { __typename?: 'RolePermission' }
    & Pick<RolePermission, 'id' | 'name' | 'type' | 'privileges'>
  ) }
);

export type RolePermissionsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type RolePermissionsQuery = (
  { __typename?: 'Query' }
  & { rolePermissions: (
    { __typename?: 'RolePermissionTableList' }
    & Pick<RolePermissionTableList, 'totalRows'>
    & { rolePermissions: Array<(
      { __typename?: 'RolePermission' }
      & Pick<RolePermission, 'id' | 'name' | 'type' | 'privileges'>
    )> }
  ) }
);

export type AvailableRolesQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['String']>
};


export type AvailableRolesQuery = (
  { __typename?: 'Query' }
  & { availableRoles: (
    { __typename?: 'RoleTableList' }
    & Pick<RoleTableList, 'totalRows'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'scope'>
      & { permissions: Array<(
        { __typename?: 'Permission' }
        & Pick<Permission, 'id' | 'name' | 'type' | 'privileges'>
      )> }
    )> }
  ) }
);

export type RolesQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles: (
    { __typename?: 'RoleTableList' }
    & Pick<RoleTableList, 'totalRows'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'type' | 'scope'>
      & { permissions: Array<(
        { __typename?: 'Permission' }
        & Pick<Permission, 'id' | 'name' | 'privileges'>
      )> }
    )> }
  ) }
);

export type RolesByTypeQueryVariables = {
  type: Scalars['String']
};


export type RolesByTypeQuery = (
  { __typename?: 'Query' }
  & { rolesByType: Array<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'type' | 'scope'>
    & { permissions: Array<(
      { __typename?: 'Permission' }
      & Pick<Permission, 'id' | 'name' | 'privileges'>
    )> }
  )> }
);

export type RolesForSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type RolesForSelectionQuery = (
  { __typename?: 'Query' }
  & { roles: (
    { __typename?: 'RoleTableList' }
    & Pick<RoleTableList, 'totalRows'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    )> }
  ) }
);

export type ServiceIntervalByIdQueryVariables = {
  id: Scalars['String']
};


export type ServiceIntervalByIdQuery = (
  { __typename?: 'Query' }
  & { serviceIntervalById: (
    { __typename?: 'ServiceInterval' }
    & Pick<ServiceInterval, 'id' | 'title' | 'make' | 'model' | 'meterType' | 'createdOn' | 'updatedOn'>
    & { client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, milestones: Maybe<Array<(
      { __typename?: 'ServiceIntervalMilestone' }
      & Pick<ServiceIntervalMilestone, 'id' | 'title' | 'alertBeforeDue' | 'meterValue' | 'oneTime'>
      & { serviceItems: Maybe<Array<(
        { __typename?: 'ServiceIntervalServiceItem' }
        & Pick<ServiceIntervalServiceItem, 'id' | 'name' | 'partName' | 'partNumber' | 'fromMilestoneId' | 'isNew'>
      )>> }
    )>> }
  ) }
);

export type ServiceIntervalsQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type ServiceIntervalsQuery = (
  { __typename?: 'Query' }
  & { serviceIntervals: (
    { __typename?: 'ServiceIntervalTableList' }
    & Pick<ServiceIntervalTableList, 'totalRows'>
    & { serviceIntervals: Array<(
      { __typename?: 'ServiceInterval' }
      & Pick<ServiceInterval, 'id' | 'title' | 'make' | 'model' | 'meterType' | 'createdOn' | 'updatedOn'>
      & { client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, milestones: Maybe<Array<(
        { __typename?: 'ServiceIntervalMilestone' }
        & Pick<ServiceIntervalMilestone, 'title' | 'alertBeforeDue' | 'meterValue' | 'oneTime'>
        & { serviceItems: Maybe<Array<(
          { __typename?: 'ServiceIntervalServiceItem' }
          & Pick<ServiceIntervalServiceItem, 'name' | 'partName' | 'partNumber'>
        )>> }
      )>> }
    )> }
  ) }
);

export type ServiceIntervalsForSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type ServiceIntervalsForSelectionQuery = (
  { __typename?: 'Query' }
  & { serviceIntervals: (
    { __typename?: 'ServiceIntervalTableList' }
    & Pick<ServiceIntervalTableList, 'totalRows'>
    & { serviceIntervals: Array<(
      { __typename?: 'ServiceInterval' }
      & Pick<ServiceInterval, 'id' | 'title' | 'meterType'>
    )> }
  ) }
);

export type UsersByClientIdQueryVariables = {
  clientId: Scalars['String'],
  role?: Maybe<Scalars['String']>
};


export type UsersByClientIdQuery = (
  { __typename?: 'Query' }
  & { userByClientId: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);

export type UsersByIdQueryVariables = {
  id: Scalars['String']
};


export type UsersByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'active' | 'password' | 'createdOn' | 'updatedOn'>
    & { roles: Array<(
      { __typename?: 'UserRoleReference' }
      & Pick<UserRoleReference, 'id' | 'name' | 'type'>
      & { permissions: Array<(
        { __typename?: 'UserRolePermission' }
        & Pick<UserRolePermission, 'id' | 'name' | 'type' | 'privileges'>
      )> }
    )>, supervisor: Maybe<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, client: Maybe<(
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    )>, addresses: Maybe<Array<(
      { __typename?: 'Address' }
      & Pick<Address, 'lineOne' | 'lineTwo' | 'lineThree' | 'city' | 'state' | 'postalCode' | 'country' | 'type'>
    )>>, phones: Maybe<Array<(
      { __typename?: 'Phone' }
      & Pick<Phone, 'type' | 'digits' | 'extension'>
    )>> }
  ) }
);

export type UsersForSelectionQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type UsersForSelectionQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserTableList' }
    & Pick<UserTableList, 'totalRows'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )> }
  ) }
);

export type UsersQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>
};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserTableList' }
    & Pick<UserTableList, 'totalRows'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'updatedOn'>
      & { client: Maybe<(
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      )>, phones: Maybe<Array<(
        { __typename?: 'Phone' }
        & Pick<Phone, 'type' | 'digits'>
      )>>, roles: Array<(
        { __typename?: 'UserRoleReference' }
        & Pick<UserRoleReference, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type UsersWithOperatorsAndMechanicsQueryVariables = {
  clientId: Scalars['String'],
  role?: Maybe<Scalars['String']>,
  searchText?: Maybe<Scalars['String']>
};


export type UsersWithOperatorsAndMechanicsQuery = (
  { __typename?: 'Query' }
  & { userByClientId: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )>, operators: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )>, mechanics: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);

export type WorkOrderByIdQueryVariables = {
  id: Scalars['String']
};


export type WorkOrderByIdQuery = (
  { __typename?: 'Query' }
  & { workOrderById: (
    { __typename?: 'WorkOrder' }
    & Pick<WorkOrder, 'id' | 'notes' | 'photos' | 'status' | 'meterValue' | 'assignedOn' | 'completedOn' | 'createdOn' | 'updatedOn'>
    & { equipment: Maybe<(
      { __typename?: 'DetailedEquipmentReference' }
      & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model' | 'vinOrSerial'>
    )>, client: (
      { __typename?: 'IdNameReference' }
      & Pick<IdNameReference, 'id' | 'name'>
    ), reportedBy: (
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    ), assignedTo: Array<(
      { __typename?: 'UserReference' }
      & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, inspection: Maybe<(
      { __typename?: 'InspectionNotificationReference' }
      & Pick<InspectionNotificationReference, 'id' | 'title'>
      & { inspectionChecklists: Array<(
        { __typename?: 'IdTitleReference' }
        & Pick<IdTitleReference, 'id' | 'title'>
      )> }
    )>, serviceInterval: Maybe<(
      { __typename?: 'ServiceIntervalNotificationReference' }
      & Pick<ServiceIntervalNotificationReference, 'id' | 'title'>
      & { milestone: (
        { __typename?: 'ServiceIntervalMilestoneReference' }
        & Pick<ServiceIntervalMilestoneReference, 'id' | 'title' | 'oneTime' | 'serviceDue' | 'alertBeforeServiceDue'>
      ) }
    )>, workItems: Array<(
      { __typename?: 'WorkOrderWorkItem' }
      & Pick<WorkOrderWorkItem, 'id' | 'title' | 'partName' | 'partNumber' | 'photos' | 'completed' | 'completedOn'>
      & { history: Array<(
        { __typename?: 'WorkOrderHistoryItem' }
        & Pick<WorkOrderHistoryItem, 'id' | 'message' | 'enteredOn'>
        & { user: (
          { __typename?: 'UserReference' }
          & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
        ) }
      )>, completedBy: Maybe<(
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      )> }
    )>, history: Array<(
      { __typename?: 'WorkOrderHistoryItem' }
      & Pick<WorkOrderHistoryItem, 'id' | 'message' | 'enteredOn'>
      & { user: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ) }
    )> }
  ) }
);

export type WorkOrdersQueryVariables = {
  skip: Scalars['Int'],
  pageSize: Scalars['Int'],
  searchText?: Maybe<Scalars['String']>,
  completed?: Maybe<Scalars['Boolean']>,
  equipmentId?: Maybe<Scalars['String']>
};


export type WorkOrdersQuery = (
  { __typename?: 'Query' }
  & { workOrders: (
    { __typename?: 'WorkOrderTableList' }
    & Pick<WorkOrderTableList, 'totalRows'>
    & { workOrders: Array<(
      { __typename?: 'WorkOrder' }
      & Pick<WorkOrder, 'id' | 'status' | 'meterValue' | 'completedOn' | 'assignedOn' | 'createdOn' | 'updatedOn'>
      & { equipment: Maybe<(
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'nickname' | 'make' | 'model' | 'meterType' | 'classification' | 'vinOrSerial'>
      )>, client: (
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      ), reportedBy: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName'>
      ), inspection: Maybe<(
        { __typename?: 'InspectionNotificationReference' }
        & Pick<InspectionNotificationReference, 'id' | 'title'>
      )>, serviceInterval: Maybe<(
        { __typename?: 'ServiceIntervalNotificationReference' }
        & Pick<ServiceIntervalNotificationReference, 'id' | 'title'>
      )> }
    )> }
  ) }
);

export type WorkOrdersPrintQueryVariables = {
  selectedInspections: Array<Scalars['String']>
};


export type WorkOrdersPrintQuery = (
  { __typename?: 'Query' }
  & { workOrdersPrint: (
    { __typename?: 'WorkOrderTableList' }
    & Pick<WorkOrderTableList, 'totalRows'>
    & { workOrders: Array<(
      { __typename?: 'WorkOrder' }
      & Pick<WorkOrder, 'id' | 'notes' | 'photos' | 'status' | 'meterValue' | 'completedOn' | 'createdOn' | 'updatedOn'>
      & { equipment: Maybe<(
        { __typename?: 'DetailedEquipmentReference' }
        & Pick<DetailedEquipmentReference, 'id' | 'name' | 'classification' | 'meterType' | 'make' | 'model' | 'vinOrSerial'>
      )>, client: (
        { __typename?: 'IdNameReference' }
        & Pick<IdNameReference, 'id' | 'name'>
      ), reportedBy: (
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      ), assignedTo: Array<(
        { __typename?: 'UserReference' }
        & Pick<UserReference, 'id' | 'firstName' | 'lastName' | 'email'>
      )>, inspection: Maybe<(
        { __typename?: 'InspectionNotificationReference' }
        & Pick<InspectionNotificationReference, 'id' | 'title'>
      )> }
    )> }
  ) }
);


export const ClientsForSelectionDocument = gql`
    mutation clientsForSelection($searchText: String!) {
  clientsForSelection(searchText: $searchText) {
    id
    name
  }
}
    `;
export type ClientsForSelectionMutationFn = ApolloReactCommon.MutationFunction<ClientsForSelectionMutation, ClientsForSelectionMutationVariables>;

/**
 * __useClientsForSelectionMutation__
 *
 * To run a mutation, you first call `useClientsForSelectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClientsForSelectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clientsForSelectionMutation, { data, loading, error }] = useClientsForSelectionMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useClientsForSelectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ClientsForSelectionMutation, ClientsForSelectionMutationVariables>) {
        return ApolloReactHooks.useMutation<ClientsForSelectionMutation, ClientsForSelectionMutationVariables>(ClientsForSelectionDocument, baseOptions);
      }
export type ClientsForSelectionMutationHookResult = ReturnType<typeof useClientsForSelectionMutation>;
export type ClientsForSelectionMutationResult = ApolloReactCommon.MutationResult<ClientsForSelectionMutation>;
export type ClientsForSelectionMutationOptions = ApolloReactCommon.BaseMutationOptions<ClientsForSelectionMutation, ClientsForSelectionMutationVariables>;
export const SaveClientDocument = gql`
    mutation saveClient($data: ClientInput!) {
  saveClient(data: $data) {
    id
    name
    loginDomain
    website
  }
}
    `;
export type SaveClientMutationFn = ApolloReactCommon.MutationFunction<SaveClientMutation, SaveClientMutationVariables>;

/**
 * __useSaveClientMutation__
 *
 * To run a mutation, you first call `useSaveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveClientMutation, { data, loading, error }] = useSaveClientMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveClientMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveClientMutation, SaveClientMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveClientMutation, SaveClientMutationVariables>(SaveClientDocument, baseOptions);
      }
export type SaveClientMutationHookResult = ReturnType<typeof useSaveClientMutation>;
export type SaveClientMutationResult = ApolloReactCommon.MutationResult<SaveClientMutation>;
export type SaveClientMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveClientMutation, SaveClientMutationVariables>;
export const DistinctClassificationsDocument = gql`
    mutation distinctClassifications($classification: String!) {
  distinctClassifications(classification: $classification)
}
    `;
export type DistinctClassificationsMutationFn = ApolloReactCommon.MutationFunction<DistinctClassificationsMutation, DistinctClassificationsMutationVariables>;

/**
 * __useDistinctClassificationsMutation__
 *
 * To run a mutation, you first call `useDistinctClassificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDistinctClassificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [distinctClassificationsMutation, { data, loading, error }] = useDistinctClassificationsMutation({
 *   variables: {
 *      classification: // value for 'classification'
 *   },
 * });
 */
export function useDistinctClassificationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DistinctClassificationsMutation, DistinctClassificationsMutationVariables>) {
        return ApolloReactHooks.useMutation<DistinctClassificationsMutation, DistinctClassificationsMutationVariables>(DistinctClassificationsDocument, baseOptions);
      }
export type DistinctClassificationsMutationHookResult = ReturnType<typeof useDistinctClassificationsMutation>;
export type DistinctClassificationsMutationResult = ApolloReactCommon.MutationResult<DistinctClassificationsMutation>;
export type DistinctClassificationsMutationOptions = ApolloReactCommon.BaseMutationOptions<DistinctClassificationsMutation, DistinctClassificationsMutationVariables>;
export const SaveDealerDocument = gql`
    mutation saveDealer($data: DealerInput!) {
  saveDealer(data: $data) {
    id
    name
    location {
      id
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
    parts {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    sales {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    service {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    phones {
      type
      digits
      extension
    }
    createdOn
    updatedOn
  }
}
    `;
export type SaveDealerMutationFn = ApolloReactCommon.MutationFunction<SaveDealerMutation, SaveDealerMutationVariables>;

/**
 * __useSaveDealerMutation__
 *
 * To run a mutation, you first call `useSaveDealerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDealerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDealerMutation, { data, loading, error }] = useSaveDealerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveDealerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveDealerMutation, SaveDealerMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveDealerMutation, SaveDealerMutationVariables>(SaveDealerDocument, baseOptions);
      }
export type SaveDealerMutationHookResult = ReturnType<typeof useSaveDealerMutation>;
export type SaveDealerMutationResult = ApolloReactCommon.MutationResult<SaveDealerMutation>;
export type SaveDealerMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveDealerMutation, SaveDealerMutationVariables>;
export const SaveDealerContactDocument = gql`
    mutation saveDealerContact($data: DealerContactInput!) {
  saveDealerContact(data: $data) {
    id
    firstName
    lastName
    email
    representativeType
    phone {
      type
      digits
      extension
    }
  }
}
    `;
export type SaveDealerContactMutationFn = ApolloReactCommon.MutationFunction<SaveDealerContactMutation, SaveDealerContactMutationVariables>;

/**
 * __useSaveDealerContactMutation__
 *
 * To run a mutation, you first call `useSaveDealerContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDealerContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDealerContactMutation, { data, loading, error }] = useSaveDealerContactMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveDealerContactMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveDealerContactMutation, SaveDealerContactMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveDealerContactMutation, SaveDealerContactMutationVariables>(SaveDealerContactDocument, baseOptions);
      }
export type SaveDealerContactMutationHookResult = ReturnType<typeof useSaveDealerContactMutation>;
export type SaveDealerContactMutationResult = ApolloReactCommon.MutationResult<SaveDealerContactMutation>;
export type SaveDealerContactMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveDealerContactMutation, SaveDealerContactMutationVariables>;
export const DeleteDocument = gql`
    mutation delete($id: String!) {
  delete(id: $id)
}
    `;
export type DeleteMutationFn = ApolloReactCommon.MutationFunction<DeleteMutation, DeleteMutationVariables>;

/**
 * __useDeleteMutation__
 *
 * To run a mutation, you first call `useDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutation, { data, loading, error }] = useDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMutation, DeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMutation, DeleteMutationVariables>(DeleteDocument, baseOptions);
      }
export type DeleteMutationHookResult = ReturnType<typeof useDeleteMutation>;
export type DeleteMutationResult = ApolloReactCommon.MutationResult<DeleteMutation>;
export type DeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMutation, DeleteMutationVariables>;
export const EquipmentNamesDocument = gql`
    mutation equipmentNames($clientId: String!, $name: String!) {
  equipmentNames(clientId: $clientId, name: $name)
}
    `;
export type EquipmentNamesMutationFn = ApolloReactCommon.MutationFunction<EquipmentNamesMutation, EquipmentNamesMutationVariables>;

/**
 * __useEquipmentNamesMutation__
 *
 * To run a mutation, you first call `useEquipmentNamesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEquipmentNamesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [equipmentNamesMutation, { data, loading, error }] = useEquipmentNamesMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEquipmentNamesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EquipmentNamesMutation, EquipmentNamesMutationVariables>) {
        return ApolloReactHooks.useMutation<EquipmentNamesMutation, EquipmentNamesMutationVariables>(EquipmentNamesDocument, baseOptions);
      }
export type EquipmentNamesMutationHookResult = ReturnType<typeof useEquipmentNamesMutation>;
export type EquipmentNamesMutationResult = ApolloReactCommon.MutationResult<EquipmentNamesMutation>;
export type EquipmentNamesMutationOptions = ApolloReactCommon.BaseMutationOptions<EquipmentNamesMutation, EquipmentNamesMutationVariables>;
export const MakesForSelectDocument = gql`
    mutation makesForSelect($searchText: String!) {
  makesForSelect(searchText: $searchText)
}
    `;
export type MakesForSelectMutationFn = ApolloReactCommon.MutationFunction<MakesForSelectMutation, MakesForSelectMutationVariables>;

/**
 * __useMakesForSelectMutation__
 *
 * To run a mutation, you first call `useMakesForSelectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakesForSelectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makesForSelectMutation, { data, loading, error }] = useMakesForSelectMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useMakesForSelectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MakesForSelectMutation, MakesForSelectMutationVariables>) {
        return ApolloReactHooks.useMutation<MakesForSelectMutation, MakesForSelectMutationVariables>(MakesForSelectDocument, baseOptions);
      }
export type MakesForSelectMutationHookResult = ReturnType<typeof useMakesForSelectMutation>;
export type MakesForSelectMutationResult = ApolloReactCommon.MutationResult<MakesForSelectMutation>;
export type MakesForSelectMutationOptions = ApolloReactCommon.BaseMutationOptions<MakesForSelectMutation, MakesForSelectMutationVariables>;
export const ModelsForSelectDocument = gql`
    mutation modelsForSelect($searchText: String!, $make: String!) {
  modelsForSelect(searchText: $searchText, make: $make)
}
    `;
export type ModelsForSelectMutationFn = ApolloReactCommon.MutationFunction<ModelsForSelectMutation, ModelsForSelectMutationVariables>;

/**
 * __useModelsForSelectMutation__
 *
 * To run a mutation, you first call `useModelsForSelectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModelsForSelectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modelsForSelectMutation, { data, loading, error }] = useModelsForSelectMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      make: // value for 'make'
 *   },
 * });
 */
export function useModelsForSelectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ModelsForSelectMutation, ModelsForSelectMutationVariables>) {
        return ApolloReactHooks.useMutation<ModelsForSelectMutation, ModelsForSelectMutationVariables>(ModelsForSelectDocument, baseOptions);
      }
export type ModelsForSelectMutationHookResult = ReturnType<typeof useModelsForSelectMutation>;
export type ModelsForSelectMutationResult = ApolloReactCommon.MutationResult<ModelsForSelectMutation>;
export type ModelsForSelectMutationOptions = ApolloReactCommon.BaseMutationOptions<ModelsForSelectMutation, ModelsForSelectMutationVariables>;
export const SaveEquipmentDocument = gql`
    mutation saveEquipment($data: EquipmentInput!) {
  saveEquipment(data: $data) {
    id
    type
    name
    nickname
    vinOrSerial
    year
    classification
    attachment
    meterType
    meterValue
    expectedUsage {
      mon
      tue
      wed
      thu
      fri
      sat
      sun
    }
    job {
      id
      name
      jobNumber
    }
    operators {
      id
      firstName
      lastName
      email
    }
    client {
      id
      name
    }
    make
    mechanics {
      id
      firstName
      lastName
      email
    }
    serviceInterval {
      id
      title
    }
    dealers {
      id
      name
    }
    dateInService
    dateOutOfService
  }
}
    `;
export type SaveEquipmentMutationFn = ApolloReactCommon.MutationFunction<SaveEquipmentMutation, SaveEquipmentMutationVariables>;

/**
 * __useSaveEquipmentMutation__
 *
 * To run a mutation, you first call `useSaveEquipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEquipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEquipmentMutation, { data, loading, error }] = useSaveEquipmentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveEquipmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveEquipmentMutation, SaveEquipmentMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveEquipmentMutation, SaveEquipmentMutationVariables>(SaveEquipmentDocument, baseOptions);
      }
export type SaveEquipmentMutationHookResult = ReturnType<typeof useSaveEquipmentMutation>;
export type SaveEquipmentMutationResult = ApolloReactCommon.MutationResult<SaveEquipmentMutation>;
export type SaveEquipmentMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveEquipmentMutation, SaveEquipmentMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($data: ForgotPasswordInput!) {
  forgotPassword(data: $data) {
    status
  }
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data) {
    status
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const CloneInspectionTemplateDocument = gql`
    mutation cloneInspectionTemplate($id: String!) {
  cloneInspectionTemplate(idToClone: $id) {
    id
    title
    classification
    equipmentType
    checklist {
      title
      type
      consumable
      photoRequired
      statuses {
        text
        shouldSendAlert
      }
    }
  }
}
    `;
export type CloneInspectionTemplateMutationFn = ApolloReactCommon.MutationFunction<CloneInspectionTemplateMutation, CloneInspectionTemplateMutationVariables>;

/**
 * __useCloneInspectionTemplateMutation__
 *
 * To run a mutation, you first call `useCloneInspectionTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloneInspectionTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cloneInspectionTemplateMutation, { data, loading, error }] = useCloneInspectionTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCloneInspectionTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloneInspectionTemplateMutation, CloneInspectionTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<CloneInspectionTemplateMutation, CloneInspectionTemplateMutationVariables>(CloneInspectionTemplateDocument, baseOptions);
      }
export type CloneInspectionTemplateMutationHookResult = ReturnType<typeof useCloneInspectionTemplateMutation>;
export type CloneInspectionTemplateMutationResult = ApolloReactCommon.MutationResult<CloneInspectionTemplateMutation>;
export type CloneInspectionTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<CloneInspectionTemplateMutation, CloneInspectionTemplateMutationVariables>;
export const InspectionTemplatesForSelectDocument = gql`
    mutation inspectionTemplatesForSelect($searchText: String!, $clientId: String!, $classification: String!) {
  inspectionTemplatesForSelect(searchText: $searchText, clientId: $clientId, classification: $classification) {
    id
    title
  }
}
    `;
export type InspectionTemplatesForSelectMutationFn = ApolloReactCommon.MutationFunction<InspectionTemplatesForSelectMutation, InspectionTemplatesForSelectMutationVariables>;

/**
 * __useInspectionTemplatesForSelectMutation__
 *
 * To run a mutation, you first call `useInspectionTemplatesForSelectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInspectionTemplatesForSelectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inspectionTemplatesForSelectMutation, { data, loading, error }] = useInspectionTemplatesForSelectMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *      classification: // value for 'classification'
 *   },
 * });
 */
export function useInspectionTemplatesForSelectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InspectionTemplatesForSelectMutation, InspectionTemplatesForSelectMutationVariables>) {
        return ApolloReactHooks.useMutation<InspectionTemplatesForSelectMutation, InspectionTemplatesForSelectMutationVariables>(InspectionTemplatesForSelectDocument, baseOptions);
      }
export type InspectionTemplatesForSelectMutationHookResult = ReturnType<typeof useInspectionTemplatesForSelectMutation>;
export type InspectionTemplatesForSelectMutationResult = ApolloReactCommon.MutationResult<InspectionTemplatesForSelectMutation>;
export type InspectionTemplatesForSelectMutationOptions = ApolloReactCommon.BaseMutationOptions<InspectionTemplatesForSelectMutation, InspectionTemplatesForSelectMutationVariables>;
export const SaveInspectionTemplateDocument = gql`
    mutation saveInspectionTemplate($data: InspectionTemplateInput!) {
  saveInspectionTemplate(data: $data) {
    id
    title
    classification
    attachment
    equipmentType
    checklist {
      title
      type
      consumable
      consumableFluid
      photoRequired
      statuses {
        text
        shouldSendAlert
      }
    }
  }
}
    `;
export type SaveInspectionTemplateMutationFn = ApolloReactCommon.MutationFunction<SaveInspectionTemplateMutation, SaveInspectionTemplateMutationVariables>;

/**
 * __useSaveInspectionTemplateMutation__
 *
 * To run a mutation, you first call `useSaveInspectionTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveInspectionTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveInspectionTemplateMutation, { data, loading, error }] = useSaveInspectionTemplateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveInspectionTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveInspectionTemplateMutation, SaveInspectionTemplateMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveInspectionTemplateMutation, SaveInspectionTemplateMutationVariables>(SaveInspectionTemplateDocument, baseOptions);
      }
export type SaveInspectionTemplateMutationHookResult = ReturnType<typeof useSaveInspectionTemplateMutation>;
export type SaveInspectionTemplateMutationResult = ApolloReactCommon.MutationResult<SaveInspectionTemplateMutation>;
export type SaveInspectionTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveInspectionTemplateMutation, SaveInspectionTemplateMutationVariables>;
export const SaveChecklistItemNotesDocument = gql`
    mutation saveChecklistItemNotes($data: SaveChecklistItemNotesInput!) {
  saveChecklistItemNotes(data: $data) {
    id
    checklist {
      id
      notes
    }
  }
}
    `;
export type SaveChecklistItemNotesMutationFn = ApolloReactCommon.MutationFunction<SaveChecklistItemNotesMutation, SaveChecklistItemNotesMutationVariables>;

/**
 * __useSaveChecklistItemNotesMutation__
 *
 * To run a mutation, you first call `useSaveChecklistItemNotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveChecklistItemNotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveChecklistItemNotesMutation, { data, loading, error }] = useSaveChecklistItemNotesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveChecklistItemNotesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveChecklistItemNotesMutation, SaveChecklistItemNotesMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveChecklistItemNotesMutation, SaveChecklistItemNotesMutationVariables>(SaveChecklistItemNotesDocument, baseOptions);
      }
export type SaveChecklistItemNotesMutationHookResult = ReturnType<typeof useSaveChecklistItemNotesMutation>;
export type SaveChecklistItemNotesMutationResult = ApolloReactCommon.MutationResult<SaveChecklistItemNotesMutation>;
export type SaveChecklistItemNotesMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveChecklistItemNotesMutation, SaveChecklistItemNotesMutationVariables>;
export const SaveInspectionDocument = gql`
    mutation saveInspection($data: InspectionInput!) {
  saveInspection(data: $data) {
    id
    meterValue
    type
    equipment {
      id
      name
      classification
      make
      model
    }
    client {
      id
      name
    }
    checklist {
      id
      title
      type
      consumable
      consumableAmount
      consumableUnitOfMeasure
      notes
      status
      photos
    }
  }
}
    `;
export type SaveInspectionMutationFn = ApolloReactCommon.MutationFunction<SaveInspectionMutation, SaveInspectionMutationVariables>;

/**
 * __useSaveInspectionMutation__
 *
 * To run a mutation, you first call `useSaveInspectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveInspectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveInspectionMutation, { data, loading, error }] = useSaveInspectionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveInspectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveInspectionMutation, SaveInspectionMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveInspectionMutation, SaveInspectionMutationVariables>(SaveInspectionDocument, baseOptions);
      }
export type SaveInspectionMutationHookResult = ReturnType<typeof useSaveInspectionMutation>;
export type SaveInspectionMutationResult = ApolloReactCommon.MutationResult<SaveInspectionMutation>;
export type SaveInspectionMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveInspectionMutation, SaveInspectionMutationVariables>;
export const FindJobsForSelectDocument = gql`
    mutation findJobsForSelect($searchText: String!, $clientId: String!) {
  findJobsForSelect(searchText: $searchText, clientId: $clientId) {
    id
    name
    jobNumber
  }
}
    `;
export type FindJobsForSelectMutationFn = ApolloReactCommon.MutationFunction<FindJobsForSelectMutation, FindJobsForSelectMutationVariables>;

/**
 * __useFindJobsForSelectMutation__
 *
 * To run a mutation, you first call `useFindJobsForSelectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindJobsForSelectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findJobsForSelectMutation, { data, loading, error }] = useFindJobsForSelectMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useFindJobsForSelectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindJobsForSelectMutation, FindJobsForSelectMutationVariables>) {
        return ApolloReactHooks.useMutation<FindJobsForSelectMutation, FindJobsForSelectMutationVariables>(FindJobsForSelectDocument, baseOptions);
      }
export type FindJobsForSelectMutationHookResult = ReturnType<typeof useFindJobsForSelectMutation>;
export type FindJobsForSelectMutationResult = ApolloReactCommon.MutationResult<FindJobsForSelectMutation>;
export type FindJobsForSelectMutationOptions = ApolloReactCommon.BaseMutationOptions<FindJobsForSelectMutation, FindJobsForSelectMutationVariables>;
export const SaveJobDocument = gql`
    mutation saveJob($data: JobInput!) {
  saveJob(data: $data) {
    id
    jobNumber
    name
    client {
      id
      name
    }
    officeLocation {
      id
      name
    }
    notificationUsers {
      id
      firstName
      lastName
      email
    }
    foreman {
      id
      firstName
      lastName
      email
    }
    addresses {
      lineOne
      city
      state
      postalCode
      country
      type
    }
    equipment {
      id
      name
      nickname
      meterType
      classification
      make
      model
      vinOrSerial
    }
    operators {
      id
      firstName
      lastName
      email
    }
    mechanics {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type SaveJobMutationFn = ApolloReactCommon.MutationFunction<SaveJobMutation, SaveJobMutationVariables>;

/**
 * __useSaveJobMutation__
 *
 * To run a mutation, you first call `useSaveJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveJobMutation, { data, loading, error }] = useSaveJobMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveJobMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveJobMutation, SaveJobMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveJobMutation, SaveJobMutationVariables>(SaveJobDocument, baseOptions);
      }
export type SaveJobMutationHookResult = ReturnType<typeof useSaveJobMutation>;
export type SaveJobMutationResult = ApolloReactCommon.MutationResult<SaveJobMutation>;
export type SaveJobMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveJobMutation, SaveJobMutationVariables>;
export const SaveMakeDocument = gql`
    mutation saveMake($data: MakeInput!) {
  saveMake(data: $data) {
    id
    name
    models {
      name
      equipmentType
    }
    createdOn
    updatedOn
  }
}
    `;
export type SaveMakeMutationFn = ApolloReactCommon.MutationFunction<SaveMakeMutation, SaveMakeMutationVariables>;

/**
 * __useSaveMakeMutation__
 *
 * To run a mutation, you first call `useSaveMakeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMakeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMakeMutation, { data, loading, error }] = useSaveMakeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveMakeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveMakeMutation, SaveMakeMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveMakeMutation, SaveMakeMutationVariables>(SaveMakeDocument, baseOptions);
      }
export type SaveMakeMutationHookResult = ReturnType<typeof useSaveMakeMutation>;
export type SaveMakeMutationResult = ApolloReactCommon.MutationResult<SaveMakeMutation>;
export type SaveMakeMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveMakeMutation, SaveMakeMutationVariables>;
export const FindOfficeLocationsForSelectDocument = gql`
    mutation findOfficeLocationsForSelect($searchText: String!, $clientId: String!) {
  findOfficeLocationsForSelect(searchText: $searchText, clientId: $clientId) {
    id
    name
  }
}
    `;
export type FindOfficeLocationsForSelectMutationFn = ApolloReactCommon.MutationFunction<FindOfficeLocationsForSelectMutation, FindOfficeLocationsForSelectMutationVariables>;

/**
 * __useFindOfficeLocationsForSelectMutation__
 *
 * To run a mutation, you first call `useFindOfficeLocationsForSelectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindOfficeLocationsForSelectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findOfficeLocationsForSelectMutation, { data, loading, error }] = useFindOfficeLocationsForSelectMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useFindOfficeLocationsForSelectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindOfficeLocationsForSelectMutation, FindOfficeLocationsForSelectMutationVariables>) {
        return ApolloReactHooks.useMutation<FindOfficeLocationsForSelectMutation, FindOfficeLocationsForSelectMutationVariables>(FindOfficeLocationsForSelectDocument, baseOptions);
      }
export type FindOfficeLocationsForSelectMutationHookResult = ReturnType<typeof useFindOfficeLocationsForSelectMutation>;
export type FindOfficeLocationsForSelectMutationResult = ApolloReactCommon.MutationResult<FindOfficeLocationsForSelectMutation>;
export type FindOfficeLocationsForSelectMutationOptions = ApolloReactCommon.BaseMutationOptions<FindOfficeLocationsForSelectMutation, FindOfficeLocationsForSelectMutationVariables>;
export const FindOfficeLocationsReferenceDocument = gql`
    mutation findOfficeLocationsReference($searchText: String!, $clientId: String!) {
  findOfficeLocationsReference(searchText: $searchText, clientId: $clientId) {
    id
    name
    client {
      id
      name
    }
    notificationUsers {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type FindOfficeLocationsReferenceMutationFn = ApolloReactCommon.MutationFunction<FindOfficeLocationsReferenceMutation, FindOfficeLocationsReferenceMutationVariables>;

/**
 * __useFindOfficeLocationsReferenceMutation__
 *
 * To run a mutation, you first call `useFindOfficeLocationsReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindOfficeLocationsReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findOfficeLocationsReferenceMutation, { data, loading, error }] = useFindOfficeLocationsReferenceMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useFindOfficeLocationsReferenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindOfficeLocationsReferenceMutation, FindOfficeLocationsReferenceMutationVariables>) {
        return ApolloReactHooks.useMutation<FindOfficeLocationsReferenceMutation, FindOfficeLocationsReferenceMutationVariables>(FindOfficeLocationsReferenceDocument, baseOptions);
      }
export type FindOfficeLocationsReferenceMutationHookResult = ReturnType<typeof useFindOfficeLocationsReferenceMutation>;
export type FindOfficeLocationsReferenceMutationResult = ApolloReactCommon.MutationResult<FindOfficeLocationsReferenceMutation>;
export type FindOfficeLocationsReferenceMutationOptions = ApolloReactCommon.BaseMutationOptions<FindOfficeLocationsReferenceMutation, FindOfficeLocationsReferenceMutationVariables>;
export const SaveOfficeLocationDocument = gql`
    mutation saveOfficeLocation($data: OfficeLocationInput!) {
  saveOfficeLocation(data: $data) {
    id
    name
    phones {
      type
      digits
      extension
    }
    addresses {
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
    notificationUsers {
      id
      firstName
      lastName
      email
    }
    operators {
      id
      firstName
      lastName
      email
    }
    mechanics {
      id
      firstName
      lastName
      email
    }
    equipment {
      id
      name
      nickname
      meterType
      classification
      make
      model
      vinOrSerial
    }
  }
}
    `;
export type SaveOfficeLocationMutationFn = ApolloReactCommon.MutationFunction<SaveOfficeLocationMutation, SaveOfficeLocationMutationVariables>;

/**
 * __useSaveOfficeLocationMutation__
 *
 * To run a mutation, you first call `useSaveOfficeLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveOfficeLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveOfficeLocationMutation, { data, loading, error }] = useSaveOfficeLocationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveOfficeLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveOfficeLocationMutation, SaveOfficeLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveOfficeLocationMutation, SaveOfficeLocationMutationVariables>(SaveOfficeLocationDocument, baseOptions);
      }
export type SaveOfficeLocationMutationHookResult = ReturnType<typeof useSaveOfficeLocationMutation>;
export type SaveOfficeLocationMutationResult = ApolloReactCommon.MutationResult<SaveOfficeLocationMutation>;
export type SaveOfficeLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveOfficeLocationMutation, SaveOfficeLocationMutationVariables>;
export const SaveRolePermissionDocument = gql`
    mutation saveRolePermission($data: RolePermissionInput!) {
  saveRolePermission(data: $data) {
    id
    name
    type
    privileges
  }
}
    `;
export type SaveRolePermissionMutationFn = ApolloReactCommon.MutationFunction<SaveRolePermissionMutation, SaveRolePermissionMutationVariables>;

/**
 * __useSaveRolePermissionMutation__
 *
 * To run a mutation, you first call `useSaveRolePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveRolePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveRolePermissionMutation, { data, loading, error }] = useSaveRolePermissionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveRolePermissionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveRolePermissionMutation, SaveRolePermissionMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveRolePermissionMutation, SaveRolePermissionMutationVariables>(SaveRolePermissionDocument, baseOptions);
      }
export type SaveRolePermissionMutationHookResult = ReturnType<typeof useSaveRolePermissionMutation>;
export type SaveRolePermissionMutationResult = ApolloReactCommon.MutationResult<SaveRolePermissionMutation>;
export type SaveRolePermissionMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveRolePermissionMutation, SaveRolePermissionMutationVariables>;
export const FindServiceIntervalsDocument = gql`
    mutation findServiceIntervals($searchText: String!, $clientId: String!) {
  findServiceIntervals(searchText: $searchText, clientId: $clientId) {
    id
    title
  }
}
    `;
export type FindServiceIntervalsMutationFn = ApolloReactCommon.MutationFunction<FindServiceIntervalsMutation, FindServiceIntervalsMutationVariables>;

/**
 * __useFindServiceIntervalsMutation__
 *
 * To run a mutation, you first call `useFindServiceIntervalsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindServiceIntervalsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findServiceIntervalsMutation, { data, loading, error }] = useFindServiceIntervalsMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useFindServiceIntervalsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindServiceIntervalsMutation, FindServiceIntervalsMutationVariables>) {
        return ApolloReactHooks.useMutation<FindServiceIntervalsMutation, FindServiceIntervalsMutationVariables>(FindServiceIntervalsDocument, baseOptions);
      }
export type FindServiceIntervalsMutationHookResult = ReturnType<typeof useFindServiceIntervalsMutation>;
export type FindServiceIntervalsMutationResult = ApolloReactCommon.MutationResult<FindServiceIntervalsMutation>;
export type FindServiceIntervalsMutationOptions = ApolloReactCommon.BaseMutationOptions<FindServiceIntervalsMutation, FindServiceIntervalsMutationVariables>;
export const SaveServiceIntervalDocument = gql`
    mutation saveServiceInterval($data: ServiceIntervalInput!) {
  saveServiceInterval(data: $data) {
    id
    title
    make
    model
    meterType
    client {
      id
      name
    }
    milestones {
      id
      title
      alertBeforeDue
      meterValue
      oneTime
      serviceItems {
        id
        name
        partName
        partNumber
        fromMilestoneId
      }
    }
    createdOn
    updatedOn
  }
}
    `;
export type SaveServiceIntervalMutationFn = ApolloReactCommon.MutationFunction<SaveServiceIntervalMutation, SaveServiceIntervalMutationVariables>;

/**
 * __useSaveServiceIntervalMutation__
 *
 * To run a mutation, you first call `useSaveServiceIntervalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveServiceIntervalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveServiceIntervalMutation, { data, loading, error }] = useSaveServiceIntervalMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveServiceIntervalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveServiceIntervalMutation, SaveServiceIntervalMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveServiceIntervalMutation, SaveServiceIntervalMutationVariables>(SaveServiceIntervalDocument, baseOptions);
      }
export type SaveServiceIntervalMutationHookResult = ReturnType<typeof useSaveServiceIntervalMutation>;
export type SaveServiceIntervalMutationResult = ApolloReactCommon.MutationResult<SaveServiceIntervalMutation>;
export type SaveServiceIntervalMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveServiceIntervalMutation, SaveServiceIntervalMutationVariables>;
export const FindUsersForSelectDocument = gql`
    mutation findUsersForSelect($searchText: String, $clientId: String!, $role: String) {
  findUsersForSelect(searchText: $searchText, clientId: $clientId, role: $role) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type FindUsersForSelectMutationFn = ApolloReactCommon.MutationFunction<FindUsersForSelectMutation, FindUsersForSelectMutationVariables>;

/**
 * __useFindUsersForSelectMutation__
 *
 * To run a mutation, you first call `useFindUsersForSelectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindUsersForSelectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findUsersForSelectMutation, { data, loading, error }] = useFindUsersForSelectMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useFindUsersForSelectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindUsersForSelectMutation, FindUsersForSelectMutationVariables>) {
        return ApolloReactHooks.useMutation<FindUsersForSelectMutation, FindUsersForSelectMutationVariables>(FindUsersForSelectDocument, baseOptions);
      }
export type FindUsersForSelectMutationHookResult = ReturnType<typeof useFindUsersForSelectMutation>;
export type FindUsersForSelectMutationResult = ApolloReactCommon.MutationResult<FindUsersForSelectMutation>;
export type FindUsersForSelectMutationOptions = ApolloReactCommon.BaseMutationOptions<FindUsersForSelectMutation, FindUsersForSelectMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    user {
      id
      firstName
      lastName
      email
      client {
        id
        name
      }
      roles {
        name
        type
        permissions {
          name
          privileges
        }
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const SaveMyAccountDocument = gql`
    mutation saveMyAccount($data: UserInput!) {
  saveMyAccount(data: $data) {
    id
    firstName
    lastName
    email
    active
    phones {
      type
      digits
      extension
    }
    addresses {
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
  }
}
    `;
export type SaveMyAccountMutationFn = ApolloReactCommon.MutationFunction<SaveMyAccountMutation, SaveMyAccountMutationVariables>;

/**
 * __useSaveMyAccountMutation__
 *
 * To run a mutation, you first call `useSaveMyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMyAccountMutation, { data, loading, error }] = useSaveMyAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveMyAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveMyAccountMutation, SaveMyAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveMyAccountMutation, SaveMyAccountMutationVariables>(SaveMyAccountDocument, baseOptions);
      }
export type SaveMyAccountMutationHookResult = ReturnType<typeof useSaveMyAccountMutation>;
export type SaveMyAccountMutationResult = ApolloReactCommon.MutationResult<SaveMyAccountMutation>;
export type SaveMyAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveMyAccountMutation, SaveMyAccountMutationVariables>;
export const SaveUserDocument = gql`
    mutation saveUser($data: UserInput!) {
  saveUser(data: $data) {
    id
    firstName
    lastName
    email
    password
    active
    roles {
      id
      name
      type
      permissions {
        id
        name
        type
        privileges
      }
    }
    client {
      id
      name
    }
    phones {
      type
      digits
      extension
    }
    addresses {
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
  }
}
    `;
export type SaveUserMutationFn = ApolloReactCommon.MutationFunction<SaveUserMutation, SaveUserMutationVariables>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveUserMutation, SaveUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveUserMutation, SaveUserMutationVariables>(SaveUserDocument, baseOptions);
      }
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = ApolloReactCommon.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveUserMutation, SaveUserMutationVariables>;
export const SigninDocument = gql`
    mutation signin($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      email
      notificationCount
      client {
        id
        name
      }
      roles {
        id
        name
        type
        permissions {
          name
          privileges
        }
      }
    }
    token
  }
}
    `;
export type SigninMutationFn = ApolloReactCommon.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = ApolloReactCommon.MutationResult<SigninMutation>;
export type SigninMutationOptions = ApolloReactCommon.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SaveProblemReportDocument = gql`
    mutation saveProblemReport($data: ProblemReportInput!) {
  saveProblemReport(data: $data) {
    id
    notes
    status
    meterValue
  }
}
    `;
export type SaveProblemReportMutationFn = ApolloReactCommon.MutationFunction<SaveProblemReportMutation, SaveProblemReportMutationVariables>;

/**
 * __useSaveProblemReportMutation__
 *
 * To run a mutation, you first call `useSaveProblemReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProblemReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProblemReportMutation, { data, loading, error }] = useSaveProblemReportMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveProblemReportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveProblemReportMutation, SaveProblemReportMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveProblemReportMutation, SaveProblemReportMutationVariables>(SaveProblemReportDocument, baseOptions);
      }
export type SaveProblemReportMutationHookResult = ReturnType<typeof useSaveProblemReportMutation>;
export type SaveProblemReportMutationResult = ApolloReactCommon.MutationResult<SaveProblemReportMutation>;
export type SaveProblemReportMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveProblemReportMutation, SaveProblemReportMutationVariables>;
export const SaveWorkOrderDocument = gql`
    mutation saveWorkOrder($data: WorkOrderInput!) {
  saveWorkOrder(data: $data) {
    id
    equipment {
      id
      name
      classification
      make
      model
      meterType
      vinOrSerial
    }
    client {
      id
      name
    }
    assignedTo {
      id
      firstName
      lastName
      email
    }
    notes
    status
    meterValue
    completedOn
    createdOn
    updatedOn
  }
}
    `;
export type SaveWorkOrderMutationFn = ApolloReactCommon.MutationFunction<SaveWorkOrderMutation, SaveWorkOrderMutationVariables>;

/**
 * __useSaveWorkOrderMutation__
 *
 * To run a mutation, you first call `useSaveWorkOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkOrderMutation, { data, loading, error }] = useSaveWorkOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveWorkOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveWorkOrderMutation, SaveWorkOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveWorkOrderMutation, SaveWorkOrderMutationVariables>(SaveWorkOrderDocument, baseOptions);
      }
export type SaveWorkOrderMutationHookResult = ReturnType<typeof useSaveWorkOrderMutation>;
export type SaveWorkOrderMutationResult = ApolloReactCommon.MutationResult<SaveWorkOrderMutation>;
export type SaveWorkOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveWorkOrderMutation, SaveWorkOrderMutationVariables>;
export const SaveWorkOrderStatusDocument = gql`
    mutation saveWorkOrderStatus($data: WorkOrderStatusInput!) {
  saveWorkOrderStatus(data: $data) {
    id
    equipment {
      id
      name
      classification
      make
      model
      meterType
      vinOrSerial
    }
    client {
      id
      name
    }
    assignedTo {
      id
      firstName
      lastName
      email
    }
    notes
    status
    meterValue
    completedOn
    createdOn
    updatedOn
  }
}
    `;
export type SaveWorkOrderStatusMutationFn = ApolloReactCommon.MutationFunction<SaveWorkOrderStatusMutation, SaveWorkOrderStatusMutationVariables>;

/**
 * __useSaveWorkOrderStatusMutation__
 *
 * To run a mutation, you first call `useSaveWorkOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkOrderStatusMutation, { data, loading, error }] = useSaveWorkOrderStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveWorkOrderStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveWorkOrderStatusMutation, SaveWorkOrderStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveWorkOrderStatusMutation, SaveWorkOrderStatusMutationVariables>(SaveWorkOrderStatusDocument, baseOptions);
      }
export type SaveWorkOrderStatusMutationHookResult = ReturnType<typeof useSaveWorkOrderStatusMutation>;
export type SaveWorkOrderStatusMutationResult = ApolloReactCommon.MutationResult<SaveWorkOrderStatusMutation>;
export type SaveWorkOrderStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveWorkOrderStatusMutation, SaveWorkOrderStatusMutationVariables>;
export const ClientByIdDocument = gql`
    query clientById($id: String!) {
  clientById(id: $id) {
    id
    uuid
    loginDomain
    name
    website
  }
  officeLocations(skip: 0, pageSize: 100, id: $id) {
    officeLocations {
      id
      name
      phones {
        type
        digits
        extension
      }
      addresses {
        lineOne
        lineTwo
        lineThree
        city
        state
        postalCode
        country
        type
      }
    }
    totalRows
  }
}
    `;

/**
 * __useClientByIdQuery__
 *
 * To run a query within a React component, call `useClientByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClientByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientByIdQuery, ClientByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientByIdQuery, ClientByIdQueryVariables>(ClientByIdDocument, baseOptions);
      }
export function useClientByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientByIdQuery, ClientByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientByIdQuery, ClientByIdQueryVariables>(ClientByIdDocument, baseOptions);
        }
export type ClientByIdQueryHookResult = ReturnType<typeof useClientByIdQuery>;
export type ClientByIdLazyQueryHookResult = ReturnType<typeof useClientByIdLazyQuery>;
export type ClientByIdQueryResult = ApolloReactCommon.QueryResult<ClientByIdQuery, ClientByIdQueryVariables>;
export const ClientsDocument = gql`
    query clients($skip: Int!, $pageSize: Int!, $searchText: String) {
  clients(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    clients {
      id
      name
      loginDomain
      website
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, baseOptions);
      }
export function useClientsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, baseOptions);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = ApolloReactCommon.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const ClientForSelectionDocument = gql`
    query clientForSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  clients(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    clients {
      id
      name
    }
    totalRows
  }
}
    `;

/**
 * __useClientForSelectionQuery__
 *
 * To run a query within a React component, call `useClientForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientForSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useClientForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClientForSelectionQuery, ClientForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ClientForSelectionQuery, ClientForSelectionQueryVariables>(ClientForSelectionDocument, baseOptions);
      }
export function useClientForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClientForSelectionQuery, ClientForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClientForSelectionQuery, ClientForSelectionQueryVariables>(ClientForSelectionDocument, baseOptions);
        }
export type ClientForSelectionQueryHookResult = ReturnType<typeof useClientForSelectionQuery>;
export type ClientForSelectionLazyQueryHookResult = ReturnType<typeof useClientForSelectionLazyQuery>;
export type ClientForSelectionQueryResult = ApolloReactCommon.QueryResult<ClientForSelectionQuery, ClientForSelectionQueryVariables>;
export const DealerByIdDocument = gql`
    query dealerById($id: String!) {
  dealerById(id: $id) {
    id
    name
    website
    email
    location {
      id
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
    parts {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    sales {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    service {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    phones {
      type
      digits
      extension
    }
    client {
      id
      name
    }
  }
}
    `;

/**
 * __useDealerByIdQuery__
 *
 * To run a query within a React component, call `useDealerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDealerByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DealerByIdQuery, DealerByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<DealerByIdQuery, DealerByIdQueryVariables>(DealerByIdDocument, baseOptions);
      }
export function useDealerByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealerByIdQuery, DealerByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DealerByIdQuery, DealerByIdQueryVariables>(DealerByIdDocument, baseOptions);
        }
export type DealerByIdQueryHookResult = ReturnType<typeof useDealerByIdQuery>;
export type DealerByIdLazyQueryHookResult = ReturnType<typeof useDealerByIdLazyQuery>;
export type DealerByIdQueryResult = ApolloReactCommon.QueryResult<DealerByIdQuery, DealerByIdQueryVariables>;
export const DealersDocument = gql`
    query dealers($skip: Int!, $pageSize: Int!, $searchText: String) {
  dealers(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    dealers {
      id
      name
      website
      email
      phones {
        type
        digits
        extension
      }
      parts {
        id
        firstName
        lastName
        email
        representativeType
        phone {
          type
          digits
          extension
        }
      }
      sales {
        id
        firstName
        lastName
        email
        representativeType
        phone {
          type
          digits
          extension
        }
      }
      service {
        id
        firstName
        lastName
        email
        representativeType
        phone {
          type
          digits
          extension
        }
      }
      location {
        id
        lineOne
        lineTwo
        lineThree
        city
        state
        postalCode
        country
        type
      }
      client {
        id
        name
      }
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useDealersQuery__
 *
 * To run a query within a React component, call `useDealersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useDealersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DealersQuery, DealersQueryVariables>) {
        return ApolloReactHooks.useQuery<DealersQuery, DealersQueryVariables>(DealersDocument, baseOptions);
      }
export function useDealersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealersQuery, DealersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DealersQuery, DealersQueryVariables>(DealersDocument, baseOptions);
        }
export type DealersQueryHookResult = ReturnType<typeof useDealersQuery>;
export type DealersLazyQueryHookResult = ReturnType<typeof useDealersLazyQuery>;
export type DealersQueryResult = ApolloReactCommon.QueryResult<DealersQuery, DealersQueryVariables>;
export const DealersForSelectionDocument = gql`
    query dealersForSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  dealersSearch(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    dealers {
      id
      name
    }
    totalRows
  }
}
    `;

/**
 * __useDealersForSelectionQuery__
 *
 * To run a query within a React component, call `useDealersForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealersForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealersForSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useDealersForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DealersForSelectionQuery, DealersForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<DealersForSelectionQuery, DealersForSelectionQueryVariables>(DealersForSelectionDocument, baseOptions);
      }
export function useDealersForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealersForSelectionQuery, DealersForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DealersForSelectionQuery, DealersForSelectionQueryVariables>(DealersForSelectionDocument, baseOptions);
        }
export type DealersForSelectionQueryHookResult = ReturnType<typeof useDealersForSelectionQuery>;
export type DealersForSelectionLazyQueryHookResult = ReturnType<typeof useDealersForSelectionLazyQuery>;
export type DealersForSelectionQueryResult = ApolloReactCommon.QueryResult<DealersForSelectionQuery, DealersForSelectionQueryVariables>;
export const DealersContactDocument = gql`
    query dealersContact($skip: Int!, $pageSize: Int!, $searchText: String, $type: String!) {
  dealersContact(skip: $skip, pageSize: $pageSize, searchText: $searchText, type: $type) {
    dealers {
      id
      firstName
      lastName
      email
      representativeType
      phone {
        type
        digits
        extension
      }
    }
    totalRows
  }
}
    `;

/**
 * __useDealersContactQuery__
 *
 * To run a query within a React component, call `useDealersContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealersContactQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealersContactQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useDealersContactQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DealersContactQuery, DealersContactQueryVariables>) {
        return ApolloReactHooks.useQuery<DealersContactQuery, DealersContactQueryVariables>(DealersContactDocument, baseOptions);
      }
export function useDealersContactLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealersContactQuery, DealersContactQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DealersContactQuery, DealersContactQueryVariables>(DealersContactDocument, baseOptions);
        }
export type DealersContactQueryHookResult = ReturnType<typeof useDealersContactQuery>;
export type DealersContactLazyQueryHookResult = ReturnType<typeof useDealersContactLazyQuery>;
export type DealersContactQueryResult = ApolloReactCommon.QueryResult<DealersContactQuery, DealersContactQueryVariables>;
export const ChartEquipmentDayDocument = gql`
    query chartEquipmentDay($equipmentId: String!) {
  chartEquipmentDay(equipmentId: $equipmentId) {
    chartData {
      day
      actualUsage
      estimateUsage
    }
  }
}
    `;

/**
 * __useChartEquipmentDayQuery__
 *
 * To run a query within a React component, call `useChartEquipmentDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartEquipmentDayQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartEquipmentDayQuery({
 *   variables: {
 *      equipmentId: // value for 'equipmentId'
 *   },
 * });
 */
export function useChartEquipmentDayQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChartEquipmentDayQuery, ChartEquipmentDayQueryVariables>) {
        return ApolloReactHooks.useQuery<ChartEquipmentDayQuery, ChartEquipmentDayQueryVariables>(ChartEquipmentDayDocument, baseOptions);
      }
export function useChartEquipmentDayLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChartEquipmentDayQuery, ChartEquipmentDayQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChartEquipmentDayQuery, ChartEquipmentDayQueryVariables>(ChartEquipmentDayDocument, baseOptions);
        }
export type ChartEquipmentDayQueryHookResult = ReturnType<typeof useChartEquipmentDayQuery>;
export type ChartEquipmentDayLazyQueryHookResult = ReturnType<typeof useChartEquipmentDayLazyQuery>;
export type ChartEquipmentDayQueryResult = ApolloReactCommon.QueryResult<ChartEquipmentDayQuery, ChartEquipmentDayQueryVariables>;
export const EquipmentDocument = gql`
    query equipment($skip: Int!, $pageSize: Int!, $searchText: String) {
  equipment(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    equipment {
      id
      type
      name
      nickname
      vinOrSerial
      year
      make
      classification
      attachment
      meterType
      meterValue
      client {
        id
        name
      }
      dealers {
        id
        name
      }
      officeLocation {
        id
        name
      }
      job {
        id
        name
        jobNumber
      }
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useEquipmentQuery__
 *
 * To run a query within a React component, call `useEquipmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useEquipmentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EquipmentQuery, EquipmentQueryVariables>) {
        return ApolloReactHooks.useQuery<EquipmentQuery, EquipmentQueryVariables>(EquipmentDocument, baseOptions);
      }
export function useEquipmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EquipmentQuery, EquipmentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EquipmentQuery, EquipmentQueryVariables>(EquipmentDocument, baseOptions);
        }
export type EquipmentQueryHookResult = ReturnType<typeof useEquipmentQuery>;
export type EquipmentLazyQueryHookResult = ReturnType<typeof useEquipmentLazyQuery>;
export type EquipmentQueryResult = ApolloReactCommon.QueryResult<EquipmentQuery, EquipmentQueryVariables>;
export const EquipmentByIdDocument = gql`
    query equipmentById($id: String!) {
  equipmentById(id: $id) {
    id
    type
    name
    nickname
    vinOrSerial
    year
    classification
    attachment
    meterType
    meterValue
    totalInspections
    expectedUsage {
      mon
      tue
      wed
      thu
      fri
      sat
      sun
    }
    inspectionTemplate {
      id
      title
    }
    officeLocation {
      id
      name
    }
    job {
      id
      name
      jobNumber
    }
    dealers {
      id
      name
    }
    operators {
      id
      firstName
      lastName
      email
    }
    client {
      id
      name
    }
    make
    model
    mechanics {
      id
      firstName
      lastName
      email
    }
    serviceInterval {
      id
      title
    }
    dateInService
    dateOutOfService
  }
}
    `;

/**
 * __useEquipmentByIdQuery__
 *
 * To run a query within a React component, call `useEquipmentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEquipmentByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EquipmentByIdQuery, EquipmentByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<EquipmentByIdQuery, EquipmentByIdQueryVariables>(EquipmentByIdDocument, baseOptions);
      }
export function useEquipmentByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EquipmentByIdQuery, EquipmentByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EquipmentByIdQuery, EquipmentByIdQueryVariables>(EquipmentByIdDocument, baseOptions);
        }
export type EquipmentByIdQueryHookResult = ReturnType<typeof useEquipmentByIdQuery>;
export type EquipmentByIdLazyQueryHookResult = ReturnType<typeof useEquipmentByIdLazyQuery>;
export type EquipmentByIdQueryResult = ApolloReactCommon.QueryResult<EquipmentByIdQuery, EquipmentByIdQueryVariables>;
export const EquipmentForSelectDocument = gql`
    query equipmentForSelect($searchText: String, $clientId: String!, $role: String) {
  equipmentForSelect(searchText: $searchText, clientId: $clientId, role: $role) {
    id
    name
    nickname
    meterType
    classification
    make
    model
    vinOrSerial
  }
}
    `;

/**
 * __useEquipmentForSelectQuery__
 *
 * To run a query within a React component, call `useEquipmentForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentForSelectQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      clientId: // value for 'clientId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useEquipmentForSelectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EquipmentForSelectQuery, EquipmentForSelectQueryVariables>) {
        return ApolloReactHooks.useQuery<EquipmentForSelectQuery, EquipmentForSelectQueryVariables>(EquipmentForSelectDocument, baseOptions);
      }
export function useEquipmentForSelectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EquipmentForSelectQuery, EquipmentForSelectQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EquipmentForSelectQuery, EquipmentForSelectQueryVariables>(EquipmentForSelectDocument, baseOptions);
        }
export type EquipmentForSelectQueryHookResult = ReturnType<typeof useEquipmentForSelectQuery>;
export type EquipmentForSelectLazyQueryHookResult = ReturnType<typeof useEquipmentForSelectLazyQuery>;
export type EquipmentForSelectQueryResult = ApolloReactCommon.QueryResult<EquipmentForSelectQuery, EquipmentForSelectQueryVariables>;
export const EquipmentSelectionDocument = gql`
    query equipmentSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  equipment(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    equipment {
      id
      name
      nickname
      meterType
      classification
      attachment
    }
    totalRows
  }
}
    `;

/**
 * __useEquipmentSelectionQuery__
 *
 * To run a query within a React component, call `useEquipmentSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useEquipmentSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EquipmentSelectionQuery, EquipmentSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<EquipmentSelectionQuery, EquipmentSelectionQueryVariables>(EquipmentSelectionDocument, baseOptions);
      }
export function useEquipmentSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EquipmentSelectionQuery, EquipmentSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EquipmentSelectionQuery, EquipmentSelectionQueryVariables>(EquipmentSelectionDocument, baseOptions);
        }
export type EquipmentSelectionQueryHookResult = ReturnType<typeof useEquipmentSelectionQuery>;
export type EquipmentSelectionLazyQueryHookResult = ReturnType<typeof useEquipmentSelectionLazyQuery>;
export type EquipmentSelectionQueryResult = ApolloReactCommon.QueryResult<EquipmentSelectionQuery, EquipmentSelectionQueryVariables>;
export const ChartDayDocument = gql`
    query chartDay($dateFrom: DateTime, $dateTo: DateTime, $selectedFluids: [String!]) {
  chartDay(dateFrom: $dateFrom, dateTo: $dateTo, selectedFluids: $selectedFluids) {
    chartByDayDataJSON
    fluidNames
  }
}
    `;

/**
 * __useChartDayQuery__
 *
 * To run a query within a React component, call `useChartDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartDayQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartDayQuery({
 *   variables: {
 *      dateFrom: // value for 'dateFrom'
 *      dateTo: // value for 'dateTo'
 *      selectedFluids: // value for 'selectedFluids'
 *   },
 * });
 */
export function useChartDayQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChartDayQuery, ChartDayQueryVariables>) {
        return ApolloReactHooks.useQuery<ChartDayQuery, ChartDayQueryVariables>(ChartDayDocument, baseOptions);
      }
export function useChartDayLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChartDayQuery, ChartDayQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChartDayQuery, ChartDayQueryVariables>(ChartDayDocument, baseOptions);
        }
export type ChartDayQueryHookResult = ReturnType<typeof useChartDayQuery>;
export type ChartDayLazyQueryHookResult = ReturnType<typeof useChartDayLazyQuery>;
export type ChartDayQueryResult = ApolloReactCommon.QueryResult<ChartDayQuery, ChartDayQueryVariables>;
export const ChartTotalDocument = gql`
    query chartTotal {
  chartTotal {
    chartData {
      fluid
      amount
    }
  }
}
    `;

/**
 * __useChartTotalQuery__
 *
 * To run a query within a React component, call `useChartTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartTotalQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartTotalQuery({
 *   variables: {
 *   },
 * });
 */
export function useChartTotalQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChartTotalQuery, ChartTotalQueryVariables>) {
        return ApolloReactHooks.useQuery<ChartTotalQuery, ChartTotalQueryVariables>(ChartTotalDocument, baseOptions);
      }
export function useChartTotalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChartTotalQuery, ChartTotalQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChartTotalQuery, ChartTotalQueryVariables>(ChartTotalDocument, baseOptions);
        }
export type ChartTotalQueryHookResult = ReturnType<typeof useChartTotalQuery>;
export type ChartTotalLazyQueryHookResult = ReturnType<typeof useChartTotalLazyQuery>;
export type ChartTotalQueryResult = ApolloReactCommon.QueryResult<ChartTotalQuery, ChartTotalQueryVariables>;
export const FluidReportsDocument = gql`
    query fluidReports($skip: Int!, $pageSize: Int!, $searchText: String) {
  fluidReports(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    fluidReports {
      id
      equipment {
        id
        name
        classification
        meterType
        make
        model
      }
      fluid
      unitOfMeasure
      amount
      user {
        id
        firstName
        lastName
        email
      }
      client {
        id
        name
      }
      completedOn
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useFluidReportsQuery__
 *
 * To run a query within a React component, call `useFluidReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFluidReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFluidReportsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useFluidReportsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FluidReportsQuery, FluidReportsQueryVariables>) {
        return ApolloReactHooks.useQuery<FluidReportsQuery, FluidReportsQueryVariables>(FluidReportsDocument, baseOptions);
      }
export function useFluidReportsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FluidReportsQuery, FluidReportsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FluidReportsQuery, FluidReportsQueryVariables>(FluidReportsDocument, baseOptions);
        }
export type FluidReportsQueryHookResult = ReturnType<typeof useFluidReportsQuery>;
export type FluidReportsLazyQueryHookResult = ReturnType<typeof useFluidReportsLazyQuery>;
export type FluidReportsQueryResult = ApolloReactCommon.QueryResult<FluidReportsQuery, FluidReportsQueryVariables>;
export const FluidSelectionDocument = gql`
    query fluidSelection {
  fluids {
    fluids {
      name
    }
    totalRows
  }
}
    `;

/**
 * __useFluidSelectionQuery__
 *
 * To run a query within a React component, call `useFluidSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFluidSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFluidSelectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFluidSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FluidSelectionQuery, FluidSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<FluidSelectionQuery, FluidSelectionQueryVariables>(FluidSelectionDocument, baseOptions);
      }
export function useFluidSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FluidSelectionQuery, FluidSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FluidSelectionQuery, FluidSelectionQueryVariables>(FluidSelectionDocument, baseOptions);
        }
export type FluidSelectionQueryHookResult = ReturnType<typeof useFluidSelectionQuery>;
export type FluidSelectionLazyQueryHookResult = ReturnType<typeof useFluidSelectionLazyQuery>;
export type FluidSelectionQueryResult = ApolloReactCommon.QueryResult<FluidSelectionQuery, FluidSelectionQueryVariables>;
export const ClassificationsDocument = gql`
    query classifications {
  classifications {
    classifications {
      name
    }
    totalRows
  }
}
    `;

/**
 * __useClassificationsQuery__
 *
 * To run a query within a React component, call `useClassificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClassificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ClassificationsQuery, ClassificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<ClassificationsQuery, ClassificationsQueryVariables>(ClassificationsDocument, baseOptions);
      }
export function useClassificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClassificationsQuery, ClassificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ClassificationsQuery, ClassificationsQueryVariables>(ClassificationsDocument, baseOptions);
        }
export type ClassificationsQueryHookResult = ReturnType<typeof useClassificationsQuery>;
export type ClassificationsLazyQueryHookResult = ReturnType<typeof useClassificationsLazyQuery>;
export type ClassificationsQueryResult = ApolloReactCommon.QueryResult<ClassificationsQuery, ClassificationsQueryVariables>;
export const InspectionTemplateByIdDocument = gql`
    query inspectionTemplateById($id: String!) {
  inspectionTemplateById(id: $id) {
    id
    title
    equipmentType
    classification
    attachment
    checklist {
      id
      title
      type
      consumable
      consumableFluid
      photoRequired
      statuses {
        text
        shouldSendAlert
        isDefault
      }
    }
  }
}
    `;

/**
 * __useInspectionTemplateByIdQuery__
 *
 * To run a query within a React component, call `useInspectionTemplateByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionTemplateByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionTemplateByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInspectionTemplateByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionTemplateByIdQuery, InspectionTemplateByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionTemplateByIdQuery, InspectionTemplateByIdQueryVariables>(InspectionTemplateByIdDocument, baseOptions);
      }
export function useInspectionTemplateByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionTemplateByIdQuery, InspectionTemplateByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionTemplateByIdQuery, InspectionTemplateByIdQueryVariables>(InspectionTemplateByIdDocument, baseOptions);
        }
export type InspectionTemplateByIdQueryHookResult = ReturnType<typeof useInspectionTemplateByIdQuery>;
export type InspectionTemplateByIdLazyQueryHookResult = ReturnType<typeof useInspectionTemplateByIdLazyQuery>;
export type InspectionTemplateByIdQueryResult = ApolloReactCommon.QueryResult<InspectionTemplateByIdQuery, InspectionTemplateByIdQueryVariables>;
export const InspectionTemplatesDocument = gql`
    query inspectionTemplates($skip: Int!, $pageSize: Int!, $searchText: String) {
  inspectionTemplates(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    inspectionTemplates {
      id
      title
      equipmentType
      classification
      attachment
      checklist {
        title
        type
        consumable
        consumableFluid
        photoRequired
        statuses {
          text
          shouldSendAlert
          isDefault
        }
      }
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useInspectionTemplatesQuery__
 *
 * To run a query within a React component, call `useInspectionTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionTemplatesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useInspectionTemplatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionTemplatesQuery, InspectionTemplatesQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionTemplatesQuery, InspectionTemplatesQueryVariables>(InspectionTemplatesDocument, baseOptions);
      }
export function useInspectionTemplatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionTemplatesQuery, InspectionTemplatesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionTemplatesQuery, InspectionTemplatesQueryVariables>(InspectionTemplatesDocument, baseOptions);
        }
export type InspectionTemplatesQueryHookResult = ReturnType<typeof useInspectionTemplatesQuery>;
export type InspectionTemplatesLazyQueryHookResult = ReturnType<typeof useInspectionTemplatesLazyQuery>;
export type InspectionTemplatesQueryResult = ApolloReactCommon.QueryResult<InspectionTemplatesQuery, InspectionTemplatesQueryVariables>;
export const InspectionTemplatesSelectionDocument = gql`
    query inspectionTemplatesSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  inspectionTemplates(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    inspectionTemplates {
      id
      title
      classification
      attachment
    }
  }
}
    `;

/**
 * __useInspectionTemplatesSelectionQuery__
 *
 * To run a query within a React component, call `useInspectionTemplatesSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionTemplatesSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionTemplatesSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useInspectionTemplatesSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionTemplatesSelectionQuery, InspectionTemplatesSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionTemplatesSelectionQuery, InspectionTemplatesSelectionQueryVariables>(InspectionTemplatesSelectionDocument, baseOptions);
      }
export function useInspectionTemplatesSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionTemplatesSelectionQuery, InspectionTemplatesSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionTemplatesSelectionQuery, InspectionTemplatesSelectionQueryVariables>(InspectionTemplatesSelectionDocument, baseOptions);
        }
export type InspectionTemplatesSelectionQueryHookResult = ReturnType<typeof useInspectionTemplatesSelectionQuery>;
export type InspectionTemplatesSelectionLazyQueryHookResult = ReturnType<typeof useInspectionTemplatesSelectionLazyQuery>;
export type InspectionTemplatesSelectionQueryResult = ApolloReactCommon.QueryResult<InspectionTemplatesSelectionQuery, InspectionTemplatesSelectionQueryVariables>;
export const ChartInspectionDocument = gql`
    query chartInspection {
  chartInspection {
    chartData {
      id
      firstName
      lastName
      total
    }
  }
}
    `;

/**
 * __useChartInspectionQuery__
 *
 * To run a query within a React component, call `useChartInspectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useChartInspectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChartInspectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useChartInspectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChartInspectionQuery, ChartInspectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ChartInspectionQuery, ChartInspectionQueryVariables>(ChartInspectionDocument, baseOptions);
      }
export function useChartInspectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChartInspectionQuery, ChartInspectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChartInspectionQuery, ChartInspectionQueryVariables>(ChartInspectionDocument, baseOptions);
        }
export type ChartInspectionQueryHookResult = ReturnType<typeof useChartInspectionQuery>;
export type ChartInspectionLazyQueryHookResult = ReturnType<typeof useChartInspectionLazyQuery>;
export type ChartInspectionQueryResult = ApolloReactCommon.QueryResult<ChartInspectionQuery, ChartInspectionQueryVariables>;
export const InspectionByIdDocument = gql`
    query inspectionById($id: String!) {
  inspectionById(id: $id) {
    id
    type
    equipment {
      id
      name
      classification
      meterType
      make
      model
    }
    meterValue
    meterImage
    checklist {
      id
      title
      type
      consumable
      consumableFluid
      consumableAmount
      consumableUnitOfMeasure
      notes
      status
      photos
      numericStatus
      textStatus
    }
    who {
      id
      firstName
      lastName
      email
    }
    supervisor {
      id
      firstName
      lastName
      email
    }
    client {
      id
      name
    }
    completedOn
    createdOn
    updatedOn
  }
}
    `;

/**
 * __useInspectionByIdQuery__
 *
 * To run a query within a React component, call `useInspectionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInspectionByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionByIdQuery, InspectionByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionByIdQuery, InspectionByIdQueryVariables>(InspectionByIdDocument, baseOptions);
      }
export function useInspectionByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionByIdQuery, InspectionByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionByIdQuery, InspectionByIdQueryVariables>(InspectionByIdDocument, baseOptions);
        }
export type InspectionByIdQueryHookResult = ReturnType<typeof useInspectionByIdQuery>;
export type InspectionByIdLazyQueryHookResult = ReturnType<typeof useInspectionByIdLazyQuery>;
export type InspectionByIdQueryResult = ApolloReactCommon.QueryResult<InspectionByIdQuery, InspectionByIdQueryVariables>;
export const InspectionsForEquipmentDocument = gql`
    query inspectionsForEquipment($skip: Int!, $pageSize: Int!, $searchText: String, $id: String) {
  inspectionsForEquipment(skip: $skip, pageSize: $pageSize, searchText: $searchText, id: $id) {
    inspectionsForEquipment {
      id
      meterValue
      type
      completed
      checklist {
        title
      }
      client {
        id
        name
      }
      equipment {
        id
        name
        classification
        meterType
        make
        model
      }
      who {
        id
        firstName
        lastName
        email
      }
      supervisor {
        id
        firstName
        lastName
        email
      }
      completedOn
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useInspectionsForEquipmentQuery__
 *
 * To run a query within a React component, call `useInspectionsForEquipmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionsForEquipmentQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionsForEquipmentQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInspectionsForEquipmentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionsForEquipmentQuery, InspectionsForEquipmentQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionsForEquipmentQuery, InspectionsForEquipmentQueryVariables>(InspectionsForEquipmentDocument, baseOptions);
      }
export function useInspectionsForEquipmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionsForEquipmentQuery, InspectionsForEquipmentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionsForEquipmentQuery, InspectionsForEquipmentQueryVariables>(InspectionsForEquipmentDocument, baseOptions);
        }
export type InspectionsForEquipmentQueryHookResult = ReturnType<typeof useInspectionsForEquipmentQuery>;
export type InspectionsForEquipmentLazyQueryHookResult = ReturnType<typeof useInspectionsForEquipmentLazyQuery>;
export type InspectionsForEquipmentQueryResult = ApolloReactCommon.QueryResult<InspectionsForEquipmentQuery, InspectionsForEquipmentQueryVariables>;
export const InspectionsForListDocument = gql`
    query inspectionsForList($skip: Int!, $pageSize: Int!, $searchText: String) {
  inspections(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    inspections {
      id
      meterValue
      type
      completed
      checklist {
        title
      }
      client {
        id
        name
      }
      equipment {
        id
        name
        classification
        meterType
        make
        model
      }
      who {
        id
        firstName
        lastName
        email
      }
      supervisor {
        id
        firstName
        lastName
        email
      }
      completedOn
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useInspectionsForListQuery__
 *
 * To run a query within a React component, call `useInspectionsForListQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionsForListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionsForListQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useInspectionsForListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionsForListQuery, InspectionsForListQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionsForListQuery, InspectionsForListQueryVariables>(InspectionsForListDocument, baseOptions);
      }
export function useInspectionsForListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionsForListQuery, InspectionsForListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionsForListQuery, InspectionsForListQueryVariables>(InspectionsForListDocument, baseOptions);
        }
export type InspectionsForListQueryHookResult = ReturnType<typeof useInspectionsForListQuery>;
export type InspectionsForListLazyQueryHookResult = ReturnType<typeof useInspectionsForListLazyQuery>;
export type InspectionsForListQueryResult = ApolloReactCommon.QueryResult<InspectionsForListQuery, InspectionsForListQueryVariables>;
export const InspectionsPrintDocument = gql`
    query inspectionsPrint($selectedInspections: [String!]!) {
  inspectionsPrint(selectedInspections: $selectedInspections) {
    inspections {
      id
      type
      equipment {
        id
        name
        classification
        meterType
        make
        model
      }
      meterValue
      checklist {
        id
        title
        type
        consumable
        consumableFluid
        consumableAmount
        consumableUnitOfMeasure
        notes
        status
        photos
        numericStatus
        textStatus
      }
      who {
        id
        firstName
        lastName
        email
      }
      supervisor {
        id
        firstName
        lastName
        email
      }
      client {
        id
        name
      }
      completedOn
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useInspectionsPrintQuery__
 *
 * To run a query within a React component, call `useInspectionsPrintQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionsPrintQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionsPrintQuery({
 *   variables: {
 *      selectedInspections: // value for 'selectedInspections'
 *   },
 * });
 */
export function useInspectionsPrintQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InspectionsPrintQuery, InspectionsPrintQueryVariables>) {
        return ApolloReactHooks.useQuery<InspectionsPrintQuery, InspectionsPrintQueryVariables>(InspectionsPrintDocument, baseOptions);
      }
export function useInspectionsPrintLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InspectionsPrintQuery, InspectionsPrintQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InspectionsPrintQuery, InspectionsPrintQueryVariables>(InspectionsPrintDocument, baseOptions);
        }
export type InspectionsPrintQueryHookResult = ReturnType<typeof useInspectionsPrintQuery>;
export type InspectionsPrintLazyQueryHookResult = ReturnType<typeof useInspectionsPrintLazyQuery>;
export type InspectionsPrintQueryResult = ApolloReactCommon.QueryResult<InspectionsPrintQuery, InspectionsPrintQueryVariables>;
export const JobByIdDocument = gql`
    query jobById($id: String!) {
  jobById(id: $id) {
    id
    jobNumber
    name
    client {
      id
      name
    }
    officeLocation {
      id
      name
    }
    notificationUsers {
      id
      firstName
      lastName
      email
    }
    foreman {
      id
      firstName
      lastName
      email
    }
    addresses {
      lineOne
      city
      state
      postalCode
      country
      type
    }
    equipment {
      id
      name
      nickname
      meterType
      classification
      make
      model
      vinOrSerial
    }
    operators {
      id
      firstName
      lastName
      email
    }
    mechanics {
      id
      firstName
      lastName
      email
    }
    startDate
    endDate
  }
}
    `;

/**
 * __useJobByIdQuery__
 *
 * To run a query within a React component, call `useJobByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<JobByIdQuery, JobByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<JobByIdQuery, JobByIdQueryVariables>(JobByIdDocument, baseOptions);
      }
export function useJobByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<JobByIdQuery, JobByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<JobByIdQuery, JobByIdQueryVariables>(JobByIdDocument, baseOptions);
        }
export type JobByIdQueryHookResult = ReturnType<typeof useJobByIdQuery>;
export type JobByIdLazyQueryHookResult = ReturnType<typeof useJobByIdLazyQuery>;
export type JobByIdQueryResult = ApolloReactCommon.QueryResult<JobByIdQuery, JobByIdQueryVariables>;
export const JobsDocument = gql`
    query jobs($skip: Int!, $pageSize: Int!, $searchText: String) {
  jobs(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    jobs {
      id
      jobNumber
      name
      client {
        id
        name
      }
      foreman {
        id
        firstName
        lastName
        email
      }
      equipment {
        id
        name
        nickname
        meterType
      }
    }
    totalRows
  }
}
    `;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useJobsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<JobsQuery, JobsQueryVariables>) {
        return ApolloReactHooks.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, baseOptions);
      }
export function useJobsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, baseOptions);
        }
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = ApolloReactCommon.QueryResult<JobsQuery, JobsQueryVariables>;
export const MakeByIdDocument = gql`
    query makeById($id: String!) {
  makeById(id: $id) {
    id
    name
    models {
      name
      equipmentType
    }
    createdOn
    updatedOn
  }
}
    `;

/**
 * __useMakeByIdQuery__
 *
 * To run a query within a React component, call `useMakeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMakeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMakeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMakeByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MakeByIdQuery, MakeByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<MakeByIdQuery, MakeByIdQueryVariables>(MakeByIdDocument, baseOptions);
      }
export function useMakeByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MakeByIdQuery, MakeByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MakeByIdQuery, MakeByIdQueryVariables>(MakeByIdDocument, baseOptions);
        }
export type MakeByIdQueryHookResult = ReturnType<typeof useMakeByIdQuery>;
export type MakeByIdLazyQueryHookResult = ReturnType<typeof useMakeByIdLazyQuery>;
export type MakeByIdQueryResult = ApolloReactCommon.QueryResult<MakeByIdQuery, MakeByIdQueryVariables>;
export const MakesDocument = gql`
    query makes($skip: Int!, $pageSize: Int!, $searchText: String) {
  makes(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    makes {
      id
      name
      models {
        name
        equipmentType
      }
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useMakesQuery__
 *
 * To run a query within a React component, call `useMakesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMakesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMakesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useMakesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MakesQuery, MakesQueryVariables>) {
        return ApolloReactHooks.useQuery<MakesQuery, MakesQueryVariables>(MakesDocument, baseOptions);
      }
export function useMakesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MakesQuery, MakesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MakesQuery, MakesQueryVariables>(MakesDocument, baseOptions);
        }
export type MakesQueryHookResult = ReturnType<typeof useMakesQuery>;
export type MakesLazyQueryHookResult = ReturnType<typeof useMakesLazyQuery>;
export type MakesQueryResult = ApolloReactCommon.QueryResult<MakesQuery, MakesQueryVariables>;
export const NotificationByIdDocument = gql`
    query notificationById($id: String!) {
  notificationById(id: $id) {
    id
    notificationSource
    client {
      id
      name
    }
    equipment {
      id
      name
    }
    alertedUsers {
      id
      firstName
      lastName
    }
    officeLocation {
      id
      name
    }
    serviceInterval {
      id
      title
    }
  }
}
    `;

/**
 * __useNotificationByIdQuery__
 *
 * To run a query within a React component, call `useNotificationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNotificationByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationByIdQuery, NotificationByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<NotificationByIdQuery, NotificationByIdQueryVariables>(NotificationByIdDocument, baseOptions);
      }
export function useNotificationByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationByIdQuery, NotificationByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NotificationByIdQuery, NotificationByIdQueryVariables>(NotificationByIdDocument, baseOptions);
        }
export type NotificationByIdQueryHookResult = ReturnType<typeof useNotificationByIdQuery>;
export type NotificationByIdLazyQueryHookResult = ReturnType<typeof useNotificationByIdLazyQuery>;
export type NotificationByIdQueryResult = ApolloReactCommon.QueryResult<NotificationByIdQuery, NotificationByIdQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($skip: Int!, $pageSize: Int!, $searchText: String) {
  notifications(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    notifications {
      id
      notificationSource
      client {
        id
        name
      }
      equipment {
        id
        name
      }
      alertedUsers {
        id
        firstName
        lastName
        email
      }
      officeLocation {
        id
        name
      }
      serviceInterval {
        id
        title
      }
      createdOn
      viewedOn
    }
    totalRows
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
      }
export function useNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, baseOptions);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = ApolloReactCommon.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const OfficeLocationByIdDocument = gql`
    query officeLocationById($id: String!) {
  officeLocationById(id: $id) {
    id
    name
    administrator {
      id
      firstName
      lastName
      email
    }
    client {
      id
      name
    }
    phones {
      type
      digits
      extension
    }
    notificationUsers {
      id
      firstName
      lastName
      email
    }
    operators {
      id
      firstName
      lastName
      email
    }
    mechanics {
      id
      firstName
      lastName
      email
    }
    addresses {
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
    equipment {
      id
      name
      nickname
      meterType
      classification
      make
      model
      vinOrSerial
    }
  }
}
    `;

/**
 * __useOfficeLocationByIdQuery__
 *
 * To run a query within a React component, call `useOfficeLocationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficeLocationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficeLocationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOfficeLocationByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OfficeLocationByIdQuery, OfficeLocationByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<OfficeLocationByIdQuery, OfficeLocationByIdQueryVariables>(OfficeLocationByIdDocument, baseOptions);
      }
export function useOfficeLocationByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OfficeLocationByIdQuery, OfficeLocationByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OfficeLocationByIdQuery, OfficeLocationByIdQueryVariables>(OfficeLocationByIdDocument, baseOptions);
        }
export type OfficeLocationByIdQueryHookResult = ReturnType<typeof useOfficeLocationByIdQuery>;
export type OfficeLocationByIdLazyQueryHookResult = ReturnType<typeof useOfficeLocationByIdLazyQuery>;
export type OfficeLocationByIdQueryResult = ApolloReactCommon.QueryResult<OfficeLocationByIdQuery, OfficeLocationByIdQueryVariables>;
export const OfficeLocationsDocument = gql`
    query officeLocations($skip: Int!, $pageSize: Int!, $searchText: String) {
  officeLocations(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    officeLocations {
      id
      name
      administrator {
        id
        firstName
        lastName
        email
      }
      client {
        id
        name
      }
      phones {
        type
        digits
        extension
      }
      operators {
        id
        firstName
        lastName
        email
      }
      mechanics {
        id
        firstName
        lastName
        email
      }
      addresses {
        lineOne
        lineTwo
        lineThree
        city
        state
        postalCode
        country
        type
      }
    }
    totalRows
  }
}
    `;

/**
 * __useOfficeLocationsQuery__
 *
 * To run a query within a React component, call `useOfficeLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficeLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficeLocationsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useOfficeLocationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OfficeLocationsQuery, OfficeLocationsQueryVariables>) {
        return ApolloReactHooks.useQuery<OfficeLocationsQuery, OfficeLocationsQueryVariables>(OfficeLocationsDocument, baseOptions);
      }
export function useOfficeLocationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OfficeLocationsQuery, OfficeLocationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OfficeLocationsQuery, OfficeLocationsQueryVariables>(OfficeLocationsDocument, baseOptions);
        }
export type OfficeLocationsQueryHookResult = ReturnType<typeof useOfficeLocationsQuery>;
export type OfficeLocationsLazyQueryHookResult = ReturnType<typeof useOfficeLocationsLazyQuery>;
export type OfficeLocationsQueryResult = ApolloReactCommon.QueryResult<OfficeLocationsQuery, OfficeLocationsQueryVariables>;
export const RolePermissionByIdDocument = gql`
    query rolePermissionById($id: String!) {
  rolePermissionById(id: $id) {
    id
    name
    type
    privileges
  }
}
    `;

/**
 * __useRolePermissionByIdQuery__
 *
 * To run a query within a React component, call `useRolePermissionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolePermissionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolePermissionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRolePermissionByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolePermissionByIdQuery, RolePermissionByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<RolePermissionByIdQuery, RolePermissionByIdQueryVariables>(RolePermissionByIdDocument, baseOptions);
      }
export function useRolePermissionByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolePermissionByIdQuery, RolePermissionByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolePermissionByIdQuery, RolePermissionByIdQueryVariables>(RolePermissionByIdDocument, baseOptions);
        }
export type RolePermissionByIdQueryHookResult = ReturnType<typeof useRolePermissionByIdQuery>;
export type RolePermissionByIdLazyQueryHookResult = ReturnType<typeof useRolePermissionByIdLazyQuery>;
export type RolePermissionByIdQueryResult = ApolloReactCommon.QueryResult<RolePermissionByIdQuery, RolePermissionByIdQueryVariables>;
export const RolePermissionsDocument = gql`
    query rolePermissions($skip: Int!, $pageSize: Int!, $searchText: String) {
  rolePermissions(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    rolePermissions {
      id
      name
      type
      privileges
    }
    totalRows
  }
}
    `;

/**
 * __useRolePermissionsQuery__
 *
 * To run a query within a React component, call `useRolePermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolePermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolePermissionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useRolePermissionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
        return ApolloReactHooks.useQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, baseOptions);
      }
export function useRolePermissionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, baseOptions);
        }
export type RolePermissionsQueryHookResult = ReturnType<typeof useRolePermissionsQuery>;
export type RolePermissionsLazyQueryHookResult = ReturnType<typeof useRolePermissionsLazyQuery>;
export type RolePermissionsQueryResult = ApolloReactCommon.QueryResult<RolePermissionsQuery, RolePermissionsQueryVariables>;
export const AvailableRolesDocument = gql`
    query availableRoles($skip: Int!, $pageSize: Int!, $searchText: String, $userId: String) {
  availableRoles(skip: $skip, pageSize: $pageSize, searchText: $searchText, userId: $userId) {
    roles {
      id
      name
      type
      scope
      permissions {
        id
        name
        type
        privileges
      }
    }
    totalRows
  }
}
    `;

/**
 * __useAvailableRolesQuery__
 *
 * To run a query within a React component, call `useAvailableRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableRolesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAvailableRolesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AvailableRolesQuery, AvailableRolesQueryVariables>) {
        return ApolloReactHooks.useQuery<AvailableRolesQuery, AvailableRolesQueryVariables>(AvailableRolesDocument, baseOptions);
      }
export function useAvailableRolesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AvailableRolesQuery, AvailableRolesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AvailableRolesQuery, AvailableRolesQueryVariables>(AvailableRolesDocument, baseOptions);
        }
export type AvailableRolesQueryHookResult = ReturnType<typeof useAvailableRolesQuery>;
export type AvailableRolesLazyQueryHookResult = ReturnType<typeof useAvailableRolesLazyQuery>;
export type AvailableRolesQueryResult = ApolloReactCommon.QueryResult<AvailableRolesQuery, AvailableRolesQueryVariables>;
export const RolesDocument = gql`
    query roles($skip: Int!, $pageSize: Int!, $searchText: String) {
  roles(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    roles {
      id
      name
      type
      scope
      permissions {
        id
        name
        privileges
      }
    }
    totalRows
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        return ApolloReactHooks.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
      }
export function useRolesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, baseOptions);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = ApolloReactCommon.QueryResult<RolesQuery, RolesQueryVariables>;
export const RolesByTypeDocument = gql`
    query rolesByType($type: String!) {
  rolesByType(type: $type) {
    id
    name
    type
    scope
    permissions {
      id
      name
      privileges
    }
  }
}
    `;

/**
 * __useRolesByTypeQuery__
 *
 * To run a query within a React component, call `useRolesByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesByTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useRolesByTypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolesByTypeQuery, RolesByTypeQueryVariables>) {
        return ApolloReactHooks.useQuery<RolesByTypeQuery, RolesByTypeQueryVariables>(RolesByTypeDocument, baseOptions);
      }
export function useRolesByTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolesByTypeQuery, RolesByTypeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolesByTypeQuery, RolesByTypeQueryVariables>(RolesByTypeDocument, baseOptions);
        }
export type RolesByTypeQueryHookResult = ReturnType<typeof useRolesByTypeQuery>;
export type RolesByTypeLazyQueryHookResult = ReturnType<typeof useRolesByTypeLazyQuery>;
export type RolesByTypeQueryResult = ApolloReactCommon.QueryResult<RolesByTypeQuery, RolesByTypeQueryVariables>;
export const RolesForSelectionDocument = gql`
    query rolesForSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  roles(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    roles {
      id
      name
    }
    totalRows
  }
}
    `;

/**
 * __useRolesForSelectionQuery__
 *
 * To run a query within a React component, call `useRolesForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesForSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useRolesForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RolesForSelectionQuery, RolesForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<RolesForSelectionQuery, RolesForSelectionQueryVariables>(RolesForSelectionDocument, baseOptions);
      }
export function useRolesForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RolesForSelectionQuery, RolesForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RolesForSelectionQuery, RolesForSelectionQueryVariables>(RolesForSelectionDocument, baseOptions);
        }
export type RolesForSelectionQueryHookResult = ReturnType<typeof useRolesForSelectionQuery>;
export type RolesForSelectionLazyQueryHookResult = ReturnType<typeof useRolesForSelectionLazyQuery>;
export type RolesForSelectionQueryResult = ApolloReactCommon.QueryResult<RolesForSelectionQuery, RolesForSelectionQueryVariables>;
export const ServiceIntervalByIdDocument = gql`
    query serviceIntervalById($id: String!) {
  serviceIntervalById(id: $id) {
    id
    title
    make
    model
    meterType
    client {
      id
      name
    }
    milestones {
      id
      title
      alertBeforeDue
      meterValue
      oneTime
      serviceItems {
        id
        name
        partName
        partNumber
        fromMilestoneId
        isNew
      }
    }
    createdOn
    updatedOn
  }
}
    `;

/**
 * __useServiceIntervalByIdQuery__
 *
 * To run a query within a React component, call `useServiceIntervalByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceIntervalByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceIntervalByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useServiceIntervalByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServiceIntervalByIdQuery, ServiceIntervalByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<ServiceIntervalByIdQuery, ServiceIntervalByIdQueryVariables>(ServiceIntervalByIdDocument, baseOptions);
      }
export function useServiceIntervalByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServiceIntervalByIdQuery, ServiceIntervalByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ServiceIntervalByIdQuery, ServiceIntervalByIdQueryVariables>(ServiceIntervalByIdDocument, baseOptions);
        }
export type ServiceIntervalByIdQueryHookResult = ReturnType<typeof useServiceIntervalByIdQuery>;
export type ServiceIntervalByIdLazyQueryHookResult = ReturnType<typeof useServiceIntervalByIdLazyQuery>;
export type ServiceIntervalByIdQueryResult = ApolloReactCommon.QueryResult<ServiceIntervalByIdQuery, ServiceIntervalByIdQueryVariables>;
export const ServiceIntervalsDocument = gql`
    query serviceIntervals($skip: Int!, $pageSize: Int!, $searchText: String) {
  serviceIntervals(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    serviceIntervals {
      id
      title
      make
      model
      meterType
      client {
        id
        name
      }
      milestones {
        title
        alertBeforeDue
        meterValue
        oneTime
        serviceItems {
          name
          partName
          partNumber
        }
      }
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useServiceIntervalsQuery__
 *
 * To run a query within a React component, call `useServiceIntervalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceIntervalsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceIntervalsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useServiceIntervalsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServiceIntervalsQuery, ServiceIntervalsQueryVariables>) {
        return ApolloReactHooks.useQuery<ServiceIntervalsQuery, ServiceIntervalsQueryVariables>(ServiceIntervalsDocument, baseOptions);
      }
export function useServiceIntervalsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServiceIntervalsQuery, ServiceIntervalsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ServiceIntervalsQuery, ServiceIntervalsQueryVariables>(ServiceIntervalsDocument, baseOptions);
        }
export type ServiceIntervalsQueryHookResult = ReturnType<typeof useServiceIntervalsQuery>;
export type ServiceIntervalsLazyQueryHookResult = ReturnType<typeof useServiceIntervalsLazyQuery>;
export type ServiceIntervalsQueryResult = ApolloReactCommon.QueryResult<ServiceIntervalsQuery, ServiceIntervalsQueryVariables>;
export const ServiceIntervalsForSelectionDocument = gql`
    query serviceIntervalsForSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  serviceIntervals(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    serviceIntervals {
      id
      title
      meterType
    }
    totalRows
  }
}
    `;

/**
 * __useServiceIntervalsForSelectionQuery__
 *
 * To run a query within a React component, call `useServiceIntervalsForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceIntervalsForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceIntervalsForSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useServiceIntervalsForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServiceIntervalsForSelectionQuery, ServiceIntervalsForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<ServiceIntervalsForSelectionQuery, ServiceIntervalsForSelectionQueryVariables>(ServiceIntervalsForSelectionDocument, baseOptions);
      }
export function useServiceIntervalsForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServiceIntervalsForSelectionQuery, ServiceIntervalsForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ServiceIntervalsForSelectionQuery, ServiceIntervalsForSelectionQueryVariables>(ServiceIntervalsForSelectionDocument, baseOptions);
        }
export type ServiceIntervalsForSelectionQueryHookResult = ReturnType<typeof useServiceIntervalsForSelectionQuery>;
export type ServiceIntervalsForSelectionLazyQueryHookResult = ReturnType<typeof useServiceIntervalsForSelectionLazyQuery>;
export type ServiceIntervalsForSelectionQueryResult = ApolloReactCommon.QueryResult<ServiceIntervalsForSelectionQuery, ServiceIntervalsForSelectionQueryVariables>;
export const UsersByClientIdDocument = gql`
    query usersByClientId($clientId: String!, $role: String) {
  userByClientId(clientId: $clientId, role: $role) {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useUsersByClientIdQuery__
 *
 * To run a query within a React component, call `useUsersByClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByClientIdQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUsersByClientIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersByClientIdQuery, UsersByClientIdQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersByClientIdQuery, UsersByClientIdQueryVariables>(UsersByClientIdDocument, baseOptions);
      }
export function useUsersByClientIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersByClientIdQuery, UsersByClientIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersByClientIdQuery, UsersByClientIdQueryVariables>(UsersByClientIdDocument, baseOptions);
        }
export type UsersByClientIdQueryHookResult = ReturnType<typeof useUsersByClientIdQuery>;
export type UsersByClientIdLazyQueryHookResult = ReturnType<typeof useUsersByClientIdLazyQuery>;
export type UsersByClientIdQueryResult = ApolloReactCommon.QueryResult<UsersByClientIdQuery, UsersByClientIdQueryVariables>;
export const UsersByIdDocument = gql`
    query usersById($id: String!) {
  userById(id: $id) {
    id
    firstName
    lastName
    email
    active
    password
    roles {
      id
      name
      type
      permissions {
        id
        name
        type
        privileges
      }
    }
    supervisor {
      id
      firstName
      lastName
      email
    }
    client {
      id
      name
    }
    addresses {
      lineOne
      lineTwo
      lineThree
      city
      state
      postalCode
      country
      type
    }
    phones {
      type
      digits
      extension
    }
    createdOn
    updatedOn
  }
}
    `;

/**
 * __useUsersByIdQuery__
 *
 * To run a query within a React component, call `useUsersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUsersByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersByIdQuery, UsersByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersByIdQuery, UsersByIdQueryVariables>(UsersByIdDocument, baseOptions);
      }
export function useUsersByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersByIdQuery, UsersByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersByIdQuery, UsersByIdQueryVariables>(UsersByIdDocument, baseOptions);
        }
export type UsersByIdQueryHookResult = ReturnType<typeof useUsersByIdQuery>;
export type UsersByIdLazyQueryHookResult = ReturnType<typeof useUsersByIdLazyQuery>;
export type UsersByIdQueryResult = ApolloReactCommon.QueryResult<UsersByIdQuery, UsersByIdQueryVariables>;
export const UsersForSelectionDocument = gql`
    query usersForSelection($skip: Int!, $pageSize: Int!, $searchText: String) {
  users(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    users {
      id
      firstName
      lastName
      email
    }
    totalRows
  }
}
    `;

/**
 * __useUsersForSelectionQuery__
 *
 * To run a query within a React component, call `useUsersForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersForSelectionQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useUsersForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersForSelectionQuery, UsersForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersForSelectionQuery, UsersForSelectionQueryVariables>(UsersForSelectionDocument, baseOptions);
      }
export function useUsersForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersForSelectionQuery, UsersForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersForSelectionQuery, UsersForSelectionQueryVariables>(UsersForSelectionDocument, baseOptions);
        }
export type UsersForSelectionQueryHookResult = ReturnType<typeof useUsersForSelectionQuery>;
export type UsersForSelectionLazyQueryHookResult = ReturnType<typeof useUsersForSelectionLazyQuery>;
export type UsersForSelectionQueryResult = ApolloReactCommon.QueryResult<UsersForSelectionQuery, UsersForSelectionQueryVariables>;
export const UsersDocument = gql`
    query users($skip: Int!, $pageSize: Int!, $searchText: String) {
  users(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
    users {
      id
      firstName
      lastName
      email
      client {
        id
        name
      }
      phones {
        type
        digits
      }
      roles {
        id
        name
      }
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersWithOperatorsAndMechanicsDocument = gql`
    query usersWithOperatorsAndMechanics($clientId: String!, $role: String, $searchText: String) {
  userByClientId(clientId: $clientId, role: $role, searchText: $searchText) {
    id
    firstName
    lastName
    email
  }
  operators: userByClientId(clientId: $clientId, role: "Operator", searchText: $searchText) {
    id
    firstName
    lastName
    email
  }
  mechanics: userByClientId(clientId: $clientId, role: "Mechanic", searchText: $searchText) {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useUsersWithOperatorsAndMechanicsQuery__
 *
 * To run a query within a React component, call `useUsersWithOperatorsAndMechanicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithOperatorsAndMechanicsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithOperatorsAndMechanicsQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      role: // value for 'role'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useUsersWithOperatorsAndMechanicsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersWithOperatorsAndMechanicsQuery, UsersWithOperatorsAndMechanicsQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersWithOperatorsAndMechanicsQuery, UsersWithOperatorsAndMechanicsQueryVariables>(UsersWithOperatorsAndMechanicsDocument, baseOptions);
      }
export function useUsersWithOperatorsAndMechanicsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersWithOperatorsAndMechanicsQuery, UsersWithOperatorsAndMechanicsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersWithOperatorsAndMechanicsQuery, UsersWithOperatorsAndMechanicsQueryVariables>(UsersWithOperatorsAndMechanicsDocument, baseOptions);
        }
export type UsersWithOperatorsAndMechanicsQueryHookResult = ReturnType<typeof useUsersWithOperatorsAndMechanicsQuery>;
export type UsersWithOperatorsAndMechanicsLazyQueryHookResult = ReturnType<typeof useUsersWithOperatorsAndMechanicsLazyQuery>;
export type UsersWithOperatorsAndMechanicsQueryResult = ApolloReactCommon.QueryResult<UsersWithOperatorsAndMechanicsQuery, UsersWithOperatorsAndMechanicsQueryVariables>;
export const WorkOrderByIdDocument = gql`
    query workOrderById($id: String!) {
  workOrderById(id: $id) {
    id
    equipment {
      id
      name
      classification
      meterType
      make
      model
      vinOrSerial
    }
    client {
      id
      name
    }
    reportedBy {
      id
      firstName
      lastName
      email
    }
    assignedTo {
      id
      firstName
      lastName
      email
    }
    inspection {
      id
      title
      inspectionChecklists {
        id
        title
      }
    }
    serviceInterval {
      id
      title
      milestone {
        id
        title
        oneTime
        serviceDue
        alertBeforeServiceDue
      }
    }
    workItems {
      id
      title
      partName
      partNumber
      history {
        id
        message
        user {
          id
          firstName
          lastName
          email
        }
        enteredOn
      }
      photos
      completed
      completedBy {
        id
        firstName
        lastName
        email
      }
      completedOn
    }
    history {
      id
      message
      user {
        id
        firstName
        lastName
        email
      }
      enteredOn
    }
    notes
    photos
    status
    meterValue
    assignedOn
    completedOn
    createdOn
    updatedOn
  }
}
    `;

/**
 * __useWorkOrderByIdQuery__
 *
 * To run a query within a React component, call `useWorkOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWorkOrderByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WorkOrderByIdQuery, WorkOrderByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<WorkOrderByIdQuery, WorkOrderByIdQueryVariables>(WorkOrderByIdDocument, baseOptions);
      }
export function useWorkOrderByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WorkOrderByIdQuery, WorkOrderByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WorkOrderByIdQuery, WorkOrderByIdQueryVariables>(WorkOrderByIdDocument, baseOptions);
        }
export type WorkOrderByIdQueryHookResult = ReturnType<typeof useWorkOrderByIdQuery>;
export type WorkOrderByIdLazyQueryHookResult = ReturnType<typeof useWorkOrderByIdLazyQuery>;
export type WorkOrderByIdQueryResult = ApolloReactCommon.QueryResult<WorkOrderByIdQuery, WorkOrderByIdQueryVariables>;
export const WorkOrdersDocument = gql`
    query workOrders($skip: Int!, $pageSize: Int!, $searchText: String, $completed: Boolean, $equipmentId: String) {
  workOrders(skip: $skip, pageSize: $pageSize, searchText: $searchText, completed: $completed, equipmentId: $equipmentId) {
    workOrders {
      id
      equipment {
        id
        name
        nickname
        make
        model
        meterType
        classification
        vinOrSerial
      }
      client {
        id
        name
      }
      reportedBy {
        id
        firstName
        lastName
      }
      inspection {
        id
        title
      }
      serviceInterval {
        id
        title
      }
      status
      meterValue
      completedOn
      assignedOn
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useWorkOrdersQuery__
 *
 * To run a query within a React component, call `useWorkOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkOrdersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      pageSize: // value for 'pageSize'
 *      searchText: // value for 'searchText'
 *      completed: // value for 'completed'
 *      equipmentId: // value for 'equipmentId'
 *   },
 * });
 */
export function useWorkOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WorkOrdersQuery, WorkOrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WorkOrdersDocument, baseOptions);
      }
export function useWorkOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WorkOrdersQuery, WorkOrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WorkOrdersQuery, WorkOrdersQueryVariables>(WorkOrdersDocument, baseOptions);
        }
export type WorkOrdersQueryHookResult = ReturnType<typeof useWorkOrdersQuery>;
export type WorkOrdersLazyQueryHookResult = ReturnType<typeof useWorkOrdersLazyQuery>;
export type WorkOrdersQueryResult = ApolloReactCommon.QueryResult<WorkOrdersQuery, WorkOrdersQueryVariables>;
export const WorkOrdersPrintDocument = gql`
    query workOrdersPrint($selectedInspections: [String!]!) {
  workOrdersPrint(selectedInspections: $selectedInspections) {
    workOrders {
      id
      equipment {
        id
        name
        classification
        meterType
        make
        model
        vinOrSerial
      }
      client {
        id
        name
      }
      reportedBy {
        id
        firstName
        lastName
        email
      }
      assignedTo {
        id
        firstName
        lastName
        email
      }
      inspection {
        id
        title
      }
      notes
      photos
      status
      meterValue
      completedOn
      createdOn
      updatedOn
    }
    totalRows
  }
}
    `;

/**
 * __useWorkOrdersPrintQuery__
 *
 * To run a query within a React component, call `useWorkOrdersPrintQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkOrdersPrintQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkOrdersPrintQuery({
 *   variables: {
 *      selectedInspections: // value for 'selectedInspections'
 *   },
 * });
 */
export function useWorkOrdersPrintQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WorkOrdersPrintQuery, WorkOrdersPrintQueryVariables>) {
        return ApolloReactHooks.useQuery<WorkOrdersPrintQuery, WorkOrdersPrintQueryVariables>(WorkOrdersPrintDocument, baseOptions);
      }
export function useWorkOrdersPrintLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WorkOrdersPrintQuery, WorkOrdersPrintQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WorkOrdersPrintQuery, WorkOrdersPrintQueryVariables>(WorkOrdersPrintDocument, baseOptions);
        }
export type WorkOrdersPrintQueryHookResult = ReturnType<typeof useWorkOrdersPrintQuery>;
export type WorkOrdersPrintLazyQueryHookResult = ReturnType<typeof useWorkOrdersPrintLazyQuery>;
export type WorkOrdersPrintQueryResult = ApolloReactCommon.QueryResult<WorkOrdersPrintQuery, WorkOrdersPrintQueryVariables>;