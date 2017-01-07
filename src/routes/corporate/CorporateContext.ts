import React from 'react';
import { User, WorkOrder } from 'generated';
import { Action } from './CorporateReducer';

export interface CorporateContextState {
  users: {
    page: number;
    skip: number;
    pageSize: number;
    searchText: '';
    currentUser: User | null;
  };
  workOrders: {
    searchText: '';
    currentWorkOrder: WorkOrder | null;
  };
  fluidReports: {
    searchText: '';
    currentFluidReport: WorkOrder | null;
  };
}

export interface State {
  state: CorporateContextState;
  dispatch: React.Dispatch<Action> | null;
}

const CorporateContext = React.createContext<State>({
  state: {
    users: {
      page: 1,
      skip: 0,
      pageSize: 3,
      searchText: '',
      currentUser: null,
    },
    workOrders: {
      searchText: '',
      currentWorkOrder: null,
    },
    fluidReports: {
      searchText: '',
      currentFluidReport: null,
    },
  },
  dispatch: null,
});

export default CorporateContext;
