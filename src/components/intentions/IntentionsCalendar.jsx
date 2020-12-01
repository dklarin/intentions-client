import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import {
  Wrapper,
  GridContainer,
  LeftGridContainer,
  RightGridContainer,
  MainHeader,
  FlexRow,
  FlexColumn,
} from "../../style/global-style";
import { GETINTENTION } from "./gql";
import { pastFutureDates } from "./functions";

export const IntentionsCalendar = () => {
  const initialQueryVariables = {
    iId: null,
    dueDate: pastFutureDates(-1095),
    dueDate1: pastFutureDates(365),
    parisher: "",
  };
  const [queryVariables] = useState(initialQueryVariables);
  const { data } = useQuery(GETINTENTION, {
    variables: queryVariables,
  });

  let arr = [];
  if (data && data.getIntention) {
    for (let i = 0; i < data.getIntention.length; i++) {
      let day = data.getIntention[i].dueDate.slice(0, 2);
      let month = data.getIntention[i].dueDate.slice(3, 5);
      let year = data.getIntention[i].dueDate.slice(6, 10);

      arr.push(new Date(year, month - 1, day));
    }
  }

  return (
    <Wrapper>
      <GridContainer>
        <LeftGridContainer></LeftGridContainer>
        <RightGridContainer>
          <MainHeader style={{ marginTop: "5px" }}>
            <FlexRow>
              <FlexColumn>INTENCIJE</FlexColumn>
              <FlexRow>
                <FlexColumn>Korisnik</FlexColumn>
              </FlexRow>
            </FlexRow>
          </MainHeader>
          <DayPicker
            initialMonth={new Date(2020, 10)}
            /*selectedDays={[
              new Date(2020, 3, 12),
              new Date(2020, 3, 2),
              {
                after: new Date(2020, 3, 20),
                before: new Date(2020, 3, 25),
              },
            ]}*/
            selectedDays={arr}
            numberOfMonths={6}
          />
        </RightGridContainer>
      </GridContainer>
    </Wrapper>
  );
};
