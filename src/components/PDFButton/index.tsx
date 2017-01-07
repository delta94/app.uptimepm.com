import { Icon } from 'antd';
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from 'antd/lib/radio';

interface IProps {
  loading: boolean;
  data: any[];
  disabled: boolean;
  document: any;
}

export const PDFButton = (props: IProps) => {
  const [state, setState] = React.useState({ showPDF: false, firstClick: true });

  const btnText = (
    <>
      <Icon type="printer" /> <span>Save as PDF</span>
    </>
  );

  const btnFn = (url: string | null) => {
    // console.log(url);
    if (url && state.showPDF) {
      window.open(url, '_blank');
      setState({ ...state, showPDF: false, firstClick: false });
    }

    return (
      <>
        <Icon type="printer" /> <span>Done</span>
      </>
    );
  };

  if (props.disabled)
    return (
      <Button className="ant-btn" disabled={true}>
        {btnText}
      </Button>
    );

  const onClick = () => {
    setState({ ...state, showPDF: true });
  };

  if (props.loading)
    return (
      <Button disabled={true} className="ant-btn" onClick={onClick}>
        <Icon type="printer" /> <span>Getting data...</span>
      </Button>
    );
  return (
    <>
      {!state.showPDF && (
        <Button className="ant-btn" onClick={onClick}>
          {btnText}
        </Button>
      )}

      {state.showPDF && (
        <PDFDownloadLink
          key="PDFButton"
          className="ant-btn"
          document={props.document}
          // document={<Print inspections={props.data} />}

          fileName="Inspections.pdf"
        >
          {({ blob, url, loading, error }) => (loading ? <>Preparing...</> : btnFn(url))}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default PDFButton;
