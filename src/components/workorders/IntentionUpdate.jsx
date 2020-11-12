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
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

const date = new Date();

export const IntentionUpdate = (props) => {
  const user = localStorage.getItem("username");
  let { id } = useParams();
  const initialQueryVariables = {
    iId: null,
    dueDate: null,
    dueDate1: pastFutureDates(1),
    parisher: "",
  };

  const [queryVariables] = useState(initialQueryVariables);
  const { data, refetch } = useQuery(GETINTENTION, {
    variables: queryVariables,
  });
  const [update] = useMutation(UPDATEINTENTION);
  const [datum, setDatum] = useState(new Date());
  const [ids, setIds] = useState();
  const [pariser, setPariser] = useState("");

  let intention;
  let dueDate = null;
  let parisher = "";
  let intent = "";
  let paid = false;

  //useEffect(() => {
  /*if (data && data.getIntention) {
      setIds(data.getIntention.length + 1);
      intention = data.getIntention[id - 1];
      setPariser();
    }*/
  /*refetch(GETINTENTION);
  }, [data]);*/

  /*useEffect(() => {
    refetch(queryVariables);
  });*/

  if (data && data.getIntention) {
    console.log("Baza: " + ids);
    console.log("Veličina: " + data.getIntention.length);
    intention = data.getIntention[id - 1];
    //intention = data.getIntention[ids - 1];
    parisher = intention.parisher;

    //console.log(intention.length);
    dueDate = new Date(viewDate(intention.dueDate));
    //parisher = intention.parisher;
    intent = intention.intent;
    //paid = intention.paid;
  }

  //console.log(id);

  /*useEffect(() => {
    refetch(GETINTENTION);
  });*/

  /*useEffect(() => {
    refetch(queryVariables);
  }, []);*/

  const onChange = (jsDate, dateString) => {
    //setDatum(jsDate);
    //console.log(jsDate);
  };

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
          const content = {
            iId: parseInt(values.iId),
            dueDate: values.newDate,
            parisher: values.parisher,
            intent: values.intent,
            paid: true,
          };

          update({ variables: content });
          props.history.push("/intentions");
          setSubmitting(false);
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
                    {" "}
                    <MainHeader style={{ marginTop: "5px" }}>
                      <FlexRow>
                        <FlexColumn>IZMJENA INTENCIJE</FlexColumn>
                        <FlexRow>
                          <FlexColumn>{user}</FlexColumn>
                        </FlexRow>
                      </FlexRow>
                    </MainHeader>
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
                        </FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <ButtonContainer>
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
