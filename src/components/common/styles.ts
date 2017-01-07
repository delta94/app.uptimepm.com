export const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2fa449' : 'white',
    color: state.isSelected ? 'white' : '#545454',
    fontWeight: state.isSelected ? 600 : 'normal',
    fontFamily: `'NoirPro', sans-serif`,
    '&:hover': {
      backgroundColor: state.isSelected ? '#2fa449' : '#d5e3d6',
      cursor: state.isSelected ? 'normal' : 'pointer',
    },
  }),
  noOptionsMessage: (provided: any, state: any) => {
    // console.log('provided', provided);
    return {
      ...provided,
      backgroundColor: '#d5e3d6',
      color: '#121212',
    };
  },
  placeholder: (provided: any, state: any) => {
    // console.log('provided', provided);
    return {
      ...provided,
      color: '#ccc',
    };
  },
  container: (provided: any, state: any) => {
    // console.log('container => provided', provided);
    return {
      ...provided,
    };
  },
  loadingIndicator: (provided: any, state: any) => {
    // console.log('loadingIndicator => provided', provided);
    return {
      ...provided,
    };
  },
  loadingMessage: (provided: any, state: any) => {
    // console.log('loadingMessage => provided', provided);
    return {
      ...provided,
      color: '#ccc',
    };
  },
  menu: (provided: any, state: any) => {
    return {
      ...provided,
      border: 'none',
      borderRadius: '6px',
      padding: 0,
      outline: 'none',
      overflow: 'auto',
      position: 'absolute',
      boxSizing: 'border-box',
      margin: '4px 0 0 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    };
  },
  menuList: (provided: any, state: any) => ({
    ...provided,
    padding: 0,
    margin: '0 0 0 0',
  }),
  // menuPortal: (provided: any, state: any) => ({
  //   ...provided,
  //         border: 'solid 10px black',
  // }),
  // groupHeading: (provided: any, state: any) => ({
  //   ...provided,
  //         border: 'solid 10px black',
  // }),
  // group: (provided: any, state: any) => ({
  //   ...provided,
  //         border: 'solid 10px black',
  // }),
  // container: (provided: any, state: any) => ({
  //   ...provided,
  //   border: 'solid 10px black',
  // }),

  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '36px',
    maxHeight: '36px',
    borderColor: '#d9d9d9',
    borderRadius: '6px',
    color: '#545454',
    boxShadow: state.isFocused || state.isHovered ? '0 0 0 2px rgba(47,164,73,0.2)' : '0 0 0 0',

    '&:hover': {
      borderColor: '#4fb061',
    },
    '&:active': {
      borderColor: '#4fb061',
      boxShadow: '0 0 0 2px rgba(47,164,73,0.2)',
    },
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, color: '#545454', opacity, transition };
  },
};
