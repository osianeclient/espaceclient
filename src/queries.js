import { gql } from '@apollo/client';

// We pass the user id and fetch the name
export const GET_CONTRATS = gql`
  query($id: String!) {
    users_by_pk(id: $id) {
      name
    }
  }
`;

// We pass the user id and the name in order to update it
export const UPDATE_CONTRAT = gql`
  mutation($id: String!, $name: String!) {
    update_users_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
      name
    }
  }
`;

// We pass the user id and fetch the name
export const CREATE_CONTRAT = gql`
  mutation($numPolice: String!, $numClient: String!, $numBranchement: float8!, $user_id: String!) {
    insert_V1_contrats(objects: {numBranchement: $numBranchement, numClient: $numClient, numPolice: $numPolice, user_id: $user_id}){
      affected_rows
    }
  }
`;

// We pass the user id and the name in order to update it
export const DELETE_CONTRAT = gql`
  mutation($id: String!, $name: String!) {
    update_users_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
      name
    }
  }
`;