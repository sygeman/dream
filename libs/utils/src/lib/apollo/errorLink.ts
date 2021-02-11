import { fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { refreshTokens } from './refreshTokens';

type PendingRequest = () => void;

let isRefreshing = false;
let pendingRequests: PendingRequest[] = [];

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value;
};

const addPendingRequest = (pendingRequest: PendingRequest) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err?.message) {
        case 'Unauthorized':
          if (!isRefreshing) {
            setIsRefreshing(true);

            return fromPromise(
              refreshTokens().catch(() => {
                localStorage.clear();

                resolvePendingRequests();
                setIsRefreshing(false);

                return forward(operation);
              })
            ).flatMap(() => {
              resolvePendingRequests();
              setIsRefreshing(false);

              return forward(operation);
            });
          } else {
            return fromPromise(
              new Promise((resolve) => {
                //@ts-ignore
                addPendingRequest(() => resolve());
              })
            ).flatMap(() => forward(operation));
          }
      }
    }
  }
});
