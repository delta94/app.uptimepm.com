import React from 'react';
import Magnifier from 'react-magnifier';

import './index.scss';
// import { Typography } from 'antd';
// const { Text } = Typography;

interface IFieldProps {
  photoList: string[];
  fieldName: string;
  defValue: string[];
}
const ListPhotos = (props: IFieldProps) => {
  return (
    <React.Fragment>
      <div className="upm-entry-sec">
        <ul className="upm-gallery-list">
          {props.photoList.map((photo: string, index: number) => (
            <li key={index}>
              <Magnifier src={photo} mgShape="square" mgTouchOffsetX={100} mgWidth={400} mgHeight={400} zoomFactor={2.25} />
            </li>
          ))}
        </ul>
      </div>
      {/* <Text type="secondary">Press and drag for zoom</Text> */}
    </React.Fragment>
  );
};
export default ListPhotos;
