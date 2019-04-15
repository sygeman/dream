import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  unprotect
} from 'mobx-state-tree';

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;

let store: IStore = null as any;

const Store = types
  .model({
    layoutInLoadArea: false
  })
  .actions(self => {
    const setLayoutInLoadArea = layoutInLoadArea => {
      self.layoutInLoadArea = layoutInLoadArea;
    };

    return {
      setLayoutInLoadArea
    };
  });

export const initializeStore = (isServer, snapshot = null) => {
  if (isServer) {
    store = Store.create({ layoutInLoadArea: false });
  }
  if ((store as any) === null) {
    store = Store.create({ layoutInLoadArea: false });
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  unprotect(store);

  return store;
};
