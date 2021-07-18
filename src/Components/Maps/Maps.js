import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./maps.css";
import { showDataOnMap } from "../../Utility";


function Maps({ countries, casesType, center, zoom}) {
  return (
    <div className="maps">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {console.log("casesType::", casesType)}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Maps;