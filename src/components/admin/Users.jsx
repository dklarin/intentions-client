import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
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
import { Table } from "../../style/grid-table-style";
import { Button } from "../../ui/button";
import { GETUSER, REMOVEUSER } from "./gql";

export const Users = (props) => {
  const user = localStorage.getItem("username");

  const initialQueryVariables = {
    id: null,
    username: "",
    role: "",
  };
  const [queryVariables] = useState(initialQueryVariables);
  const { data, refetch, error } = useQuery(GETUSER, {
    variables: queryVariables,
  });
  const [erase] = useMutation(REMOVEUSER);

  let disableDelete = true;
  let disableChange = true;

  const [state, setState] = useState({
    selected: {},
    selectAll: 0,
  });

  let keys = [];
  let baseLength;

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

  /**
   * this doesn't work yet
   */
  const toggleSelectAll = () => {
    let newSelected = {};
    if (state.selectAll === 0) {
      props.data.forEach((x) => {
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
      Header: "Zaposlenici",
      columns: [
        {
          id: "checkbox",
          accessor: "",
          Cell: ({ original }) => {
            return (
              <input
                type="checkbox"
                className="checkbox"
                checked={state.selected[original.id] === true}
                onChange={() => toggleRow(original.id)}
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
          accessor: "id",
          width: 45,
        },
        {
          Header: "Korisnik",
          accessor: "username",
        },
        {
          Header: "Uloga",
          accessor: "role",
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
      ],
    },
  ];

  /********* CHECKBOX TABLE functions and columns: E N D *********/

  /********* LOGIC THAT CHECKS WHAT CHECKBOXES ARE CLICKED: S T A R T *********/
  // and decides which button will be active

  if (data && data.getUser) {
    baseLength = data.getUser.length;
  }

  if (keys.length > 1) {
    for (let i = 0; i < keys.length; i++) {
      if (baseLength === parseInt(keys[0])) {
        if (parseInt(keys[i]) === parseInt(keys[i - 1]) - 1) {
          disableDelete = false;
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

  /**
   * enters component to change clicked user
   */
  const handleItemClick = (index) => {
    let item = data.getUser[index];
    props.history.push(`/changeuser/${item.id}`);
  };

  /**
   * function that deletes selected items
   */
  const handleDelete = () => {
    let i;
    for (i = 0; i < keys.length; i++) {
      console.log(keys[i]);
      const content = {
        id: parseInt(keys[i]),
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
        <LeftGridContainer />
        <RightGridContainer>
          <MainHeader style={{ marginTop: "5px" }}>
            <FlexRow>
              <FlexColumn>ZAPOSLENICI</FlexColumn>
              <FlexRow>
                <FlexColumn>{user}</FlexColumn>
              </FlexRow>
            </FlexRow>
          </MainHeader>
          <ButtonContainer
            style={{ marginTop: "50px", height: "85px" }}
          ></ButtonContainer>
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
              data={data && data.getUser}
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
                onClick={() => props.history.push(`/changeuser/${keys[0]}`)}
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

export default Users;
