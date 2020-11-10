import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Wrapper,
  GridContainer,
  LeftGridContainer,
  RightGridContainer,
  FlexRow,
  FlexColumn,
  MainHeader,
  ButtonContainer,
} from "./style/workorder";
import { ThemeProvider } from "styled-components";
import { light } from "../../ui/theme";
import { SearchInput } from "../../ui/searchInput";

import { addDays } from "date-fns";

import { Button } from "../../ui/button";

import {
  Table,
  DateFromPicker,
  DateToPicker,
  SearchButton,
} from "./style/table";

import { CheckboxTable } from "./table/CheckboxTable";

import { ContentView } from "../layout/ContentView";
import { GETWORKORDER, REMOVEWORKORDER } from "./gql";

const todaysDate = new Date();

export const WorkOrders = (props) => {
  const user = localStorage.getItem("username");

  // Vrijednosti na kalendaru
  const [dateFrom, setDateFrom] = useState(addDays(todaysDate, -2));
  const [dateTo, setDateTo] = useState(addDays(todaysDate, 1));
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableChange, setDisableChange] = useState(true);

  const initialQueryVariables = {
    woId: null,
    dueDate: "2004-12-03",
    dueDate1: "2020-12-01",
  };
  const [queryVariables, setQueryVariables] = useState(initialQueryVariables);
  const { data, refetch, error } = useQuery(GETWORKORDER, {
    variables: queryVariables,
  });

  useEffect(() => {
    refetch(queryVariables);
  });

  const [erase] = useMutation(REMOVEWORKORDER);

  let keys = [];

  // Funkcija služi za dodavanje elementa za brisanje iz tablice
  const prepareToDelete = (object) => {
    keys = [...object];

    if (keys.length > 1) {
      setDisableChange(true);
      setDisableDelete(false);
    } else if (keys.length === 1) {
      setDisableChange(false);
      setDisableDelete(false);
    } else {
      setDisableChange(true);
      setDisableDelete(true);
    }
  };

  const changeItem = () => {
    props.history.push(`/changeworkorder/${keys[0]}`);
  };

  let fafa = false;

  // Briše odabrane iteme
  const deltree = async () => {
    fafa = true;
    let i;
    for (i = 0; i < keys.length; i++) {
      console.log(keys[i]);
      const content = {
        woId: parseInt(keys[i]),
      };
      erase({ variables: content });
    }
    setDisableChange(disableChange);
    await refetch(queryVariables);
    //window.location.reload(false);
    console.log(keys);
  };

  const handleFrom = async (e) => {
    setDateFrom(formatDate(e));
  };

  const handleTo = async (e) => {
    setDateTo(formatDate(e));
  };

  // Konvertiranje datuma
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleItemClick = (index) => {
    let item = data.getWorkOrder[index];
    ContentView(item.woId);
    props.history.push(`/pdfworkorder/${item.woId}`);
  };

  const handleSearchDates = async () => {
    const content = {
      dueDate: dateFrom.toString(),
      dueDate1: dateTo.toString(),
      woId: null,
    };
    await refetch(content);
    setQueryVariables(content);
  };

  // Pretraživanje po id-u
  const handleSearch = async (woId) => {
    //const variables = { ...queryVariables, woId };

    const content = {
      woId: parseInt(woId),
      dueDate: null,
      dueDate1: null,
      description: woId,
      clientName: woId,
    };
    await refetch(content);
    setQueryVariables(content);
  };

  return error ? (
    <div>{console.error(error)}Error!</div>
  ) : (
    <ThemeProvider theme={light}>
      <Wrapper>
        <GridContainer>
          <LeftGridContainer></LeftGridContainer>
          <RightGridContainer>
            <MainHeader style={{ marginTop: "5px" }}>
              <FlexRow>
                <FlexColumn>RADNI NALOZI</FlexColumn>
                <FlexRow>
                  <FlexColumn>{user}</FlexColumn>
                </FlexRow>
              </FlexRow>
            </MainHeader>
            <ButtonContainer style={{ marginTop: "50px", height: "85px" }}>
              <FlexRow>
                <DateFromPicker
                  value={dateFrom}
                  onChange={handleFrom}
                  width={220}
                  date={formatDate(dateFrom)}
                />
                <DateToPicker
                  value={dateTo}
                  onChange={handleTo}
                  width={220}
                  date={formatDate(dateTo)}
                />
                <SearchButton
                  onClick={handleSearchDates}
                  children="Traži"
                  style={{ marginLeft: "8px" }}
                />
              </FlexRow>
              <SearchInput
                placeholder="Pretraži po ID-u, Klijentu, Opisu problema ili Statusu"
                onSearch={handleSearch}
                style={{ marginLeft: "0px", marginTop: "8px" }}
              />
            </ButtonContainer>
            <Table>
              <CheckboxTable
                fafa={"fafa"}
                data={data && data.getWorkOrder}
                onDelete={prepareToDelete}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e) => {
                      /*console.log("A Td Element was clicked!");
                    console.log("it produced this event:", e);
                    console.log("It was in this column:", column.Header);
                    console.log("It was in this row:", rowInfo);
                    console.log("It was in this table instance:", instance);*/
                      /*setState({
                selected: rowInfo.index,
              });*/
                      //handleItemClick(row.original.woId);
                      if (column.id !== "checkbox") {
                        handleItemClick(rowInfo.index);
                      }
                      //console.log("Kliknut sam");
                    },
                    /**style: {
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alighItems: "center",
                    },*/
                  };
                }}
              />
            </Table>
            <ButtonContainer>
              <FlexRow>
                <Button
                  onClick={deltree}
                  children="Briši"
                  disabled={disableDelete}
                />
                <Button
                  onClick={changeItem}
                  children="Izmijeni"
                  disabled={disableChange}
                />
              </FlexRow>
            </ButtonContainer>
          </RightGridContainer>
        </GridContainer>
      </Wrapper>
    </ThemeProvider>
  );
};
