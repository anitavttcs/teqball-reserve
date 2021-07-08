import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
	width: '90vw',
	height: '500px'
};

const center = {
	lat: 47.523833,
	lng: 19.044639
};


function Map() {
	return (
		<LoadScript
			googleMapsApiKey=""
		>
			<GoogleMap
				id="overlay-view-example"
				mapContainerStyle={containerStyle}
				center={center}
				zoom={15}
			>
			</GoogleMap>
		</LoadScript>
	)
}

export default React.memo(Map);