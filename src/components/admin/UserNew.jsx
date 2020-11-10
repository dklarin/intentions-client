import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Select from "react-select";
import { Formik } from "formik";
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
  Label,
} from "../../style/global-style";
import { Button } from "../../ui/button";
import { TextInput } from "../../ui/textInput";
import { GETUSER, SIGNUP } from "./gql";
import { roleOptions } from "./options";
import { UserNewValidation } from "./validation";

export const UserNew = (props) => {
  const user = localStorage.getItem("username");
  const [signup] = useMutation(SIGNUP);
  const [role, setRole] = useState(roleOptions[0].value);

  const [id, setId] = useState();

  const initialQueryVariables = {
    id: null,
    username: "",
    role: "",
  };

  const [queryVariables] = useState(initialQueryVariables);
  const { data } = useQuery(GETUSER, {
    variables: queryVariables,
  });

  useEffect(() => {
    if (data && data.getUser) {
      setId(data.getUser.length + 1);
    }
  }, [data]);

  const onStatus = (item) => {
    if (item != null) {
      setRole(item.value);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={UserNewValidation}
        onSubmit={(values, { setSubmitting }) => {
          const content = {
            id: id,
            username: values.username,
            password: values.password,
            role: role,
          };

          try {
            signup({ variables: content });
          } catch (e) {
            alert(e);
          }

          props.history.push("/users");

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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Wrapper>
              <GridContainer>
                <LeftGridContainer />
                <RightGridContainer>
                  <FlexContainer>
                    <MainHeader style={{ marginTop: "5px" }}>
                      <FlexRow>
                        <FlexColumn>NOVI ZAPOSLENIK</FlexColumn>
                        <FlexRow>
                          <FlexColumn>{user}</FlexColumn>
                        </FlexRow>
                      </FlexRow>
                    </MainHeader>
                    <Header style={{ marginTop: "5px" }}>VJERODAJNICE</Header>
                    <Container>
                      <FlexRow>
                        <FlexColumn>
                          <Label>KORISNIČKO IME:</Label>
                          <FlexRow>
                            <TextInput
                              style={{ width: 200 }}
                              type="text"
                              name="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                            />
                            {errors.username ? (
                              <div
                                style={{
                                  marginLeft: "5px",
                                  backgroundColor: "orange",
                                  height: "38px",
                                  width: "200px",
                                  borderRadius: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    marginTop: "8px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {errors.username}
                                </div>
                              </div>
                            ) : null}
                          </FlexRow>
                          <Label>LOZINKA:</Label>
                          <FlexRow>
                            <TextInput
                              style={{ width: 200 }}
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            {errors.password ? (
                              <div
                                style={{
                                  marginLeft: "5px",
                                  backgroundColor: "orange",
                                  height: "38px",
                                  width: "160px",
                                  borderRadius: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    marginTop: "8px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {errors.password}
                                </div>
                              </div>
                            ) : null}
                          </FlexRow>
                        </FlexColumn>
                        <FlexColumn>
                          <Label>OVLASTI:</Label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={roleOptions[0]}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            name="status"
                            options={roleOptions}
                            onChange={onStatus}
                            styles={statusStyles}
                          />
                        </FlexColumn>
                      </FlexRow>
                    </Container>
                    <ButtonContainer>
                      <Button type="submit" disabled={isSubmitting}>
                        Kreiraj
                      </Button>
                      <Button
                        type="button"
                        onClick={() => props.history.push("/users")}
                      >
                        Odustani
                      </Button>
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

const statusStyles = {
  container: (provided) => ({
    ...provided,
    width: 165,
  }),
};
