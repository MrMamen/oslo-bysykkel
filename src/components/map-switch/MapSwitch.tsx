import * as React from "react";

interface MapViewProps {
  mapView: boolean;
  setMapView: (b:boolean)=>void
}

export const MapSwitch: React.FC<MapViewProps> = ({mapView, setMapView}) =>{
return <div style={{display: "inline-block"}}>
  <span className="clickable" onClick={() => setMapView(false)}>Se tabell 📋 </span><label
  className="switch">
  <input type="checkbox" checked={mapView}/>
  <span className="slider" onClick={() => setMapView(!mapView)}></span>
</label><span className="clickable" onClick={() => setMapView(true)}> 🗺️ Se kart</span>
</div>

}