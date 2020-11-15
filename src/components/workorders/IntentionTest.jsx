import React from "react";
import { SideBar } from "../layout/SideBar/SideBar";
import "../layout/SideBar/Sidebar.css";
import {
  Wrapper,
  GridContainer,
  //LeftGridContainer,
  /*RightGridContainer,
  MainHeader,
  FlexRow,
  FlexColumn,
  ButtonContainer,*/
} from "../../style/global-style";
import styled from "styled-components";

const FullGridContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 4;
`;

const SidebarContainer = styled(SideBar)`
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
`;

export const IntentionTest = () => {
  return (
    <Wrapper>
      <GridContainer>
        {" "}
        <SidebarContainer />
        <FullGridContainer>Danijel</FullGridContainer>
      </GridContainer>
    </Wrapper>
  );
};
