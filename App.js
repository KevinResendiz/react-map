import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import Mapview,{Marker,Polyline} from 'react-native-maps';
import react, * as React from 'react';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import {GoogleMap} from "@env";

export default function App() {
  const[IsChoosingSource, setIsChoosingSource]= React.useState(false);
  const[IsChoosingDestination, setIsChoosingDestination]= React.useState(false);





  const [origin,setOrigin]=React.useState({
    latitude: 32.436087, 

    longitude: -114.759567
  });
  const [destination,setDestination]=React.useState({
    latitude: 32.449849, 
    longitude:-114.758752 ,
  });

  React.useEffect(()=>{
    getLocationPermission();
  },[])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }

  const showCoordinates=()=>{
    console.log(origin,destination);
  };



  const handleMapPress=(e)=>{
    const coordinates=e.nativeEvent.coordinate
    if(IsChoosingSource){
      setOrigin(coordinates);
      setIsChoosingSource(false);
    }else if (IsChoosingDestination){
      setDestination(coordinates);
      setIsChoosingDestination(false);
    }
  };

  return (
    <View style={styles.container}>
      <Mapview style={styles.map}
      onPress={handleMapPress}
      initialRegion={{
        latitude:origin.latitude,
        longitude: origin.longitude,
        latitudeDelta:0.09,
        longitudeDelta:0.04


      }}
      >
        
        <Marker
        draggable
        coordinate={origin}
        onDragEnd={(direction)=>setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
        draggable
        coordinate={destination}
        onDragEnd={(direction)=>setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections style={styles.carImage}
        origin={origin}
        destination={destination}
        apikey={GoogleMap}
        strokeColor='pink'
        strokeWidth={8}
        />
        {/* 
        <Polyline
        coordinates={[origin, destination]}
        strokeColor='pink'
        strokeWidth={8}
        /> */}

      </Mapview>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonGroup}>
          <Button
          title={IsChoosingSource ? 'please choose source': 'choose'}
          onPress={()=>setIsChoosingSource(true)}
          />
          <Button
          title={IsChoosingDestination ? 'please choose destination': 'choose destination'}
          onPress={()=>setIsChoosingDestination(true)}
          />

        </View>
        <Button title="show coordinates" onPress={showCoordinates}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width:'100%',
    height:'100%'
  },
  carImage:{
    width:"120",
    height:"120"
  },
  buttonContainer:{
    position:"absolute",
    bottom:20,
    left:20,
    right:20,
  },
  buttonGroup:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10,
  }
});
