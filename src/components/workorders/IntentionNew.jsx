import React, { useState, useEffect, useLayoutEffect } from "react";
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
  const { data, refetch } = useQuery(GETINTENTION, {
    variables: queryVariables,
  });

  const [add] = useMutation(CREATEINTENTION);

  useEffect(() => {
    if (data && data.getIntention) {
      setId(data.getIntention.length + 1);
    }
  }, [data]);

  useEffect(() => {
    refetch(GETINTENTION);
  });

  const onChange = (jsDate, dateString) => {
    setDatum(jsDate);
  };

  const onPaid = (item) => {
    setPaid(item.value);
  };

  let collapsed = false;
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
  }

  function ShowWindowDimensions() {
    const [width] = useWindowSize();

    if (width < 1128) {
      collapsed = true;
    }
  }

  ShowWindowDimensions();

  return !collapsed ? (
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
                <div
                  style={{
                    marginLeft: "12px",
                    marginTop: "80px",
                    width: "460px",
                  }}
                >
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
                        <div style={{ width: "95%" }}>
                          <DatePickerInput
                            onChange={onChange}
                            value={date}
                            className="my-custom-datepicker-component"
                            autoClose={true}
                          />
                        </div>
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
                        <div style={{ width: "95%" }}>
                          <Select
                            options={options}
                            onChange={onPaid}

                            /*onChange={(paid) =>
                            setFieldValue("paid", paid.value)
                          }*/
                          />
                        </div>
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
                        onClick={() => props.history.push("/intentions")}
                      >
                        Odustani
                      </Button>
                    </FlexRow>
                    <div style={{ height: "50px" }}></div>
                  </ButtonContainer>
                </div>
              </GridContainer>
            </Wrapper>
          </form>
        )}
      </Formik>
    </div>
  );
};
