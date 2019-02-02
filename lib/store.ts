import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  unprotect
} from 'mobx-state-tree';

let store: IStore = null as any;

const Modal = types.model({
  id: types.string
});

const Store = types
  .model({
    playSourceKey: '',
    layoutInLoadArea: false,
    gridCountOnRow: 0,
    gridWidth: 0,
    leftMenuIsOpen: true,
    allBlured: false,
    modals: types.map(Modal)
  })
  .actions(self => {
    const setPlaySource = playSourceKey => {
      self.playSourceKey = playSourceKey;
    };

    const setLayoutInLoadArea = layoutInLoadArea => {
      self.layoutInLoadArea = layoutInLoadArea;
    };

    const setGridData = (gridCountOnRow, gridWidth) => {
      self.gridCountOnRow = gridCountOnRow;
      self.gridWidth = gridWidth;
    };

    const leftMenuTrigger = (isOpen?: boolean) => {
      self.leftMenuIsOpen =
        typeof isOpen === 'boolean' ? isOpen : !self.leftMenuIsOpen;
    };

    const setAllBlured = (allBlured: boolean) => {
      self.allBlured = allBlured;
    };

    return {
      setPlaySource,
      setLayoutInLoadArea,
      setGridData,
      leftMenuTrigger,
      setAllBlured
    };
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

  unprotect(store);

  return store;
};

export { initializeStore, IStore, IStoreSnapshotIn, IStoreSnapshotOut };
