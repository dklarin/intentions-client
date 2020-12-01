import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Select from "react-select";
import { GETCLIENTS, REMOVECLIENT } from "./gql";
import { PopupOuterDelete, PopupInner, FlexRow } from "./style";

export const PopupClientDelete = (props) => {
  const { data } = useQuery(GETCLIENTS);
  const [erase] = useMutation(REMOVECLIENT);
  const [itemDel, setItemDel] = useState();

  var a = [];
  if (data && data.getClients) {
    for (let i = 0; i < data.getClients.length; i++) {
      a.push({
        value: data.getClients[i].clientId,
        label: data.getClients[i].firstName + " " + data.getClients[i].lastName,
      });
    }
  }

  const onSelectClient = (item) => {
    let kom = data.getClients[item.value - 1];
    setItemDel(kom.clientId);
  };

  const onClose = () => {
    props.closePopup();
  };

  return (
    <PopupOuterDelete>
      <PopupInner>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            clientEmail: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            const content = {
              clientId: itemDel,
            };

            erase({ variables: content });

            setSubmitting(false);
            window.location.reload(false);
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
              <FlexRow style={{ marginTop: "50px" }}>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  name="status"
                  options={a}
                  onChange={onSelectClient}
                  styles={clientStyles}
                />
              </FlexRow>
              <FlexRow style={{ marginTop: "20px" }}>
                <Button type="submit" disabled={isSubmitting}>
                  Obriši
                </Button>
                <Button onClick={onClose} children="Odustani" />
              </FlexRow>
            </form>
          )}
        </Formik>
      </PopupInner>
    </PopupOuterDelete>
  );
};

const clientStyles = {
  container: (provided) => ({
    ...provided,
    width: 220,
  }),
};
