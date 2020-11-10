import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
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
//import { GETWORKORDER, UPDATEWORKORDER } from "./gql";
import { formatDate, pastFutureDates, viewDate } from "./functions";
import { yesNoOptions, statusOptions } from "./options";
import { colorPalette } from "../../style/theme";

export const WorkOrderChange = (props) => {
  const user = localStorage.getItem("username");
  let { id } = useParams();

  const initialQueryVariables = {
    woId: null,
    dueDate: pastFutureDates(-1095),
    dueDate1: pastFutureDates(1),
  };

  const [queryVariables] = useState(initialQueryVariables);
  const { data } = useQuery(GETWORKORDER, {
    variables: queryVariables,
  });
  const [change] = useMutation(UPDATEWORKORDER);

  let item;
  let clientName = "";
  let clientEmail = "";
  let dueDate = null;
  let carSelect = "";
  let parkingBool = "";
  let description = "";
  let material = "";
  let notice = false;
  let statusSelect = "";

  if (data && data.getWorkOrder) {
    item = data.getWorkOrder[id - 1];
    clientName = item.clientName;
    clientEmail = item.clientEmail;
    dueDate = new Date(viewDate(item.dueDate));
    carSelect = item.carBool;
    parkingBool = item.parkingBool;
    description = item.description;
    material = item.material;
    notice = item.notice;
    statusSelect = item.status;
  }

  const [tog, setTog] = useState(notice);
  const [send, setSend] = useState(notice);

  let carBase;
  carSelect === "Da"
    ? (carBase = yesNoOptions[0])
    : (carBase = yesNoOptions[1]);

  let statusBase;
  if (statusSelect === "Otvoren") {
    statusBase = statusOptions[0];
  } else if (statusSelect === "Dodijeljen") {
    statusBase = statusOptions[1];
  } else if (statusSelect === "U radu") {
    statusBase = statusOptions[2];
  } else {
    statusBase = statusOptions[3];
  }

  const [car, setCar] = useState(carBase);
  const [status, setStatus] = useState(statusBase);

  /**
   * function that sends e-mail notification to server via proxy
   * @param {*} e status of work order
   */
  const handleEmail = (e) => {
    let info = "";
    tog ? (info = e) : (info = status.value);

    axios.post("/sendtome", {
      email: clientEmail,
      name: "My company",
      subject: "Uređaj",
      text:
        info === "Završen"
          ? "Status radnog naloga: " + info + ". \n Možete doći po uređaj!"
          : "Status radnog naloga: " + info + ".",
    });
  };

  /**
   * function that turns off or on toggleSwitch
   */
  const handleNotification = () => {
    setTog(!tog);
    setSend(!send);
  };

  /**
   * calculates time * price
   * @param {*} spentTime
   */
  const handleMoney = (spentTime) => {
    let workPrice;
    if (clientName === "Algebra " || clientName === "MCPA ") {
      workPrice = 50 / 60;
    } else {
      workPrice = 100 / 60;
    }
    let timePrice = parseInt(spentTime) * workPrice;
    return timePrice;
  };

  /**
   * function that handles spent time in work order
   */
  const handleTime = (item) => {
    let start = new Date(item.timeStart);
    let end = new Date(item.timeEnd);
    let totalTime = new Date(end - start);
    let spentTime = (totalTime.getHours() - 1) * 60 + totalTime.getMinutes();
    return spentTime;
  };

  /**
   * function that handles if car is used or not
   * @param {*} item
   */
  const handleCar = (item) => {
    if (item != null) {
      setCar(item);
    }
  };

  /**
   * handles status and passes arg to function for e-mail notification (if e-mail is known)
   * @param {*} item
   */
  const handleStatus = (item) => {
    if (item != null) {
      setStatus(item);
      if (tog && clientEmail !== "") {
        handleEmail(item.value);
      }
    }
  };

  let statusPosLeft = "-60px";
  let statusPosTop = "0px";
  let textAreaPos = "-60px";
  let textAreaWidth = 300;
  let timeEndLeft = "-60px";
  let timeEndTop = "0px";

  let emailPos = "232px";

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
      emailPos = "0px";
    }
  }

  ShowWindowDimensions();

  return data && data.getWorkOrder ? (
    <div>
      <Formik
        initialValues={{
          jobId: id,
          jobUser: clientName,
          clientEmail: clientEmail,
          startDate: dueDate,
          timeStart: moment(),
          timeEnd: moment(),
          jobParking: parkingBool,
          description: description,
          material: material,
        }}
        onSubmit={(values, { setSubmitting }) => {
          let carCost;
          let parkingCost;

          if (car.value === "Da") {
            carCost = 27.75;
          } else {
            carCost = 0;
          }

          if (values.jobParking === "") {
            parkingCost = 0;
          } else {
            parkingCost = parseInt(values.jobParking);
          }

          let spentTime = handleTime(values);
          let moneyValue = handleMoney(spentTime);
          let total = carCost + parkingCost + moneyValue;

          const content = {
            woId: parseInt(values.jobId),
            dueDate: values.startDate,
            clientName: values.jobUser,
            clientEmail: values.clientEmail,
            spentTime: spentTime.toString(),
            carBool: car.value,
            parkingBool: values.jobParking,
            description: values.description,
            totalAmount: Math.round(total).toString(),
            material: values.material,
            notice: tog,
            status: status.value,
          };

          change({ variables: content });
          props.history.push("/workorders");

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
                        <FlexColumn>IZMJENA NALOGA</FlexColumn>
                        <FlexRow>
                          <FlexColumn>{user}</FlexColumn>
                        </FlexRow>
                      </FlexRow>
                    </MainHeader>
                    {/***************************** PODACI O KLIJENTU *****************************/}
                    <Header style={{ marginTop: "5px" }}>
                      PODACI O KLIJENTU
                    </Header>
                    <Container>
                      <ResponsiveFlexRow>
                        {/************** 1. KOLONA **************/}
                        <FlexColumn>
                          {/************** KLIJENT **************/}
                          <Label>IME I PREZIME</Label>
                          <TextInput
                            style={{ width: 200 }}
                            type="text"
                            name="jobUser"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.jobUser}
                          />
                          {errors.jobUser && touched.jobUser && errors.jobUser}
                        </FlexColumn>
                        {/************** 2. KOLONA **************/}
                        <FlexColumn style={{ marginLeft: emailPos }}>
                          {/************** E-MAIL **************/}
                          <Label>E-MAIL</Label>
                          <TextInput
                            style={{ width: 200 }}
                            type="text"
                            name="clientEmail"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.clientEmail}
                          />
                          {errors.clientEmail &&
                            touched.clientEmail &&
                            errors.clientEmail}
                        </FlexColumn>
                        <FlexColumn></FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    {/***************************** DETALJI ZAHTJEVA *****************************/}
                    <Header>DETALJI ZAHTJEVA</Header>
                    <Container>
                      <ResponsiveFlexRow>
                        {/************** 1. KOLONA **************/}
                        <FlexColumn>
                          {/************** DATUM **************/}
                          <Label>DATUM</Label>

                          <div style={{ width: "120px" }}>
                            <DatePicker
                              value={new Date(values.startDate)}
                              //onChange={handleDateFrom}
                              onChange={(date) =>
                                setFieldValue("startDate", date)
                              }
                              date={formatDate(new Date())}
                            />
                          </div>
                          {/************** ID **************/}
                          <Label style={{ marginTop: "15px" }}>
                            REDNI BROJ
                          </Label>
                          <TextInput
                            type="text"
                            name="jobId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.jobId}
                            style={{ width: 60 }}
                            disabled={true}
                          />
                          {errors.jobId && touched.jobId && errors.jobId}
                        </FlexColumn>
                        {/************** 2. COLUMN **************/}
                        <FlexColumn
                          style={{
                            marginLeft: statusPosLeft,
                            marginTop: statusPosTop,
                          }}
                        >
                          {/************** STATUS **************/}
                          <Label>STATUS</Label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={status}
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
                          {/************** AUTO-OBAVIJEST **************/}
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
                                //value={klik ? val : value}
                                value={tog}
                                onChange={handleNotification}
                              />
                            </div>
                          </FlexColumn>
                        </FlexColumn>
                        {/************** 3. KOLONA **************/}
                        <FlexColumn style={{ marginLeft: textAreaPos }}>
                          {/************** OPIS PROBLEMA **************/}
                          <Label>OPIS PROBLEMA</Label>
                          <TextArea
                            type="text"
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            style={{ width: textAreaWidth, resize: "none" }}
                            rows={5}
                          />
                          {errors.description &&
                            touched.description &&
                            errors.description}
                        </FlexColumn>
                        <FlexColumn></FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    {/***************************** DODATNE INFORMACIJE *****************************/}
                    <Header>DODATNE INFORMACIJE</Header>
                    <Container>
                      <ResponsiveFlexRow>
                        {/************** 1. KOLONA **************/}
                        <FlexColumn>
                          {/************** POČETAK **************/}
                          <Label>POČETAK</Label>
                          <StyledTimePicker
                            style={{ width: 120 }}
                            showSecond={false}
                            className="form-control"
                            //id="time"
                            name="timeStart"
                            // format={format}
                            defaultValue={values.timeStart}
                            onChange={(tajm) =>
                              setFieldValue("timeStart", tajm)
                            }
                          />
                          {/************** AUTOMOBIL **************/}
                          <Label>AUTOMOBIL</Label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={carBase}
                            //value={state.value}
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
                        </FlexColumn>
                        {/************** 2. KOLONA **************/}
                        <FlexColumn
                          style={{
                            marginLeft: timeEndLeft,
                            marginTop: timeEndTop,
                          }}
                        >
                          {/************** KRAJ **************/}
                          <Label>KRAJ</Label>
                          <StyledTimePicker
                            style={{ width: 120 }}
                            showSecond={false}
                            className="form-control"
                            //id="time"
                            name="timeEnd"
                            // format={format}
                            defaultValue={values.timeEnd}
                            onChange={(tajm) => setFieldValue("timeEnd", tajm)}
                          />
                          {/************** PARKING **************/}
                          <Label>PARKING</Label>
                          <TextInput
                            type="text"
                            name="jobParking"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.jobParking}
                            style={{ width: 105 }}
                          />
                          {errors.jobParking &&
                            touched.jobParking &&
                            errors.jobParking}
                        </FlexColumn>
                        {/************** 3. KOLONA **************/}
                        <FlexColumn style={{ marginLeft: textAreaPos }}>
                          {/************** MATERIJAL **************/}
                          <Label>MATERIJAL</Label>
                          <TextArea
                            type="text"
                            name="material"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.material}
                            style={{ width: textAreaWidth, resize: "none" }}
                            rows={5}
                          />
                          {errors.material &&
                            touched.material &&
                            errors.material}
                        </FlexColumn>
                        <FlexColumn></FlexColumn>
                      </ResponsiveFlexRow>
                    </Container>
                    <ButtonContainer>
                      <FlexRow>
                        <Button type="submit" disabled={isSubmitting}>
                          Ažuriraj
                        </Button>
                        <Button
                          type="button"
                          onClick={() => props.history.push("/workorders")}
                        >
                          Odustani
                        </Button>
                        <Button
                          type="button"
                          disabled={send}
                          onClick={() => handleEmail()}
                        >
                          E-mail
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
  ) : null;
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
      //borderColor: colorPalette.primary100,
      border: `1px solid ${colorPalette.primary100}`,
    },
  }),
};

const statusStyles = {
  container: (provided, state) => ({
    ...provided,
    width: 135,
    boxShadow: state.isFocused ? `0 0 10px ${colorPalette.primary100}` : null,
    borderColor: state.isFocused ? colorPalette.primary100 : null,
  }),
  control: (base) => ({
    ...base,

    "&:hover": {
      //borderColor: colorPalette.primary100,
      border: `1px solid ${colorPalette.primary100}`,
    },
  }),
};
