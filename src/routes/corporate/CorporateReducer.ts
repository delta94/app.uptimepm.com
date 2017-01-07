import { CorporateContextState } from './CorporateContext';

export const CONSTANTS = {
  SetUsersSearchText: 'SET_USERS_SEARCH_TEXT',
  SetUsersPagination: 'SET_USERS_PAGINATION',
  SetWorkOrdersSearchText: 'SET_WORK_ORDERS_SEARCH_TEXT',
  SetFluidReportsSearchText: 'SET_FLUID_REPORTS_SEARCH_TEXT',
};

export interface Action {
  type: string;
  payload: any;
}

export default (state: CorporateContextState, action: Action) => {
  switch (action.type) {
    case CONSTANTS.SetUsersSearchText:
      return {
        ...state,
        users: { ...state.users, searchText: action.payload },
      };

    case CONSTANTS.SetWorkOrdersSearchText:
      return {
        ...state,
        workOrders: { ...state.workOrders, searchText: action.payload },
      };

    case CONSTANTS.SetFluidReportsSearchText:
      return {
        ...state,
        fluidReports: { ...state.fluidReports, searchText: action.payload },
      };

    case CONSTANTS.SetUsersPagination:
      const users = { ...state.users, ...action.payload };
      // console.log('users', users);
      return {
        ...state,
        users,
      };

    default:
      return state;
  }
};
