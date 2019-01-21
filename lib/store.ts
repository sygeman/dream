import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from 'mobx-state-tree';

let store: IStore = null as any;

const Store = types
  .model({
    playSourceKey: '',
    layoutScrollIsTop: true
  })
  .actions(self => {
    const setPlaySource = playSourceKey => {
      self.playSourceKey = playSourceKey;
    };

    const setLayoutScrollTop = layoutScrollIsTop => {
      self.layoutScrollIsTop = layoutScrollIsTop;
    };

    return { setPlaySource, setLayoutScrollTop };
  });

type IStore = Instance<typeof Store>;
type IStoreSnapshotIn = SnapshotIn<typeof Store>;
type IStoreSnapshotOut = SnapshotOut<typeof Store>;

const initializeStore = (isServer, snapshot = null) => {
  if (isServer) {
    store = Store.create({});
  }
  if ((store as any) === null) {
    store = Store.create({});
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
};

export { initializeStore, IStore, IStoreSnapshotIn, IStoreSnapshotOut };
