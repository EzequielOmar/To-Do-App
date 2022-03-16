import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { onError } from 'apollo-link-error';

const uri =
  'http://localhost:8080/graphql'; /*'https://eov-todo-api.herokuapp.com/graphql'*/

//Middleware to prepare graphql `request`
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));
  //Get the session token from sessionStorage and add it to header authorization (if null return empty object)
  const auth = setContext((operation, context) => {
    const token = sessionStorage.getItem('accessToken');
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });
  const error = setContext((operation, context) => {
    onError(({ forward, graphQLErrors, networkError, operation }): any => {
      alert('asdasd');
      console.log(forward);
      console.log(graphQLErrors);
      console.log(networkError);
      console.log(operation);
    });
  });

  const link = ApolloLink.from([error, basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();
  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
