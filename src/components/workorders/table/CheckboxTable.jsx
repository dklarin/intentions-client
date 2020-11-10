import React, { useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export const CheckboxTable = (props) => {
  console.log(props);
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

    props.onDelete(keys);
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
                checked={state.selected[original.woId] === true}
                onChange={() => toggleRow(original.woId)}
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
