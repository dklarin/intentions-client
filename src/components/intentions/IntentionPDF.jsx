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
import { GETINTENTION } from "./gql";
import { colorPalette } from "../../style/theme";
import { pastFutureDates } from "./functions";

export const IntentionPDF = () => {
  let { id } = useParams();

  const initialQueryVariables = {
    iId: null,
    dueDate: pastFutureDates(-1095),
    dueDate1: pastFutureDates(1),
    parisher: "",
  };

  const [queryVariables] = useState(initialQueryVariables);

  const { data, refetch } = useQuery(GETINTENTION, {
    variables: queryVariables,
  });

  useEffect(() => {
    refetch(GETINTENTION);
  });

  let intention;
  let paid;
  let helpPaid;

  if (data && data.getIntention) {
    intention = data.getIntention[id - 1];
    paid = intention.paid;
  }

  paid === true ? (helpPaid = "Da") : (helpPaid = "Ne");

  return data && data.getIntention ? (
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
            INTENCIJA REDNI BROJ - {intention.iId}
          </StyledTitleText>
        </StyledHeaderContainer>
        <StyledTitleCard style={{ backgroundColor: colorPalette.primary100 }}>
          Podaci o župljaninu i intenciji
        </StyledTitleCard>
        <StyledGridContainerTop>
          <div>Župljanin:</div>
          <div>{intention.parisher}</div>
        </StyledGridContainerTop>
        <StyledGridContainerTop>
          <div>Intencija:</div>
          <div>{intention.intent}</div>
        </StyledGridContainerTop>
        <StyledTitleCard style={{ backgroundColor: colorPalette.primary100 }}>
          Dodatne informacije
        </StyledTitleCard>
        <StyledGridContainer>
          <div>Datum:</div>
          <div>{intention.dueDate}</div>
          <div>Redni broj:</div>
          <div>{id}</div>
          <div style={{ marginTop: "10px" }}>Plaćeno:</div>
          <div style={{ marginTop: "10px" }}>{helpPaid}</div>
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
