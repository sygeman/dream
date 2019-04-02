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
    playSourceKey: '',
    layoutInLoadArea: false
  })
  .actions(self => {
    const setPlaySource = playSourceKey => {
      self.playSourceKey = playSourceKey;
    };

    const setLayoutInLoadArea = layoutInLoadArea => {
      self.layoutInLoadArea = layoutInLoadArea;
    };

    return {
      setPlaySource,
      setLayoutInLoadArea
    };
  });

export const initializeStore = (isServer, snapshot = null) => {
  if (isServer) {
    store = Store.create({});
  }
  if ((store as any) === null) {
    store = Store.create({});
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  unprotect(store);

  return store;
};
