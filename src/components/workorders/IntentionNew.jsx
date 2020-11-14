import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Formik } from "formik";
import Select from "react-select";
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
import { Button } from "../../ui/button";

import { TextInput } from "../../ui/textInput";
import { GETINTENTION, CREATEINTENTION } from "./gql";

import { pastFutureDates } from "./functions";

import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { options } from "./options";

const date = new Date(); // or Date or Moment.js

export const IntentionNew = (props) => {
  const user = localStorage.getItem("username");

  const [id, setId] = useState();
  const [datum, setDatum] = useState(new Date());
  const [paid, setPaid] = useState(false);

  const initialQueryVariables = {
    iId: null,
    dueDate: pastFutureDates(-1095),
    dueDate1: pastFutureDates(1),
    parisher: "",
  };
  const [queryVariables] = useState(initialQueryVariables);
  const { data } = useQuery(GETINTENTION, {
    variables: queryVariables,
  });

  const [add] = useMutation(CREATEINTENTION);

  useEffect(() => {
    if (data && data.getIntention) {
      setId(data.getIntention.length + 1);
      //console.log("Intencija broj: " + data.getIntention.length);
    }
  }, [data]);

  const onChange = (jsDate, dateString) => {
    setDatum(jsDate);
    //console.log(jsDate);
  };

  const onPaid = (item) => {
    setPaid(item.value);
    //console.log(item.value);
  };

  return (
    <div>
      <Formik
        initialValues={{
          iId: id,
          parisher: "",
          dueDate: new Date(),
          paid: false,
          intent: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          const content = {
            iId: id,
            parisher: values.parisher,
            dueDate: datum,
            paid: paid,
            intent: values.intent,
          };

          setSubmitting(false);

          add({ variables: content });
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
                        <FlexColumn>NOVA INTENCIJA</FlexColumn>
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
                            width="600px"
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
                            onChange={onChange}
                            value={date}
                            className="my-custom-datepicker-component"
                            autoClose={true}
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
                            onChange={onPaid}
                            /*onChange={(paid) =>
                              setFieldValue("paid", paid.value)
                            }*/
                          />
                        </FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <ButtonContainer style={{ width: "50%" }}>
                      <FlexRow>
                        <Button type="submit" disabled={isSubmitting}>
                          Dodaj
                        </Button>
                        <Button
                          type="button"
                          onClick={() => props.history.push("/workorders")}
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
  );
};
