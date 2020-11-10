import gql from "graphql-tag";

export const ADDWORKORDER = gql`
  mutation(
    $woId: Int
    $clientName: String
    $clientEmail: String
    $spentTime: String
    $carBool: String
    $parkingBool: String
    $totalAmount: String
    $dueDate: Date
    $description: String
    $material: String
    $notice: Boolean
    $status: String
  ) {
    addWorkOrder(
      woId: $woId
      clientName: $clientName
      clientEmail: $clientEmail
      spentTime: $spentTime
      carBool: $carBool
      parkingBool: $parkingBool
      totalAmount: $totalAmount
      dueDate: $dueDate
      description: $description
      material: $material
      notice: $notice
      status: $status
    ) {
      woId
      clientName
    }
  }
`;

export const UPDATEWORKORDER = gql`
  mutation(
    $woId: Int
    $clientName: String
    $clientEmail: String
    $spentTime: String
    $carBool: String
    $parkingBool: String
    $totalAmount: String
    $dueDate: Date
    $description: String
    $material: String
    $notice: Boolean
    $status: String
  ) {
    updateWorkOrder(
      woId: $woId
      clientName: $clientName
      clientEmail: $clientEmail
      spentTime: $spentTime
      carBool: $carBool
      parkingBool: $parkingBool
      totalAmount: $totalAmount
      dueDate: $dueDate
      description: $description
      material: $material
      notice: $notice
      status: $status
    ) {
      woId
      clientName
    }
  }
`;



/*export const GETINTENTION = gql`
  query(
    $id: Int
    $dueDate: Date
    $dueDate1: Date
    $parisher: String
  ) {
    getIntention(
      id: $id
      dueDate: $dueDate
      dueDate1: $dueDate1
      parisher: $parisher
        ) {
      id
      parisher
      intent
      dueDate
      paid
    }
  }
`;*/

export const ADDINTENTION = gql`
mutation(
  $iId: Int
  $parisher: String
  $intent: String
  $dueDate: Date
  $paid: Boolean
  ) {
    addIntention(
      iId: $iId
      parisher: $parisher
      intent: $intent
      dueDate: $dueDate
      paid: $paid
    ) {
      iId
      parisher
      intent
      dueDate
      paid
    }
  }
`

export const GETINTENTION = gql`
  query(
    $iId: Int
    $dueDate: Date
    $dueDate1: Date
    $parisher: String
    ) {
      getIntention(
      iId: $iId
      dueDate: $dueDate
      dueDate1: $dueDate1
      parisher: $parisher
      ) {
        iId
        parisher
        intent
        dueDate
        paid
      }
    }
  `;

export const GETINTENTIONS = gql`
  query{
    getIntentions
     {
      iId
      parisher
      intent
      dueDate
      paid
    }
  }
`;

export const REMOVEWORKORDER = gql`
  mutation($woId: Int) {
    removeWorkOrder(woId: $woId) {
      woId
    }
  }
`;
