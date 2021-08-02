import { gql } from '@apollo/client';

// We pass the user id and fetch the name


export const GET_CLIENTS = gql`
query($numclient: String_comparison_exp = {}) {
  test_clients(where: {numclient: $numclient}) {
    adressebranchement
    ancienindex
    categorie
    centre
    consommation
    consommationtotale
    natureconso
    nomclient
    nouvelindex
    numbranchement
    numclient
    numpolice
    ps
  }
}
`

export const GET_FACTURES = gql`
query($numclient: String_comparison_exp = {}) {
  test_factures(where: {numclient: $numclient}) {
    etatfacture
    montantfacture
    numbranchement
    numfacture
    periode
    soldefactures
    typefacture
  }
}
`

export const GET_CLIENT_IMPAYE = gql`
  query MyQuery {
    V1_factures_aggregate(where: {soldeFacture: {_eq: "0"}}) {
      aggregate {
        sum {
          montantFacture
        }
      }
    }
  }   
`

// We pass the user id and the name in order to update it
export const ADD_USER = gql`
mutation($centre: Int, $numClient: String, $tel: String, $id: String) {
  insert_test_users(objects: {centre: $centre, numClient: $numClient, tel: $tel, id: $id}) {
    returning {
      numClient
      tel
      id
    }
  }
}
`;

export const GET_USER = gql`
  query MyQuery($id: String_comparison_exp) {
    test_users(where: {id: $id}) {
      numClient
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