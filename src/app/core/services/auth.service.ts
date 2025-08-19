import { Injectable } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  authUser(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation authUser($email: String!, $password: String!) {
          authUser(email: $email, password: $password) {
            success
          }
        }
      `,
      variables: {
        email,
        password
      }
    });
  }
}
