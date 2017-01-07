export interface ICoordinates {
  longitude: number;
  latitude: number;
}

export enum InterpreterRankingEnum {
  distance = 'Distance',
  rating = 'Rating',
  cost = 'Cost',
}

export interface IKeyValueStringPair {
  key: string;
  value: string;
}

export interface ITablePagination {
  skip: number;
  pageSize: number;
}

export interface ITablePaginationWithSearchText extends ITablePagination {
  searchText?: string;
}

export interface IRavenDocumentBase {
  id?: string;
  createdOn?: Date;
  updatedOn?: Date;
}
