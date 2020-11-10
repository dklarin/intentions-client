import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import { Background, Card, Error, Form, Input } from "./style/login";
import { Button } from "../../ui/button";
import { LOGIN } from "./gql";
import { AUTH_TOKEN } from "../../utils/constants";
import loginBackground from "../../assets/loginBackground.jpg";

export const Login = (props) => {
  const [login] = useMutation(LOGIN);
  let [error, setError] = useState("");

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          const saveUserData = (data) => {
            localStorage.setItem(AUTH_TOKEN, data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("username", data.username);
          };

          const confirm = async (data) => {
            saveUserData(data.login);
            props.history.push(`/`);
          };

          const handleLogin = async (values) => {
            const content = {
              username: values.username,
              password: values.password,
            };

            try {
              const { data } = await login({ variables: content });
              confirm(data);
            } catch (e) {
              setError(e);
            }
          };

          handleLogin(values);

          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <Background src={loginBackground} />
              <Form>
                <Input
                  name="username"
                  onChange={handleChange}
                  placeholder="korisničko ime"
                  style={{ marginTop: "50%" }}
                  type="text"
                />
                <Input
                  name="password"
                  onChange={handleChange}
                  placeholder="lozinka"
                  type="password"
                />
                <Button disabled={isSubmitting} type="submit">
                  Login
                </Button>
              </Form>
              {error && (
                <Error>
                  <div
                    style={{
                      marginTop: "8px",
                      marginLeft: "35px",
                    }}
                  >
                    Korisničko ime i/ili lozinka nisu ispravni!
                  </div>
                </Error>
              )}
            </Card>
          </form>
        )}
      </Formik>
    </div>
  );
};
