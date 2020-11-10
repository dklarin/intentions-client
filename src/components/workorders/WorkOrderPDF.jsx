import React, { useState, useEffect } from "react";

import {
  StyledPage,
  StyledTitleCard,
  StyledHeaderContainer,
  StyledTitleText,
  StyledGridContainer,
  StyledGridContainerTop,
} from "./style/workorderpdf";
import { useQuery } from "@apollo/react-hooks";

import { useParams } from "react-router-dom";
//import { GETWORKORDER } from "./gql";
import { colorPalette } from "../../style/theme";

export const WorkOrderPDF = () => {
  let { id } = useParams();

  const initialQueryVariables = {
    woId: null,
    dueDate: "2004-12-03",
    dueDate1: "2020-12-01",
  };

  const [queryVariables] = useState(initialQueryVariables);
  /*const { data, refetch } = useQuery(GETWORKORDER, {
    variables: queryVariables,
  });

  useEffect(() => {
    refetch(GETWORKORDER);
  });*/

  let item;
  let carBool = "";
  let parkingBool = "";
  let spentTime = "";

  if (data && data.getWorkOrder) {
    item = data.getWorkOrder[id - 1];
    carBool = item.carBool;
    parkingBool = item.parkingBool;
    spentTime = item.spentTime;
  }

  if (parseInt(spentTime) <= 15) {
    spentTime = "1/4 sata";
  } else if (parseInt(spentTime) > 15 && parseInt(spentTime) <= 30) {
    spentTime = "0.5 sata";
  } else if (parseInt(spentTime) > 30 && parseInt(spentTime) <= 45) {
    spentTime = "3/4 sata";
  } else if (parseInt(spentTime) > 45 && parseInt(spentTime) <= 60) {
    spentTime = "1 sat";
  } else if (parseInt(spentTime) > 60 && parseInt(spentTime) <= 75) {
    spentTime = "1 + 1/4 sata";
  } else if (parseInt(spentTime) > 75 && parseInt(spentTime) <= 90) {
    spentTime = "1 + 0.5 sata";
  } else if (parseInt(spentTime) > 90 && parseInt(spentTime) <= 105) {
    spentTime = "1 + 3/4 sata";
  } else if (parseInt(spentTime) > 105 && parseInt(spentTime) <= 120) {
    spentTime = "2 sata";
  }

  return data && data.getWorkOrder ? (
    <div>
      <PageContent>
        <StyledHeaderContainer>
          <StyledTitleText
            style={{
              backgroundColor: colorPalette.accent100,
              color: colorPalette.primary100,
              width: "100%",
            }}
          >
            MY COMPANY
          </StyledTitleText>
        </StyledHeaderContainer>
        <StyledTitleCard style={{ backgroundColor: colorPalette.primary100 }}>
          Podaci o klijentu
        </StyledTitleCard>
        <StyledGridContainerTop>
          <div>Ime i prezime (naziv):</div>
          <div>{item.clientName}</div>
        </StyledGridContainerTop>
        <StyledGridContainerTop>
          <div>E-mail:</div>
          <div>{item.clientEmail}</div>
        </StyledGridContainerTop>
        <StyledTitleCard style={{ backgroundColor: colorPalette.primary100 }}>
          Detalji zahtjeva
        </StyledTitleCard>
        <StyledGridContainer>
          <div>Datum:</div>
          <div>{item.dueDate}</div>
          <div>Redni broj:</div>
          <div>{id}</div>
          <div style={{ marginTop: "10px" }}>Opis problema:</div>
          <div style={{ marginTop: "10px" }}>{item.description}</div>
          <div style={{ marginTop: "10px" }}>Status:</div>
          <div style={{ marginTop: "10px" }}>{item.status}</div>
        </StyledGridContainer>
        <StyledTitleCard style={{ backgroundColor: colorPalette.primary100 }}>
          Dodatne informacije
        </StyledTitleCard>
        <StyledGridContainer>
          <div>Vrijeme utrošeno:</div>
          <div>{spentTime}</div>
          <div>Korištena dostava:</div>
          <div>{carBool}</div>
          <div style={{ marginTop: "10px" }}>Parking:</div>
          <div style={{ marginTop: "10px" }}>{parkingBool}</div>
          <div style={{ marginTop: "10px" }}>Materijal:</div>
          <div style={{ marginTop: "10px" }}>{item.material}</div>
          <div style={{ marginTop: "50px", marginLeft: "10.5cm" }}>
            <div>
              <b>UKUPNO:</b>
            </div>
            <div style={{ marginTop: "-20px", marginLeft: "5.25cm" }}>
              {parseInt(item.totalAmount).toFixed(2)}
            </div>
          </div>
        </StyledGridContainer>
      </PageContent>
    </div>
  ) : null;
};

const PageContent = (props) => {
  return (
    <StyledPage>
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "0.5cm",
          margin: "0.5cm",
          border: "1px solid black",
        }}
      >
        {props.children}
      </div>
    </StyledPage>
  );
};
