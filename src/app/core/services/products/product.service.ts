import { Injectable } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Product } from '../../../modules/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  getProducts() {
    return this.apollo.watchQuery({
      query: gql`
        query {
            products {
                id
                name
                price
                description
                image
                amount
                characteristics
            }
        }  
      `,
    });
  }

  addProduct(product: Product) {
    return this.apollo.mutate({
      mutation: gql`
        mutation addProduct($name: String!, $price: Int!, $description: String!, $amount: Int!, $characteristics: String!, $code: String!) {
              addProduct(name: $name, price: $price, description: $description, amount: $amount, characteristics: $characteristics, code: $code) {
                  name
                  price
                  description
                  amount
                  code
                  characteristics
              }
               
            }
        
      `,
      variables: product,
      refetchQueries: [
        {
          query: gql`
            query {
                products {
                    name
                    price
                    description
                    image
                    amount
                    characteristics
                }
            }  
          `
        }
      ]
    });
  }

  deleteProduct(id: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteProduct($id: ID!) {
              deleteProduct(id: $id) {
                  name
              }
            }
        
      `,
      variables: {id},
      refetchQueries: [
        {
          query: gql`
            query {
                products {
                    name
                    price
                    description
                    image
                    amount
                    characteristics
                }
            }  
          `
        }
      ]
    });
  }
  editProduct(product: Product){
    return this.apollo.mutate({
      mutation: gql`
        mutation updateProduct($id: ID!, $name: String, $description: String, $amount: Int!, $price: Int!, $characteristics: String!) {
              updateProduct(id: $id, name: $name, description: $description, amount: $amount, price: $price, characteristics: $characteristics) {
                  name
                  description
                  amount
                  price
                  characteristics
              }
            }
        
      `,
      variables: product,
      refetchQueries: [
        {
          query: gql`
            query {
                products {
                    name
                    price
                    description
                    image
                    amount
                    characteristics
                }
            }  
          `
        }
      ]
    });
  }
}
