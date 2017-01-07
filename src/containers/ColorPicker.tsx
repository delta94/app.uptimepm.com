import React, { CSSProperties } from 'react';
import { ChromePicker, SketchPicker, ColorResult } from 'react-color';

const noop = () => {};

const pickers: any = {
  chrome: ChromePicker,
  sketch: SketchPicker,
};

interface ColorPickerProps {
  color: string;
  small: any;
  type: any;
  position: any;
  onChange: (hex: string, color: ColorResult) => void;
  onChangeComplete: (color: string) => void;
}

interface ColorPickerState {
  displayColorPicker: boolean;
  color: string;
}

export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  static defaultProps = {
    onChange: noop,
    onChangeComplete: noop,
    position: 'bottom',
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  handleChange = (color: ColorResult) => {
    this.setState({ color: color.hex });
    this.props.onChange(color.hex, color);
  };
  handleChangeComplete = (color: ColorResult) => {
    this.setState({ color: color.hex });
    this.props.onChangeComplete(color.hex);
  };

  constructor(props: any) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: props.color,
    };
  }

  componentWillReceiveProps(nextProps: ColorPickerProps) {
    this.setState({ color: nextProps.color });
  }

  render() {
    const { small, type, position } = this.props;

    const Picker = pickers[type];

    const styles = {
      color: {
        display: 'inline-block',
        width: small ? '16px' : '120px',
        height: small ? '16px' : '24px',
        verticalAlign: 'middle',
        marginRight: '8px',
        borderRadius: '2px',
        padding: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: this.state.color,
      },
      swatch: {
        padding: '4px',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      wrapper: {
        position: 'inherit',
        zIndex: '100',
        transform: '',
        paddingBottom: 0,
      },
    };

    if (position === 'top') {
      styles.wrapper.transform = 'translateY(-100%)';
      styles.wrapper.paddingBottom = 8;
    }

    const swatch = (
      <div style={styles.swatch} onClick={this.handleClick}>
        <span style={styles.color} />
        <span> {this.props.children}</span>
      </div>
    );
    const picker = this.state.displayColorPicker ? (
      <div style={styles.popover as CSSProperties}>
        <div style={styles.cover as CSSProperties} onClick={this.handleClose} />
        <div style={styles.wrapper as CSSProperties}>
          <Picker {...this.props} color={this.state.color} onChange={this.handleChange} onChangeComplete={this.handleChangeComplete} />
        </div>
      </div>
    ) : null;

    if (position === 'top') {
      return (
        <div>
          {picker}
          {swatch}
        </div>
      );
    }
    return (
      <div>
        {swatch}
        {picker}
      </div>
    );
  }
}
