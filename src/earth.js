import React from 'react';
import {Button} from '@material-ui/core';
import {withStore} from './store';
import { Viewer, Entity, BillboardGraphics, PolylineGraphics, LabelGraphics } from "resium";
import { Cartesian3, ArcGisMapServerImageryProvider, HorizontalOrigin, VerticalOrigin, Color, Cartesian2 } from "cesium";
import TLEJS from 'tle.js';
import SatIcon from './satellite.png';
import facility from './facility.png';

const tlejs = new TLEJS();
const esri = new ArcGisMapServerImageryProvider({
	url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
});

class Earth extends React.Component {

	state = {
		positions: []
	}

	render() {

		const m03 = ["O3B M003", "1 40079U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00004", "2 40079   0.0450   4.6685 0004527  98.0686 350.6900  5.00116002    03"];
		const m08 = ["O3B M008", "1 40082U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00008", "2 40082   0.0439 359.5224 0003777  69.4430 344.3100  5.00116184    03"];
		const m10 = ["O3B M010", "1 40348U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00003", "2 40348   0.0454  12.5393 0001793  84.2505 276.7670  5.00116018    08"];
		const m11 = ["O3B M011", "1 40349U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00004", "2 40349   0.0443  15.2305 0001929  64.0838 254.9646  5.00115866    07"];
		const m01 = ["O3B M001", "1 39191U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00007", "2 39191   0.0437  18.6218 0004115  40.4459 235.6604  5.00116031    05"];
		const m09 = ["O3B M009", "1 40351U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00007", "2 40351   0.0453  15.8745 0002144  72.9547 165.3686  5.00115711    08"];
		const m12 = ["O3B M012", "1 40350U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00006", "2 40350   0.0437  13.9807 0002498  61.5706 138.1250  5.00115631    06"];
		const m07 = ["O3B M007", "1 40080U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00006", "2 40080   0.0439   2.1324 0003030  86.9786  86.0646  5.00115574    00"];
		const m06 = ["O3B M006", "1 40081U 000000   17159.56250000  .00000000  00000-0  00000-0 0 00007", "2 40081   0.0444   3.6159 0003414  90.5417  39.8381  5.00115075    05"];
		
		const m03_latlon = tlejs.getSatelliteInfo(m03)
		const m03_heights = m03_latlon.height * 1000
		let m03_track = tlejs.getGroundTrackLngLat(m03);
		let m03_positions = m03_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m03_heights));

		const m08_latlon = tlejs.getSatelliteInfo(m08)
		const m08_heights = m08_latlon.height * 1000
		let m08_track = tlejs.getGroundTrackLngLat(m08);
		let m08_positions = m08_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m08_heights));
		
		const m10_latlon = tlejs.getSatelliteInfo(m10)
		const m10_heights = m10_latlon.height * 1000
		let m10_track = tlejs.getGroundTrackLngLat(m10);
		let m10_positions = m10_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m10_heights));

		const m11_latlon = tlejs.getSatelliteInfo(m11)
		const m11_heights = m11_latlon.height * 1000
		let m11_track = tlejs.getGroundTrackLngLat(m11);
		let m11_positions = m11_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m11_heights));

		const m01_latlon = tlejs.getSatelliteInfo(m01)
		const m01_heights = m01_latlon.height * 1000
		let m01_track = tlejs.getGroundTrackLngLat(m01);
		let m01_positions = m01_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m01_heights));

		const m09_latlon = tlejs.getSatelliteInfo(m09)
		const m09_heights = m09_latlon.height * 1000
		let m09_track = tlejs.getGroundTrackLngLat(m09);
		let m09_positions = m09_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m09_heights));

		const m12_latlon = tlejs.getSatelliteInfo(m12)
		const m12_heights = m12_latlon.height * 1000
		let m12_track = tlejs.getGroundTrackLngLat(m12);
		let m12_positions = m12_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m12_heights));

		const m07_latlon = tlejs.getSatelliteInfo(m07)
		const m07_heights = m07_latlon.height * 1000
		let m07_track = tlejs.getGroundTrackLngLat(m07);
		let m07_positions = m07_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m07_heights));

		const m06_latlon = tlejs.getSatelliteInfo(m06)
		const m06_heights = m06_latlon.height * 1000
		let m06_track = tlejs.getGroundTrackLngLat(m06);
		let m06_positions = m06_track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], m06_heights));
	
		const {store} = this.props;
		const tracking = store.get('tracking') || [];
		return(<div>
			<Button style={{zIndex: 1}} variant="contained" onClick={() => {
				this.props.store.set('drawerOpen', true);
			}} autoFocus={true}>Satellites</Button>
			<div id="credit"></div>

				<Viewer full timeline={true} animation={true} infoBox={true} 
					creditContainer={"credit"} imageryProvider={esri} navigationHelpButton={true}
					vrButton={false} homeButton={false} geocoder={true}>
						
					{tracking.map((o) => 
						{
							
							const tleArr = [o.line1, o.line2];
							const latlng = tlejs.getSatelliteInfo(tleArr);
							const heights = latlng.height * 1000
							
							let track = tlejs.getGroundTrackLngLat(tleArr);
							let positions = track[1].map(arr => Cartesian3.fromDegrees(arr[0], arr[1], heights));
				
							return	<Entity name={o.name}  position={Cartesian3.fromDegrees(latlng.lng, latlng.lat, heights)}>
										<LabelGraphics text={o.name} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} />
										<BillboardGraphics image={SatIcon} scale={0.1}/>
										<Entity><PolylineGraphics positions={positions} material={Color.DARKGOLDENROD}/></Entity>
									</Entity>
							
						})
					}	
					
						<Entity name={tlejs.getSatelliteName(m03)} position={Cartesian3.fromDegrees(m03_latlon.lng, m03_latlon.lat, m03_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m03)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m03_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m08)} position={Cartesian3.fromDegrees(m08_latlon.lng, m08_latlon.lat, m08_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m08)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m08_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m10)} position={Cartesian3.fromDegrees(m10_latlon.lng, m10_latlon.lat, m10_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m10)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m10_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m11)} position={Cartesian3.fromDegrees(m11_latlon.lng, m11_latlon.lat, m11_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m11)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m11_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m01)} position={Cartesian3.fromDegrees(m01_latlon.lng, m01_latlon.lat, m01_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m01)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m01_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m09)} position={Cartesian3.fromDegrees(m09_latlon.lng, m09_latlon.lat, m09_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m09)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m09_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m12)} position={Cartesian3.fromDegrees(m12_latlon.lng, m12_latlon.lat, m12_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m12)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m12_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m07)} position={Cartesian3.fromDegrees(m07_latlon.lng, m07_latlon.lat, m07_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m07)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m07_positions} material={Color.DARKGOLDENROD}/></Entity>
						<Entity name={tlejs.getSatelliteName(m06)} position={Cartesian3.fromDegrees(m06_latlon.lng, m06_latlon.lat, m06_heights)} description="space Station"><BillboardGraphics image={SatIcon} scale={0.1}/><LabelGraphics text={tlejs.getSatelliteName(m06)} horizontalOrigin={HorizontalOrigin.LEFT} VerticalOrigin={VerticalOrigin.TOP} scale={0.5} pixelOffset={new Cartesian2(-10, 25)} /></Entity>
						<Entity><PolylineGraphics positions={m06_positions} material={Color.DARKGOLDENROD}/></Entity>

					<Entity
							name="Ground Station Dallas"
							position={Cartesian3.fromDegrees(-100,30)}
							description="Ground Station"
      				><BillboardGraphics image={facility} scale={0.05}/>
					  </Entity>
				</Viewer>
			</div>
		)
	}
}

export default withStore(Earth);