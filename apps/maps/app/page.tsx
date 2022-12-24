'use client';

import { MapProvider, Map, useMap } from '@dream/yamap';

const NavigateButton = () => {
  const {
    maps: { map },
  } = useMap();

  const onClick = () => {
    map.setCenter([55.76, 37.64]);
  };

  return (
    <button
      className="py-1 px-2 bg-white text-slate-800 rounded text-lg"
      onClick={onClick}
    >
      Reset
    </button>
  );
};

export function Index() {
  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden">
      <MapProvider>
        <Map
          id="map"
          defaultState={{
            center: [55.751574, 37.573856],
            zoom: 5,
          }}
          options={{
            suppressMapOpenBlock: true,
            suppressObsoleteBrowserNotifier: true,
          }}
        >
          <div className="absolute bottom-10 left-2 z-10">
            <NavigateButton />
          </div>
          {/* <Balloon position={[55.684758, 37.738521]}>

          </Balloon> */}
        </Map>
      </MapProvider>
    </div>
  );
}

export default Index;
