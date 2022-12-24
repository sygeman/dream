// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, useCallback, useContext, useState } from 'react';
import Script from 'next/script';
import type ymaps, { Map } from 'yandex-maps';

export type YMapsApi = typeof ymaps;

type MountedMapsContextValue = {
  yamapAPI: YMapsApi;
  apiIsReady: boolean;
  maps: { [id: string]: Map };
  onMapMount: (map: Map, id: string) => void;
  onMapUnmount: (id: string) => void;
};

export const MountedMapsContext = createContext<MountedMapsContextValue>(null);

export const MapProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const yamapAPI = window['ymaps'] as YMapsApi;
  const [maps, setMaps] = useState<{ [id: string]: Map }>({});
  const [apiIsReady, setApiIsReady] = useState<boolean>(false);

  const onMapMount = useCallback((map: Map, id = 'default') => {
    setMaps((currMaps) => {
      if (id === 'current') {
        throw new Error("'current' cannot be used as map id");
      }
      if (currMaps[id]) {
        throw new Error(`Multiple maps with the same id: ${id}`);
      }
      return { ...currMaps, [id]: map };
    });
  }, []);

  const onMapUnmount = useCallback((id = 'default') => {
    setMaps((currMaps) => {
      if (currMaps[id]) {
        const nextMaps = { ...currMaps };
        delete nextMaps[id];
        return nextMaps;
      }
      return currMaps;
    });
  }, []);

  return (
    <MountedMapsContext.Provider
      value={{ yamapAPI, apiIsReady, maps, onMapMount, onMapUnmount }}
    >
      <Script
        src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
        onLoad={() => {
          console.log('Script has loaded');
          setApiIsReady(true);
        }}
      />
      {props.children}
    </MountedMapsContext.Provider>
  );
};

export const useMap = () => {
  const map = useContext(MountedMapsContext);
  return map;
};
