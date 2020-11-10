import React, { useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export const CheckboxTable = (props) => {
  const [state, setState] = useState({
    selected: {},
    selectAll: 0,
  });

  let keys = [];

  const send = () => {
    for (const property in state.selected) {
      if (`${state.selected[property]}` === "true") {
        keys.unshift(`${property}`);
      }
    }

    //props.onDelete(keys);
  };

  send();

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
      props.data.forEach((x) => {
        newSelected[x.index] = true;
      });
    }

    setState({
      selected: newSelected,
      selectAll: state.selectAll === 0 ? 1 : 0,
    });
  };

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
        },
      ],
    },
  ];

  return (
    <div>
      <ReactTable
        previousText={"Prethodna"}
        nextText={"Sljedeća"}
        noDataText={"Nema podataka"}
        pageText={"Stranica"}
        ofText={"od"}
        rowsText={"redaka"}
        data={props.data}
        defaultPageSize={10}
        columns={columns}
        getTdProps={props.getTdProps}
      />
    </div>
  );
};
