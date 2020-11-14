import gql from "graphql-tag";

export const CREATEINTENTION = gql`
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

export const UPDATEINTENTION = gql`
mutation(
  $iId: Int
  $parisher: String
  $intent: String
  $dueDate: Date
  $paid: Boolean
  ) {
    updateIntention(
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

export const DELETEINTENTION = gql`
  mutation(
    $iId: Int
    ) {
      removeIntention(
        iId: $iId
      ) {
        iId
        parisher
        intent
        dueDate
        paid
      }
    }
  `;

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
