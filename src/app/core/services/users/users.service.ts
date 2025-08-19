import { Injectable } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private apollo: Apollo) { }

  registerUser(register: any) {
    return this.apollo.mutate({
      mutation: gql`
          mutation registerUser($username: String!, $email: String!, $password: String!) {
            registerUser(username: $username, email: $email, password: $password) {
              success
              message
              user {
                username
                email
              }
            }
          }
        `,
      variables: register
    });
  }
}
