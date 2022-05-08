import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json";

let pays = [];

const MapChart = ({ inputValue }) => {
    return (
        <>
        <ComposableMap className="map" data-tip="" projectionConfig={{ scale: 200 }}>
            <ZoomableGroup >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => {
                        let color = "#D6D6DA"
                        if(inputValue === geo.properties.ISO_A3) {
                            pays.push(geo.properties.ISO_A3)
                        }
                        if(pays.includes(geo.properties.ISO_A3)){
                            color = "red"
                        }
                        return (<Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                                default: {
                                    fill: color,
                                    outline: "none"
                                },
                                hover: {
                                    fill: color,
                                    outline: "none"
                                },
                                pressed: {
                                    fill: color,
                                    outline: "none"
                                }
                            }}
                        />
                        )
                    })
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
        </>
  );
};

export default memo(MapChart);
