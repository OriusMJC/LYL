import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

export default function SimpleMap(){
    // const position = [-32.961479878536544, -60.65046720982142]

  return (
        <MapContainer
			center={[-32.961479878536544, -60.65046720982142]}
			zoom={15}
			scrollWheelZoom={true}
			style={{ height: "500px", width: "50vw"}}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[-32.961479878536544, -60.65046720982142]}>
                <Popup>
                    L&L Automotores!
                </Popup>
            </Marker>
		</MapContainer>
  );
}