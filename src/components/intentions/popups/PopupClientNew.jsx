import React, { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GETCLIENTS, ADDCLIENT } from "./gql";
import {
  PopupOuterNew,
  PopupInner,
  Form,
  FlexRow,
  FlexColumn,
  Input,
} from "./style";
import { PopupClientNewValidation } from "./validation";

export const PopupClientNew = (props) => {
  const [id, setId] = useState();
  const { data } = useQuery(GETCLIENTS);
  const [addClient] = useMutation(ADDCLIENT);

  useEffect(() => {
    if (data && data.getClients) {
      setId(data.getClients.length + 1);
    }
  }, [data]);

  const onClose = async (content) => {
    await addClient({ variables: content });
    props.closePopup();
  };

  return (
    <PopupOuterNew>
      <PopupInner>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            clientEmail: "",
          }}
          validationSchema={PopupClientNewValidation}
          onSubmit={(values, { setSubmitting }) => {
            const content = {
              clientId: id,
              firstName: values.firstName,
              lastName: values.lastName,
              clientEmail: values.clientEmail,
            };

            setSubmitting(false);

            onClose(content);
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
            <Form onSubmit={handleSubmit}>
              <FlexRow style={{ marginTop: "50px" }}>
                <FlexColumn>
                  <Input
                    style={{ width: 220 }}
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder={"ime ili naziv"}
                  />
                  {errors.firstName ? (
                    <div
                      style={{
                        marginLeft: "12px",
                        marginBottom: "15px",
                        backgroundColor: "orange",
                        height: "38px",
                        width: "210px",
                        borderRadius: "25px",
                      }}
                    >
                      <div
                        style={{
                          marginTop: "8px",
                          marginLeft: "20px",
                        }}
                      >
                        {errors.firstName}
                      </div>
                    </div>
                  ) : null}
                  <Input
                    style={{ width: 220 }}
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder={"prezime"}
                  />
                  <Input
                    style={{ width: 220 }}
                    type="text"
                    name="clientEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.clientEmail}
                    placeholder={"e-mail"}
                  />
                </FlexColumn>
              </FlexRow>
              <FlexRow>
                <Button type="submit" disabled={isSubmitting}>
                  Dodaj
                </Button>
                <Button onClick={onClose} children="Zatvori" />
              </FlexRow>
            </Form>
          )}
        </Formik>
      </PopupInner>
    </PopupOuterNew>
  );
};
