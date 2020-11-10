import { addDays } from "date-fns";

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

/**
 * formats date in wanted type (WorkOrderChange)
 * @param {*} date
 */
export const viewDate = (date) => {
  var res = date.slice(0, 2);
  var res1 = date.slice(3, 5);
  var year = date.slice(6, 10);
  return [res1, res, year].join(".");
};

export const pastFutureDates = (days) => {
  const todaysDate = new Date();
  let date = addDays(todaysDate, days);
  return formatDate(date);
};
