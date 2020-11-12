import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { addDays } from "date-fns";
import {
  Wrapper,
  GridContainer,
  LeftGridContainer,
  RightGridContainer,
  MainHeader,
  FlexRow,
  FlexColumn,
  ButtonContainer,
} from "../../style/global-style";
import {
  Table,
  DateFromPicker,
  DateToPicker,
  SearchButton,
} from "../../style/grid-table-style";
import { Button } from "../../ui/button";
import { SearchInput } from "../../ui/searchInput";
import { GETWORKORDER, REMOVEWORKORDER } from "./gql";
import { formatDate, pastFutureDates } from "./functions";
import { ContentView } from "../layout/ContentView";

const todaysDate = new Date();

export const WorkOrders = (props) => {
  const user = localStorage.getItem("username");

  const initialQueryVariables = {
    woId: null,
    dueDate: pastFutureDates(-1095),
    dueDate1: pastFutureDates(1),
  };
  const [queryVariables, setQueryVariables] = useState(initialQueryVariables);
  const { data, refetch, error } = useQuery(GETWORKORDER, {
    variables: queryVariables,
  });
  const [erase] = useMutation(REMOVEWORKORDER);

  const [dateFrom, setDateFrom] = useState(addDays(todaysDate, -2));
  const [dateTo, setDateTo] = useState(addDays(todaysDate, 1));

  let disableDelete = true;
  let disableChange = true;

  const [state, setState] = useState({
    selected: {},
    selectAll: 0,
  });

  let keys = [];
  let baseLength;
  let counter = 0;

  useEffect(() => {
    refetch(queryVariables);
  });

  /********* CHECKBOX TABLE functions and columns *********/

  const toggleRow = (index) => {
    const newSelected = Object.assign({}, state.selected);
    newSelected[index] = !state.selected[index];

    setState({
      selected: newSelected,
      selectAll: 2,
    });
  };

  const toggleSelectAll = () => {
    let newSelected = {};
    if (state.selectAll === 0) {
      data.forEach((x) => {
        newSelected[x.index] = true;
      });
    }

    setState({
      selected: newSelected,
      selectAll: state.selectAll === 0 ? 1 : 0,
    });
  };

  for (const property in state.selected) {
    if (`${state.selected[property]}` === "true") {
      keys.unshift(`${property}`);
    }
  }

  const columns = [
    {
      Header: "Naziv",
      columns: [
        {
          id: "checkbox",
          accessor: "",
          Cell: ({ original }) => {
            return (
              <input
                type="checkbox"
                className="checkbox"
                checked={state.selected[original.woId] === true}
                onChange={() => toggleRow(original.woId)}
                value={state.selected || ""}
              />
            );
          },
          Header: (x) => {
            return (
              <input
                type="checkbox"
                className="checkbox"
                checked={state.selectAll === 1}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = state.selectAll === 2;
                  }
                }}
                onChange={() => toggleSelectAll()}
              />
            );
          },
          sortable: false,
          width: 45,
        },
        {
          Header: "ID",
          accessor: "woId",
          width: 40,
          Cell: (row) => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {row.value}
            </div>
          ),
        },
        {
          Header: "Klijent",
          accessor: "clientName",
        },
      ],
    },
    {
      Header: "Informacije",
      columns: [
        {
          Header: "Datum",
          accessor: "dueDate",
          width: 120,
          Cell: (row) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {row.value}
            </div>
          ),
        },
        {
          Header: "Opis problema",
          accessor: "description",
        },
        {
          Header: "Status",
          accessor: "status",
          width: 110,
          Cell: (row) => (
            <span>
              <span
                style={{
                  color:
                    row.value === "Otvoren"
                      ? "#ff2e00"
                      : row.value === "Dodijeljen"
                      ? "#ffbf00"
                      : row.value === "U radu"
                      ? "#ffff00"
                      : "#57d500",
                  transition: "all .3s ease",
                }}
              >
                &#x25cf;
              </span>{" "}
              {row.value === "Otvoren"
                ? "Otvoren"
                : row.value === "Dodijeljen"
                ? `Dodijeljen`
                : row.value === "U radu"
                ? "U radu"
                : "Završen"}
            </span>
          ),
        },
        {
          Header: "Ukupno",
          accessor: "totalAmount",
          width: 80,
          Cell: (row) => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {row.value}
            </div>
          ),
        },
      ],
    },
  ];

  /********* CHECKBOX TABLE functions and columns: E N D *********/

  /********* LOGIC THAT CHECKS WHAT CHECKBOXES ARE CLICKED: S T A R T *********/
  // and decides which button will be active

  if (data && data.getWorkOrder) {
    baseLength = data.getWorkOrder.length;
  }

  if (keys.length > 1) {
    for (let i = 0; i < keys.length; i++) {
      if (baseLength === parseInt(keys[0])) {
        if (parseInt(keys[i]) === parseInt(keys[i - 1]) - 1) {
          counter++;
          if (counter === keys.length - 1) {
            disableDelete = false;
          }
        }
      } else {
        disableDelete = true;
      }
    }
  } else if (keys.length === 1) {
    disableChange = false;
    if (baseLength === parseInt(keys[0])) {
      disableDelete = false;
    }
  }

  /********* LOGIC THAT CHECKS WHAT CHECKBOXES ARE CLICKED: E N D *********/

  /********* DATE SETTERS functions and date formatter: S T A R T *********/

  const handleDateFrom = async (e) => {
    setDateFrom(formatDate(e));
  };

  const handleDateTo = async (e) => {
    setDateTo(formatDate(e));
  };

  const handleSearchDates = async () => {
    let fromDate = new Date(dateFrom);
    let toDate = new Date(dateTo);

    const content = {
      dueDate: formatDate(addDays(fromDate, -1)),
      dueDate1: formatDate(addDays(toDate, 0)),
      woId: null,
    };
    await refetch(content);
    setQueryVariables(content);
  };
  /********* DATE SETTERS functions and date formatter: E N D *********/

  /**
   * search by woid, client, description or status
   */
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

  /**
   * passes id of work order to pdf page and opens pdf
   * @param {*} index
   */
  const handleItemClick = (index) => {
    let item = data.getWorkOrder[index];
    ContentView(item.woId);
    props.history.push(`/pdfworkorder/${item.woId}`);
  };

  /**
   * function that deletes selected items
   */
  const handleDelete = () => {
    let i;
    for (i = 0; i < keys.length; i++) {
      const content = {
        woId: parseInt(keys[i]),
      };
      erase({ variables: content });
    }
    refetch(queryVariables);
    keys = [];
    setState({ selected: {}, selectAll: 0 });
  };

  return error ? (
    <div>{console.error(error)}Error!</div>
  ) : (
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
                onChange={handleDateFrom}
                width={220}
                date={formatDate(dateFrom)}
              />

              <DateToPicker
                value={dateTo}
                onChange={handleDateTo}
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
            <ReactTable
              previousText={"Prethodna"}
              nextText={"Sljedeća"}
              noDataText={"Nema podataka"}
              pageText={"Stranica"}
              ofText={"od"}
              rowsText={"redaka"}
              defaultPageSize={10}
              columns={columns}
              data={data && data.getWorkOrder}
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e) => {
                    if (column.id !== "checkbox" && rowInfo !== undefined) {
                      handleItemClick(rowInfo.index);
                    }
                  },
                };
              }}
            />
          </Table>
          <ButtonContainer>
            <FlexRow>
              <Button
                onClick={handleDelete}
                children="Briši"
                disabled={disableDelete}
              />
              <Button
                onClick={() =>
                  props.history.push(`/changeworkorder/${keys[0]}`)
                }
                children="Izmijeni"
                disabled={disableChange}
              />
            </FlexRow>
          </ButtonContainer>
        </RightGridContainer>
      </GridContainer>
    </Wrapper>
  );
};
