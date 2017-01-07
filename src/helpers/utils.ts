import omitDeep from 'omit-deep-lodash';
import uniqid from 'uniqid';

/* Apollo-Client adds __typename automatically into the query response.
  If we want use the same response for mutation we have to remove __typename from the object.
  'removeTypename' method can be used for the same.
*/
export const removeTypename = (obj: any): any => {
  return omitDeep(obj, ['__typename']);
};

export const camelCaseToDash = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const camelCaseIdToDash = (id: string) => {
  const parts = id.split('/');
  return `${parts[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}/${parts[1]}`;
};

export const groupBy = (xs: any, key: string) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getServiceItemId = () => {
  // use $ and @ instead of - and _
  // shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
  const token = uniqid.time();
  console.log('token', token);
  return token;
};

export const getMilestoneFromServiceItemId = (str: string) => {
  return str.split('_')[0];
};

export const separateCapitalLetter = (str: string) => {
  let returnStr = '';
  const arr = str.match(/[A-Z][a-z]+/g);
  if (arr) {
    arr.forEach(word => {
      returnStr = returnStr + ' ' + word;
    });
  }
  return returnStr.trim();
};

// Using splice to work with React.state
// slice does immutability to the object so avoid it on state.
export const insertSliceArray = (arr: any[], index: number, newItem: any[]) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  ...newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const insertSlice = (arr: any[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
