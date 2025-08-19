import {gql} from '@apollo/client';

const AUTH_USER = gql`
  mutation authUser($email: email!, $password: password!) {
    authUser(email: $email, password: $password) {
      success
    }
} `;



export { AUTH_USER };