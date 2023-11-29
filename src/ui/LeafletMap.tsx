import styled from "styled-components";
import Heading from "./Heading";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface LocationProps {
  position: [number, number];
  name: string;
}

const StyledLocation = styled.div`
  margin: 3rem 0;
  height: 30rem;
  & .map {
    height: 100%;
  }
`;

function Location({ position, name }: LocationProps) {
  return (
    <StyledLocation>
      <Heading as="h3">Where this place is</Heading>

      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </StyledLocation>
  );
}
export default Location;
