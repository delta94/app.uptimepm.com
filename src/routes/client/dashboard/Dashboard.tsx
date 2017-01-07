import React from 'react';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import FluidChart from 'components/FluidChart';
import InspectionsChart from 'components/InspectionsChart';
import EquipmentChart from 'components/EquipmentChart';
import Widget from 'components/Widget';

interface EquipmentListProps extends RouteComponentProps<any> {}

export const EquipmentList = (props: EquipmentListProps) => {
  return (
    <React.Fragment>
      <ContainerHeader title="Dashboard" icon="pe-7s-display1 icon-gradient bg-premium-dark" />
      <FluidChart />
      <Widget>
        <EquipmentChart />
      </Widget>
      <InspectionsChart />
    </React.Fragment>
  );
};

export default EquipmentList;
