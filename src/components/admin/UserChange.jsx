import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  Label,
} from "../../style/global-style";
import { Button } from "../../ui/button";
import { TextInput } from "../../ui/textInput";
import { UPDATEUSER, GETUSER } from "./gql";

export const UserChange = (props) => {
  let { id } = useParams();
  const user = localStorage.getItem("username");

  let item;
  let username = "";
  let role = "";
  let roleBase;

  const initialQueryVariables = {
    id: null,
    username: "",
    role: "",
  };
  const [queryVariables] = useState(initialQueryVariables);
  const { data } = useQuery(GETUSER, { variables: queryVariables });
  const [update] = useMutation(UPDATEUSER);

  if (data && data.getUser) {
    item = data.getUser[id - 1];
    username = item.username;
    role = item.role;
  }

  if (role === "admin") {
    roleBase = roleOptions[0];
  } else {
    roleBase = roleOptions[1];
  }

  const [roleSelect, setRoleSelect] = useState(roleBase);

  const onRole = (role) => {
    if (role != null) {
      setRoleSelect(role);
    }
  };

  return data && data.getUser ? (
    <div>
      <Formik
        initialValues={{
          username: username,
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          const content = {
            id: parseInt(id),
            username: values.username,
            password: values.password,
            role: roleSelect.value,
          };

          try {
            update({ variables: content });
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
                <LeftGridContainer></LeftGridContainer>
                <RightGridContainer>
                  <FlexContainer>
                    <MainHeader style={{ marginTop: "5px" }}>
                      <FlexRow>
                        <FlexColumn>IZMJENA ZAPOSLENIKA</FlexColumn>
                        <FlexRow>
                          <FlexColumn>{user}</FlexColumn>
                        </FlexRow>
                      </FlexRow>
                    </MainHeader>
                    <Header style={{ marginTop: "5px" }}>Vjerodajnice</Header>
                    <Container>
                      <FlexRow>
                        <FlexColumn>
                          {/*<Logo src={logoImg} />{" "}*/}
                          <Label>Korisničko ime:</Label>
                          <TextInput
                            style={{ width: 200 }}
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <Label>Lozinka:</Label>
                          <TextInput
                            style={{ width: 200 }}
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="password"
                          />
                        </FlexColumn>
                        <FlexColumn>
                          <Label>Uloga:</Label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={roleSelect}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            name="status"
                            options={roleOptions}
                            onChange={onRole}
                            styles={statusStyles}
                          />
                        </FlexColumn>
                      </FlexRow>
                    </Container>
                    <ButtonContainer>
                      <Button type="submit" disabled={isSubmitting}>
                        Ažuriraj
                      </Button>
                      <Button
                        type="button"
                        onClick={() => props.history.push("/users")}
                      >
                        Odustani
                      </Button>
                    </ButtonContainer>
                    {/*<Input type="password" placeholder="password again" />*/}
                  </FlexContainer>
                </RightGridContainer>
              </GridContainer>
            </Wrapper>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
};

const statusStyles = {
  container: (provided) => ({
    ...provided,
    width: 165,
  }),
};

export const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "user", label: "Korisnik" },
];
