import React from 'react';
import { Drawer, Form, message, Radio } from 'antd';

import ColorPicker from './ColorPicker';

import CustomScrollbars from '../util/CustomScrollbars';
import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';

import {
  BLUE,
  BLUE_DARK_TEXT_COLOR,
  BLUE_NAV_DARK_BG,
  BLUE_SEC,
  DARK_BLUE,
  DARK_BLUE_DARK_TEXT_COLOR,
  DARK_BLUE_NAV_DARK_BG,
  DARK_BLUE_SEC,
  DEEP_ORANGE,
  DEEP_ORANGE_DARK_TEXT_COLOR,
  DEEP_ORANGE_NAV_DARK_BG,
  DEEP_ORANGE_SEC,
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  LIGHT_BLUE,
  LIGHT_BLUE_DARK_TEXT_COLOR,
  LIGHT_BLUE_NAV_DARK_BG,
  LIGHT_BLUE_SEC,
  LIGHT_PURPLE,
  LIGHT_PURPLE_1,
  LIGHT_PURPLE_1_DARK_TEXT_COLOR,
  LIGHT_PURPLE_1_NAV_DARK_BG,
  LIGHT_PURPLE_1_SEC,
  LIGHT_PURPLE_2,
  LIGHT_PURPLE_2_DARK_TEXT_COLOR,
  LIGHT_PURPLE_2_NAV_DARK_BG,
  LIGHT_PURPLE_2_SEC,
  LIGHT_PURPLE_DARK_TEXT_COLOR,
  LIGHT_PURPLE_NAV_DARK_BG,
  LIGHT_PURPLE_SEC,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  ORANGE,
  ORANGE_DARK_TEXT_COLOR,
  ORANGE_NAV_DARK_BG,
  ORANGE_SEC,
  RED,
  RED_DARK_TEXT_COLOR,
  RED_NAV_DARK_BG,
  RED_SEC,
  THEME_TYPE_DARK,
  THEME_TYPE_LITE,
  THEME_TYPE_SEMI_DARK,
} from 'constants/ThemeSetting';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface MyWindow extends Window {
  less: any;
}

interface CustomizerProps {
  form: WrappedFormUtils;
}

interface IStateInitialValue {
  '@primary-color': string;
  '@secondary-color': string;
  '@text-color': string;
  '@heading-color': string;
  '@nav-dark-bg': string;
  '@nav-dark-text-color': string;
  '@header-text-color': string;
  '@layout-header-background': string;
  '@layout-footer-background': string;
  '@body-background': string;
  '@hor-nav-text-color': string;
}
interface CustomizerState {
  isCustomizerOpened: boolean;
  vars: any;
  initialValue: IStateInitialValue;
}

class Customizer extends React.Component<CustomizerProps & ISettingsContext, CustomizerState> {
  onChangeComplete = (varName: string, color: string) => {
    const { vars } = this.state;
    vars[varName] = color;
    this.setState({ vars });
  };
  handleColorChange = (varName?: string, color?: string) => {
    const { vars } = this.state;
    if (varName) vars[varName] = color;
    // window.less
    //   .modifyVars(vars)
    //   .then(() => {
    //     message.success(`Colors updated successfully`);
    //     this.setState({ vars });
    //     localStorage.setItem('app.colors', JSON.stringify(vars));
    //   })
    //   .catch((error: Error) => {
    //     message.error(`Failed to update theme`);
    //   });
  };
  getColorPicker = (varName: string) => (
    <div key={varName} className="upm-media upm-mb-1">
      <div className="upm-ml-1 upm-mr-4">
        <ColorPicker
          type="sketch"
          small
          color={this.state.vars[varName]}
          position="bottom"
          // presetColors={[
          //   '#038fde',
          //   '#722ED1',
          //   '#2F54EB',
          //   '#1890FF',
          //   '#13C2C2',
          //   '#EB2F96',
          //   '#F5222D',
          //   '#FA541C',
          //   '#FA8C16',
          //   '#FAAD14',
          //   '#FADB14',
          //   '#A0D911',
          //   '#52C41A',
          // ]}
          onChangeComplete={color => this.handleColorChange(varName, color)}
        >
          <span className="upm-pointer upm-text-capitalize upm-media-body">{varName.substr(1, varName.length).replace(/-/g, ' ')}</span>
        </ColorPicker>
      </div>
    </div>
  );
  resetTheme = () => {
    localStorage.setItem('app.colors', '{}');
    this.setState({ vars: this.state.initialValue });
    // window.less.modifyVars(this.state.initialValue).catch((error: Error) => {
    //   message.error(`Failed to reset theme`);
    // });
  };
  toggleCustomizer = () => {
    this.setState(previousState => ({
      isCustomizerOpened: !previousState.isCustomizerOpened,
    }));
  };

  onThemeTypeChange = (e: any) => {
    localStorage.setItem('app.theme', e.target.value);
    this.props.setThemeType(e.target.value);
    message.success(`Theme updated successfully`);
  };
  onColorSelectionTypeChange = (e: any) => {
    // localStorage.setItem('app.theme', e.target.value);
    this.props.setThemeColorSelection(e.target.value);
  };

  onNavStyleChange = (navStyle: string) => {
    localStorage.setItem('app.nav', navStyle);
    this.props.onNavStyleChange(navStyle);
    message.success(`Nav Style updated successfully`);
  };

  getCustomizerContent = () => {
    const {
      values: { themeType, layoutType, navStyle },
    } = this.props;

    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme');
    } else if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
    }

    return (
      <CustomScrollbars className="upm-customizer">
        <div className="upm-customizer-item">
          <h6 className="upm-mb-3 upm-text-uppercase">Theme</h6>
          <Radio.Group value={themeType} onChange={this.onThemeTypeChange}>
            <Radio.Button value={THEME_TYPE_LITE}>Lite</Radio.Button>
            <Radio.Button value={THEME_TYPE_SEMI_DARK}>Semi Dark</Radio.Button>
            <Radio.Button value={THEME_TYPE_DARK}>Dark</Radio.Button>
          </Radio.Group>
        </div>
        {/* <div className="upm-customizer-item">
          <h6 className="upm-mb-3 upm-text-uppercase">Colors</h6>
          <Radio.Group className="upm-mb-3" value={colorSelection} onChange={this.onColorSelectionTypeChange}>
            <Radio.Button value={THEME_COLOR_SELECTION_PRESET}>Preset Color Pallets</Radio.Button>
            <Radio.Button value={THEME_COLOR_SELECTION_CUSTOMIZE}>Customize</Radio.Button>
          </Radio.Group>

          {colorSelection === THEME_COLOR_SELECTION_CUSTOMIZE ? (
            <div className="upm-cus-customize">
              {colorPickers}
              <Button className="upm-mb-0" type="primary" onClick={this.resetTheme}>
                Reset Theme
              </Button>
            </div>
          ) : (
            this.getPresetColors()
          )}
        </div> */}

        <h6 className="upm-mb-3 upm-text-uppercase">Nav Style</h6>

        {this.getNavStyles(navStyle)}

        <h6 className="upm-mb-3 upm-text-uppercase">Layout</h6>

        {this.getLayoutsTypes(layoutType)}
      </CustomScrollbars>
    );
  };
  handleThemeColor = (primaryColor: string, secondaryColor: string, navDarkTextColor: string, navDarkBg: string) => {
    const modifiedVars = this.state.vars;
    modifiedVars['@primary-color'] = primaryColor;
    modifiedVars['@secondary-color'] = secondaryColor;
    modifiedVars['@nav-dark-bg'] = navDarkBg;
    modifiedVars['@nav-dark-text-color'] = navDarkTextColor;
    this.setState({ vars: modifiedVars });
    this.handleColorChange();
  };

  handleLayoutTypes = (layoutType: string) => {
    localStorage.setItem('app.layout', layoutType);
    this.props.onLayoutTypeChange(layoutType);
    message.success(`Layout updated successfully`);
  };
  getPresetColors = () => {
    const themeColor = Object.entries(this.state.vars)[0][1];
    return (
      <ul className="upm-color-option upm-list-inline">
        <li>
          <span
            onClick={this.handleThemeColor.bind(this, LIGHT_PURPLE, LIGHT_PURPLE_SEC, LIGHT_PURPLE_DARK_TEXT_COLOR, LIGHT_PURPLE_NAV_DARK_BG)}
            style={{
              backgroundColor: LIGHT_PURPLE_SEC,
              color: LIGHT_PURPLE_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-light-purple ${themeColor === LIGHT_PURPLE && 'active'}`}
          />
        </li>
        <li>
          <span
            onClick={this.handleThemeColor.bind(this, RED, RED_SEC, RED_DARK_TEXT_COLOR, RED_NAV_DARK_BG)}
            style={{ backgroundColor: RED_SEC, color: RED_DARK_TEXT_COLOR }}
            className={`upm-link upm-color-red ${themeColor === RED && 'active'}`}
          />
        </li>
        <li>
          <span
            onClick={this.handleThemeColor.bind(this, BLUE, BLUE_SEC, BLUE_DARK_TEXT_COLOR, BLUE_NAV_DARK_BG)}
            style={{ backgroundColor: BLUE_SEC, color: BLUE_DARK_TEXT_COLOR }}
            className={`upm-link upm-color-blue ${themeColor === BLUE && 'active'}`}
          />
        </li>
        <li>
          <span
            onClick={this.handleThemeColor.bind(this, DARK_BLUE, DARK_BLUE_SEC, DARK_BLUE_DARK_TEXT_COLOR, DARK_BLUE_NAV_DARK_BG)}
            style={{
              backgroundColor: DARK_BLUE_SEC,
              color: DARK_BLUE_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-dark-blue ${themeColor === DARK_BLUE && 'active'}`}
          />
        </li>

        <li>
          <span
            onClick={this.handleThemeColor.bind(this, ORANGE, ORANGE_SEC, ORANGE_DARK_TEXT_COLOR, ORANGE_NAV_DARK_BG)}
            style={{
              backgroundColor: ORANGE_SEC,
              color: ORANGE_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-orange ${themeColor === ORANGE && 'active'}`}
          />
        </li>

        <li>
          <span
            onClick={this.handleThemeColor.bind(this, LIGHT_BLUE, LIGHT_BLUE_SEC, LIGHT_BLUE_DARK_TEXT_COLOR, LIGHT_BLUE_NAV_DARK_BG)}
            style={{
              backgroundColor: LIGHT_BLUE_SEC,
              color: LIGHT_BLUE_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-light-blue ${themeColor === LIGHT_BLUE && 'active'}`}
          />
        </li>

        <li>
          <span
            onClick={this.handleThemeColor.bind(this, DEEP_ORANGE, DEEP_ORANGE_SEC, DEEP_ORANGE_DARK_TEXT_COLOR, DEEP_ORANGE_NAV_DARK_BG)}
            style={{
              backgroundColor: DEEP_ORANGE_SEC,
              color: DEEP_ORANGE_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-deep-orange ${themeColor === DEEP_ORANGE && 'active'}`}
          />
        </li>

        <li>
          <span
            onClick={this.handleThemeColor.bind(this, LIGHT_PURPLE_1, LIGHT_PURPLE_1_SEC, LIGHT_PURPLE_1_DARK_TEXT_COLOR, LIGHT_PURPLE_1_NAV_DARK_BG)}
            style={{
              backgroundColor: LIGHT_PURPLE_1_SEC,
              color: LIGHT_PURPLE_1_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-light-purple1 ${themeColor === LIGHT_PURPLE_1 && 'active'}`}
          />
        </li>

        <li>
          <span
            onClick={this.handleThemeColor.bind(this, LIGHT_PURPLE_2, LIGHT_PURPLE_2_SEC, LIGHT_PURPLE_2_DARK_TEXT_COLOR, LIGHT_PURPLE_2_NAV_DARK_BG)}
            style={{
              backgroundColor: LIGHT_PURPLE_2_SEC,
              color: LIGHT_PURPLE_2_DARK_TEXT_COLOR,
            }}
            className={`upm-link upm-color-light-purple2 ${themeColor === LIGHT_PURPLE_2 && 'active'}`}
          />
        </li>
      </ul>
    );
  };

  getLayoutsTypes = (layoutType: string) => {
    return (
      <ul className="upm-layout-option upm-list-inline">
        <li>
          <span onClick={this.handleLayoutTypes.bind(this, LAYOUT_TYPE_FRAMED)} className={`upm-pointer ${layoutType === LAYOUT_TYPE_FRAMED && 'active'}`}>
            <img src={require('../assets/images/layouts/framed.png')} alt="framed" />
          </span>
        </li>
        <li>
          <span onClick={this.handleLayoutTypes.bind(this, LAYOUT_TYPE_FULL)} className={`upm-pointer ${layoutType === LAYOUT_TYPE_FULL && 'active'}`}>
            <img src={require('../assets/images/layouts/full width.png')} alt="full width" />
          </span>
        </li>
        <li>
          <span onClick={this.handleLayoutTypes.bind(this, LAYOUT_TYPE_BOXED)} className={`upm-pointer ${layoutType === LAYOUT_TYPE_BOXED && 'active'}`}>
            <img src={require('../assets/images/layouts/boxed.png')} alt="boxed" />
          </span>
        </li>
      </ul>
    );
  };
  getNavStyles = (navStyle: string) => {
    return (
      <ul className="upm-nav-option upm-list-inline">
        <li>
          <span onClick={this.onNavStyleChange.bind(this, NAV_STYLE_FIXED)} className={`upm-pointer ${navStyle === NAV_STYLE_FIXED && 'active'}`}>
            <img src={require('../assets/images/layouts/fixed.png')} alt="fixed" />
          </span>
        </li>
        {/* <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_MINI_SIDEBAR)}
            className={`upm-pointer ${navStyle === NAV_STYLE_MINI_SIDEBAR && 'active'}`}
          >
            <img src={require('../assets/images/layouts/mini sidebar.png')} alt="mini sidebar" />
          </span>
        </li>
        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_DRAWER)}
            className={`upm-pointer ${navStyle === NAV_STYLE_DRAWER && 'active'}`}
          >
            <img src={require('../assets/images/layouts/drawer nav.png')} alt="drawer nav" />
          </span>
        </li>
        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
            className={`upm-pointer ${navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && 'active'}`}
          >
            <img src={require('../assets/images/layouts/no header mini sidebar.png')} alt="no header mini sidebar" />
          </span>
        </li>
        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR)}
            className={`upm-pointer ${navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR && 'active'}`}
          >
            <img src={require('../assets/images/layouts/vertical no header.png')} alt="vertical no header" />
          </span>
        </li>
        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_DEFAULT_HORIZONTAL)}
            className={`upm-pointer ${navStyle === NAV_STYLE_DEFAULT_HORIZONTAL && 'active'}`}
          >
            <img src={require('../assets/images/layouts/default horizontal.png')} alt="default horizontal" />
          </span>
        </li>
        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_DARK_HORIZONTAL)}
            className={`upm-pointer ${navStyle === NAV_STYLE_DARK_HORIZONTAL && 'active'}`}
          >
            <img src={require('../assets/images/layouts/dark horizontal.png')} alt="dark horizontal" />
          </span>
        </li> */}
        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_INSIDE_HEADER_HORIZONTAL)}
            className={`upm-pointer ${navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL && 'active'}`}
          >
            <img src={require('../assets/images/layouts/inside header horizontal.png')} alt="inside header horizontal" />
          </span>
        </li>
        {/* <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_BELOW_HEADER)}
            className={`upm-pointer ${navStyle === NAV_STYLE_BELOW_HEADER && 'active'}`}
          >
            <img src={require('../assets/images/layouts/below header.png')} alt="below header" />
          </span>
        </li>

        <li>
          <span
            onClick={this.onNavStyleChange.bind(this, NAV_STYLE_ABOVE_HEADER)}
            className={`upm-pointer ${navStyle === NAV_STYLE_ABOVE_HEADER && 'active'}`}
          >
            <img src={require('../assets/images/layouts/top to header.png')} alt="top to header" />
          </span>
        </li> */}
      </ul>
    );
  };

  constructor(props: any) {
    super(props);
    const initialValue = {
      '@primary-color': '#038fde',
      '@secondary-color': '#fa8c16',
      '@text-color': '#545454',
      '@heading-color': '#535353',
      '@nav-dark-bg': '#003366',
      '@nav-dark-text-color': '#038fdd',
      '@header-text-color': '#262626',
      '@layout-header-background': '#fefefe',
      '@layout-footer-background': '#fffffd',
      '@body-background': '#f5f5f5',
      '@hor-nav-text-color': '#fffffd',
    };
    let vars = {};

    try {
      vars = { ...initialValue, ...JSON.parse(localStorage.getItem('app.colors') as string) };
      this.props.setThemeType(localStorage.getItem('app.theme') || THEME_TYPE_SEMI_DARK);
      this.props.onNavStyleChange(localStorage.getItem('app.nav') || NAV_STYLE_FIXED);
      this.props.onLayoutTypeChange(localStorage.getItem('app.layout') || LAYOUT_TYPE_FULL);
    } finally {
      this.state = { vars, initialValue, isCustomizerOpened: false };
      // window.less
      //   .modifyVars(vars)
      //   .then(() => {})
      //   .catch((error: Error) => {
      //     message.error(`Failed to update theme`);
      //   });
    }
  }

  render() {
    return (
      <>
        <Drawer placement="right" closable={false} onClose={this.toggleCustomizer} visible={this.state.isCustomizerOpened}>
          {this.getCustomizerContent()}
        </Drawer>
        {/* <div className="upm-customizer-option">
          <Button type="primary" onClick={this.toggleCustomizer.bind(this)}>
            <i className="icon icon-setting fxicon-hc-spin upm-d-block" />
          </Button>
        </div> */}
      </>
    );
  }
}

export default withSettingsContext(Form.create<CustomizerProps & ISettingsContext>()(Customizer));
