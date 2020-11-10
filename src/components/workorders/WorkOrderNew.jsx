import React, { useState, useEffect, useLayoutEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Formik } from "formik";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
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
import { StyledTimePicker } from "./style/workorderchange";
import { Button } from "../../ui/button";
import DatePicker from "../../ui/datePicker";
import { TextInput } from "../../ui/textInput";
import { TextArea } from "../../ui/textArea";
import { ToggleSwitch } from "../../ui";
import { GETWORKORDER, ADDINTENTION } from "./gql";
import { GETCLIENTS } from "./popups/gql";
import { formatDate, pastFutureDates, dynamicSort } from "./functions";
import { yesNoOptions, statusOptions } from "./options";
import { colorPalette } from "../../style/theme";
import { WorkOrderNewValidation } from "./validation";
import { PopupClientNew, PopupClientDelete } from "./popups";

export const WorkOrderNew = (props) => {
  const user = localStorage.getItem("username");

  const initialQueryVariables = {
    woId: null,
    dueDate: pastFutureDates(-1095),
    dueDate1: pastFutureDates(1),
  };

  const [queryVariables] = useState(initialQueryVariables);
  const { data } = useQuery(GETWORKORDER, {
    variables: queryVariables,
  });
  const { data: clients, refetch } = useQuery(GETCLIENTS);
  const [change] = useMutation(ADDINTENTION);

  const [id, setId] = useState();
  const [mail, setMail] = useState("");
  const [notice, setNotice] = useState(false);
  const [car, setCar] = useState(yesNoOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [clientName, setClientName] = useState("");
  const [popupNew, setPopupNew] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  var clientOptions = [];

  useEffect(() => {
    if (data && data.getWorkOrder) {
      setId(data.getWorkOrder.length + 1);
    }
  }, [data]);

  if (clients && clients.getClients) {
    for (let i = 0; i < clients.getClients.length; i++) {
      clientOptions.push({
        value: clients.getClients[i].clientId,
        label:
          clients.getClients[i].firstName +
          " " +
          clients.getClients[i].lastName,
      });
      clientOptions.sort(dynamicSort("label"));
    }
  }

  const togglePopup = () => {
    setPopupNew(true);
  };

  const togglePopupDelete = () => {
    setPopupDelete(true);
  };

  const togglePopupClose = () => {
    refetch(GETCLIENTS);
    setPopupNew(false);
  };

  const togglePopupDeleteClose = () => {
    setPopupDelete(false);
  };

  const emailSend = (e) => {
    axios.post("/sendtome", {
      email: e.clientEmail,
      name: "ime",
      subject: "Uređaj",
      text: "Status radnog naloga: " + e.status + ".",
    });
  };

  const handleNotification = () => {
    setNotice(!notice);
  };

  /**
   * handles if car is used or not
   * @param {*} item
   */
  const handleCar = (item) => {
    if (item != null) {
      setCar(item.value);
    }
  };

  /**
   * handles status of work order
   * @param {*} item
   */
  const handleStatus = (item) => {
    if (item != null) {
      setStatus(item.value);
    }
  };

  /**
   * puts clients name (and e-mail) on work order
   * @param {*} item
   */
  const handleClient = (item) => {
    let user = clients.getClients[item.value - 1];

    console.log("Korisnik: " + user.firstName);
    if (item != null) {
      setClientName(user.firstName + " " + user.lastName);
      setMail(user.clientEmail);
    }
  };

  /**
   * used for layout
   */
  let statusPosLeft = "-380px";
  let statusPosTop = "0px";
  let textAreaPos = "-380px";
  let textAreaWidth = 300;
  let timeEndLeft = "-380px";
  let timeEndTop = "0px";
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

    if (width < 600) {
      statusPosLeft = "150px";
      statusPosTop = "-173px";
      textAreaPos = "0px";
      textAreaWidth = 290;
      timeEndLeft = "150px";
      timeEndTop = "-158px";
    }
  }

  ShowWindowDimensions();

  return (
    <div>
      <Formik
        initialValues={{
          jobId: id,
          jobUser: "",
          clientEmail: "",
          startDate: new Date(),
          timeStart: moment(),
          timeEnd: moment(),
          jobCar: "",
          jobParking: "",
          description: "",
          material: "",
          notice: notice,
        }}
        validationSchema={WorkOrderNewValidation}
        onSubmit={(values, { setSubmitting }) => {
          let tim1 = new Date(values.timeStart);

          let tim2 = new Date(values.timeEnd);

          let him = new Date(tim2 - tim1);
          let mim = (him.getHours() - 1) * 60;
          let hajm = mim + him.getMinutes();

          let total = 0;

          setMail(values.clientEmail);

          const content = {
            woId: id,
            dueDate: values.startDate,
            clientName: clientName,
            clientEmail: mail,
            spentTime: hajm.toString(),
            carBool: car,
            parkingBool: values.jobParking,
            totalAmount: total.toString(),
            description: values.description,
            material: values.material,
            notice: notice,
            status: status,
          };

          if (notice && content.clientemail !== "") {
            emailSend(content);
          }

          setSubmitting(false);

          change({ variables: content });
          props.history.push("/workorders");
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
                        <FlexColumn>NOVI NALOG</FlexColumn>
                        <FlexRow>
                          <FlexColumn>{user}</FlexColumn>
                        </FlexRow>
                      </FlexRow>
                    </MainHeader>
                    <Header style={{ marginTop: "5px" }}>
                      PODACI O KLIJENTU
                    </Header>
                    <Container>
                      <ResponsiveFlexRow>
                        <FlexColumn>
                          <Label>KLIJENT</Label>
                          <FlexRow>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              isDisabled={false}
                              isLoading={false}
                              isClearable={false}
                              name="client"
                              options={clientOptions}
                              onChange={(client) =>
                                setFieldValue("client", client.label) &&
                                handleClient(client)
                              }
                              styles={clientStyles}
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 4,
                                border: "1px solid",
                                colors: {
                                  ...theme.colors,
                                  primary25: colorPalette.primary55,
                                  primary: colorPalette.primary100,
                                },
                              })}
                            />
                            {errors.client ? (
                              <div
                                style={{
                                  marginLeft: "5px",
                                  backgroundColor: "orange",
                                  height: "38px",
                                  width: "145px",
                                  borderRadius: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    marginTop: "8px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {errors.client}
                                </div>
                              </div>
                            ) : null}
                          </FlexRow>
                          <FlexRow style={{ marginTop: "5px" }}>
                            <Button type="button" onClick={() => togglePopup()}>
                              Novi klijent
                            </Button>
                            <Button
                              type="button"
                              onClick={() => togglePopupDelete()}
                            >
                              Obriši klijenta
                            </Button>
                          </FlexRow>
                        </FlexColumn>
                        <FlexColumn style={{ marginLeft: "0px" }}>
                          <Label>IME I PREZIME</Label>
                          <TextInput
                            style={{ width: 200 }}
                            type="text"
                            name="jobUser"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={clientName}
                          />
                          <Label>E-MAIL</Label>
                          <TextInput
                            style={{ width: 200 }}
                            type="text"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={mail}
                          />
                        </FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <Header>DETALJI ZAHTJEVA</Header>
                    <Container>
                      <ResponsiveFlexRow>
                        <FlexColumn>
                          <Label>DATUM</Label>
                          <div style={{ width: "120px" }}>
                            <DatePicker
                              value={new Date(values.startDate)}
                              onChange={(date) =>
                                setFieldValue("startDate", date)
                              }
                              date={formatDate(new Date())}
                            />
                          </div>

                          <Label style={{ marginTop: "15px" }}>
                            REDNI BROJ
                          </Label>
                          <TextInput
                            type="text"
                            name="jobId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={id || ""}
                            style={{ width: 60 }}
                            disabled={true}
                          />
                        </FlexColumn>
                        <FlexColumn
                          style={{
                            marginLeft: statusPosLeft,
                            marginTop: statusPosTop,
                          }}
                        >
                          <Label>STATUS</Label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={statusOptions[0]}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            name="status"
                            options={statusOptions}
                            onChange={handleStatus}
                            styles={statusStyles}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 4,
                              border: "1px solid",
                              colors: {
                                ...theme.colors,
                                primary25: colorPalette.primary55,
                                primary: colorPalette.primary100,
                              },
                            })}
                          />
                          <Label style={{ marginTop: "15px" }}>
                            AUTO-OBAVIJEST
                          </Label>
                          <FlexColumn style={{ padding: "0rem" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100px",
                              }}
                            >
                              <ToggleSwitch
                                value={notice}
                                onChange={handleNotification}
                              />
                            </div>
                          </FlexColumn>
                        </FlexColumn>
                        <FlexColumn style={{ marginLeft: textAreaPos }}>
                          <Label>OPIS PROBLEMA</Label>
                          <FlexRow>
                            <TextArea
                              type="text"
                              name="description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                              style={{
                                width: textAreaWidth,
                                resize: "none",
                              }}
                              rows={6}
                            />
                            {errors.description ? (
                              <div
                                style={{
                                  marginLeft: "5px",
                                  backgroundColor: "orange",
                                  height: "38px",
                                  width: "210px",
                                  borderRadius: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    marginTop: "8px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {errors.description}
                                </div>
                              </div>
                            ) : null}
                          </FlexRow>
                        </FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <Header>DODATNE INFORMACIJE</Header>
                    <Container>
                      <ResponsiveFlexRow>
                        <FlexColumn>
                          <Label>POČETAK</Label>
                          <StyledTimePicker
                            style={{ width: 120 }}
                            showSecond={false}
                            className="form-control"
                            name="timeStart"
                            defaultValue={values.timeStart}
                            onChange={(tajm) =>
                              setFieldValue("timeStart", tajm)
                            }
                            disabled={true}
                          />
                          <Label>AUTOMOBIL</Label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={yesNoOptions[0]}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            name="jobCar"
                            options={yesNoOptions}
                            onChange={handleCar}
                            styles={customStyles}
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 4,
                              border: "1px solid",
                              colors: {
                                ...theme.colors,
                                primary25: colorPalette.primary55,
                                primary: colorPalette.primary100,
                              },
                            })}
                          />
                          {errors.jobCar && touched.jobCar && errors.jobCar}
                        </FlexColumn>

                        <FlexColumn
                          style={{
                            marginLeft: timeEndLeft,
                            marginTop: timeEndTop,
                          }}
                        >
                          <Label>KRAJ</Label>
                          <StyledTimePicker
                            style={{ width: 120 }}
                            showSecond={false}
                            className="form-control"
                            name="timeEnd"
                            defaultValue={values.timeEnd}
                            onChange={(tajm) => setFieldValue("timeEnd", tajm)}
                            disabled={true}
                          />
                          <Label>PARKING</Label>
                          <TextInput
                            type="text"
                            name="jobParking"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.jobParking}
                            style={{ width: 105 }}
                            disabled={true}
                          />
                          {errors.jobParking &&
                            touched.jobParking &&
                            errors.jobParking}
                        </FlexColumn>
                        <FlexColumn style={{ marginLeft: textAreaPos }}>
                          <Label>MATERIJAL</Label>
                          <TextArea
                            type="text"
                            name="material"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.material}
                            style={{
                              width: textAreaWidth,
                              resize: "none",
                            }}
                            rows={5}
                          />
                          {errors.material &&
                            touched.material &&
                            errors.material}
                        </FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <ButtonContainer>
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
      {popupNew ? <PopupClientNew closePopup={togglePopupClose} /> : null}
      {popupDelete ? (
        <PopupClientDelete closePopup={togglePopupDeleteClose} />
      ) : null}
    </div>
  );
};

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: 120,

    boxShadow: state.isFocused ? `0 0 5px ${colorPalette.primary100}` : null,
    borderColor: state.isFocused ? colorPalette.primary100 : null,
  }),
  control: (base) => ({
    ...base,

    "&:hover": {
      border: `1px solid ${colorPalette.primary100}`,
    },
  }),
};

const statusStyles = {
  container: (provided, state) => ({
    ...provided,
    width: 135,
    boxShadow: state.isFocused ? `0 0 5px ${colorPalette.primary100}` : null,
    borderColor: state.isFocused ? colorPalette.primary100 : null,
  }),
  control: (base) => ({
    ...base,
    "&:hover": {
      border: `1px solid ${colorPalette.primary100}`,
    },
  }),
};

const clientStyles = {
  container: (provided, state) => ({
    ...provided,
    width: 165,
    boxShadow: state.isFocused ? `0 0 5px ${colorPalette.primary100}` : null,
    borderColor: state.isFocused ? colorPalette.primary100 : null,
  }),
  control: (base) => ({
    ...base,
    "&:hover": {
      border: `1px solid ${colorPalette.primary100}`,
    },
  }),
};
