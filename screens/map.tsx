import { ExpoLeaflet } from "expo-leaflet";
import * as Location from "expo-location";
import { LatLngLiteral } from "leaflet";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { MapLayer, MapMarker } from "expo-leaflet";
import { useDataLayerValue } from "../DataLayer";
import { actionTypes } from "../Reducer";

const mapLayers: Array<MapLayer> = [
  {
    attribution:
      '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    baseLayerIsChecked: true,
    baseLayerName: "OpenStreetMap",
    layerType: "TileLayer",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  // { baseLayerIsChecked: true, baseLayer: true, baseLayerName: 'Mapbox', layerType: 'TileLayer', url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2hlcmVzbXl3YXZlcyIsImEiOiJjanJ6cGZtd24xYmU0M3lxcmVhMDR2dWlqIn0.QQSWbd-riqn1U5ppmyQjRw`, },
];

const mapOptions = {
  attributionControl: false,
  zoomControl: Platform.OS === "web",
};

const initialPosition = { lat: 51.4804063, lng: -0.1758172 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  header: {
    height: 60,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  mapControls: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 5,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: "absolute",
    right: 0,
  },
  mapButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  mapButtonEmoji: {
    fontSize: 28,
  },
});

export default function Map({ navigation }) {
  const [{ locationState }, dispatch] = useDataLayerValue();
  const [checkZip, setCheckZip] = useState(false);
  const [zoom, setZoom] = useState(7);
  const [ownPosition, setOwnPosition] = useState<null | LatLngLiteral>(null);
  const [mapCenterPosition, setMapCenterPosition] = useState(initialPosition);
  const [mypostcode, setMyps] = useState('');
  const [marked, setMarked] = useState<LatLngLiteral>({
    lat: null,
    lng: null,
  });
  const mapMarker: MapMarker[] = [
    {
      id: "1",
      position: { lat: marked.lat, lng: marked.lng },
      icon: "📍",
    },
  ];

  const [postCode, setPostCode] = useState({});
  const [getLocation, setLocation] = useState(false)
  const getPostCode = async (latitude, longitude) => {
    let data = await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )
      .then((res) => {
        if (!res.data.error) {
          if (res.data.address.postcode) {
            AsyncStorage.setItem("postcode", res.data.address.postcode);
          } else {
            return Alert.alert(`Area Selected does not have any PostCode`);
          }
          AsyncStorage.getItem("postcode").then((item) => {
            dispatch({
              type: actionTypes.SET_POSTCODE,
              postcode: item,
            });
          });
          setLocation(true)
          setMyps(res.data.address.postcode);
        } else {
        }
      });
  };

  useEffect(() => {
    if (!ownPosition) {
      const getLocationAsync = async () => {
        var { status } = await Location.requestForegroundPermissionsAsync();
        if ({ status }.status !== "granted") {
          console.warn("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});

        if (!ownPosition) {
          setOwnPosition({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        }
        setPostCode(
          getPostCode(location.coords.latitude, location.coords.longitude)
        );
      };

      getLocationAsync().catch((error) => {
        console.error(error);
      });
    }
  }, []);
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <MyStatusBar
        backgroundColor="black"
        barStyle="light-content"// Here is where you change the font-color
      />
      <View style={{ flex: 15, }}>
        <ExpoLeaflet
          loadingIndicator={() => <ActivityIndicator />}
          mapCenterPosition={mapCenterPosition}
          mapLayers={mapLayers}
          mapMarkers={mapMarker}
          mapOptions={mapOptions}
          // mapShapes={mapShapes}
          maxZoom={20}
          onMessage={(message: any) => {
            switch (message.tag) {
              case "onMapMarkerClicked":
                Alert.alert(
                  `Map Marker Touched, ID: ${message.mapMarkerId || "unknown"
                  }`
                );
                break;
              case "onMapClicked":
                getPostCode(message.location.lat, message.location.lng);
                setMarked({
                  lat: message.location.lat,
                  lng: message.location.lng,
                });

                break;
              case "onMoveEnd":
                setMapCenterPosition(message.mapCenter);
                setZoom(message.zoom);
                break;
              case "onZoomEnd":
                break;
              default:
                if (["onMove"].includes(message.tag)) {
                  return;
                }
            }
          }}
          zoom={zoom}
        ></ExpoLeaflet>


      </View>

      {mypostcode ?
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F2C400",
            width: "100%",
            height: 41,
          }}
          onPress={() => {
            navigation.navigate("CollectYourFilth", { postcode: mypostcode });
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontFamily: "MonumentExtended-Regular",
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>

        : <View></View>}

      {mypostcode ? <View style={{ flex: 0.1 }}></View> : <View></View>}
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F2C400",
          width: "100%",
          height: 41,
        }}
        onPress={() => {
          setZoom(17);
          setMapCenterPosition(ownPosition);
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "black",
            fontFamily: "MonumentExtended-Regular",
          }}
        >
          Get location
        </Text>
      </TouchableOpacity>
      <TouchableOpacity

        style={{ height: 10, width: 10, zIndex: 30, position: "absolute" }}
        hitSlop={{ top: 500, bottom: 50, left: 50, right: 50 }}
        onPress={() => navigation.navigate("CollectYourFilth")}
      >
        <Image

          style={{
            borderRadius: 50,
            height: 30,
            width: 30,
            zIndex: 30,
            position: "absolute",
            top: 35,
            left: 15,
            backgroundColor: 'black'
          }}
          source={require("../assets/BackIcon.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
