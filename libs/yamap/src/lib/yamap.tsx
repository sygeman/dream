import { useContext, useEffect } from 'react';
import { MountedMapsContext } from './provider';

/* eslint-disable-next-line */
export interface MapProps {
  id: string;
  options?: ymaps.IMapOptions;
  children?: React.ReactNode;
  defaultState?: ymaps.IMapState;
}

export function Map(props: MapProps) {
  const { yamapAPI, apiIsReady, onMapMount } = useContext(MountedMapsContext);

  useEffect(() => {
    if (apiIsReady) {
      yamapAPI.ready(() => {
        const myMap = new yamapAPI.Map(
          props.id,
          {
            controls: [],
            ...props.defaultState,
          },
          props.options
        );

        onMapMount(myMap, props.id);
      });
    }
  }, [apiIsReady]);

  return (
    <div id={props.id} style={{ width: '100%', height: '100%' }}>
      {props.children}
    </div>
  );
}

export default Map;
