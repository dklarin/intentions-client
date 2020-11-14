import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Formik } from "formik";
import { GETINTENTION, UPDATEINTENTION } from "./gql";
import { pastFutureDates, viewDate } from "./functions";
import {
  Wrapper,
  GridContainer,
  LeftGridContainer,
  RightGridContainer,
  MainHeader,
  FlexRow,
  FlexColumn,
  FlexContainer,
  Header,
  Container,
  ButtonContainer,
  ResponsiveFlexRow,
  Label,
} from "../../style/global-style";
import { TextInput } from "../../ui/textInput";
import { Button } from "../../ui/button";

import Select from "react-select";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import "rc-datepicker/node_modules/moment/locale/hr.js";

const options = [
  { value: true, label: "Da" },
  { value: false, label: "Ne" },
];

export const IntentionUpdate = (props) => {
  const user = localStorage.getItem("username");
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
  const [update] = useMutation(UPDATEINTENTION);

  useEffect(() => {
    refetch(GETINTENTION, {
      variables: queryVariables,
    });
  });

  let intention;
  let dueDate = null;
  let parisher = "";
  let intent = "";
  let paid = false;

  if (data && data.getIntention) {
    intention = data.getIntention[id - 1];

    parisher = intention.parisher;

    dueDate = new Date(viewDate(intention.dueDate));

    intent = intention.intent;
    paid = intention.paid;
  }

  let paidSelect;
  paid === true ? (paidSelect = options[0]) : (paidSelect = options[1]);

  return data && data.getIntention ? (
    <div>
      <Formik
        initialValues={{
          iId: id,
          dueDate: dueDate,
          parisher: parisher,
          intent: intent,
          paid: paid,
        }}
        onSubmit={(values, { setSubmitting }) => {
          let helpDate;
          if (values.newDate === undefined) {
            helpDate = dueDate;
          } else {
            helpDate = values.newDate;
          }

          let helpPaid = paid;
          if (values.newPaid !== undefined) {
            helpPaid = values.newPaid;
          }

          const content = {
            iId: parseInt(values.iId),
            dueDate: helpDate,
            parisher: values.parisher,
            intent: values.intent,
            paid: helpPaid,
          };

          setSubmitting(false);

          update({ variables: content });
          props.history.push("/intentions");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Wrapper>
              <GridContainer>
                <LeftGridContainer />
                <RightGridContainer>
                  <FlexContainer>
                    <MainHeader style={{ marginTop: "5px" }}>
                      <FlexRow>
                        <FlexColumn>IZMJENA INTENCIJE</FlexColumn>
                        <FlexRow>
                          <FlexColumn>{user}</FlexColumn>
                        </FlexRow>
                      </FlexRow>
                    </MainHeader>
                    <Header style={{ marginTop: "5px" }}>UNOS PODATAKA</Header>
                    <Container>
                      <ResponsiveFlexRow>
                        <FlexColumn>
                          <Label>ID</Label>
                          <TextInput
                            type="text"
                            name="iId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={id}
                            style={{ width: 200 }}
                            disabled={true}
                          />
                          {errors.jobParking &&
                            touched.jobParking &&
                            errors.jobParking}
                          <Label>Datum</Label>
                          <DatePickerInput
                            //onChange={onChange}
                            value={values.dueDate}
                            className="my-custom-datepicker-component"
                            //{...anyReactInputProps}
                            autoClose={true}
                            onChange={(date) => setFieldValue("newDate", date)}
                          />
                          <Label>Župljanin</Label>
                          <TextInput
                            type="text"
                            name="parisher"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.parisher}
                            style={{ width: 200 }}
                            disabled={false}
                          />
                          {errors.jobParking &&
                            touched.jobParking &&
                            errors.jobParking}
                          <Label>Intencija</Label>
                          <TextInput
                            type="text"
                            name="intent"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.intent}
                            style={{ width: 200 }}
                            disabled={false}
                          />
                          {errors.jobParking &&
                            touched.jobParking &&
                            errors.jobParking}

                          <Label>Plaćeno</Label>
                          <Select
                            options={options}
                            defaultValue={paidSelect}
                            onChange={(paid) =>
                              setFieldValue("newPaid", paid.value)
                            }
                          />
                        </FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <ButtonContainer style={{ width: "50%" }}>
                      <FlexRow>
                        <Button type="submit" disabled={isSubmitting}>
                          Izmijeni
                        </Button>
                        <Button
                          type="button"
                          onClick={() => props.history.push("/intentions")}
                        >
                          Odustani
                        </Button>
                      </FlexRow>
                      <div style={{ height: "50px" }}></div>
                    </ButtonContainer>
                  </FlexContainer>
                </RightGridContainer>
              </GridContainer>
            </Wrapper>
          </form>
        )}
      </Formik>
    </div>
  ) : (
    <Wrapper>
      <GridContainer>
        <LeftGridContainer />
        <RightGridContainer>Loading...</RightGridContainer>
      </GridContainer>
    </Wrapper>
  );
};
