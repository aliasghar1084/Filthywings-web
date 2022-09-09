import {
    StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView, Dimensions, StatusBar,
} from 'react-native';
import React from 'react';
import {

    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_800ExtraBold,
    Raleway_900Black,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light_Italic,
    Raleway_400Regular_Italic,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black_Italic,
} from '@expo-google-fonts/raleway';
import { styles } from '../stylesheet';
import { useFonts } from 'expo-font';
import * as Progress from 'react-native-progress';
export default function Loading(props) {
    let [fontsLoaded] = useFonts({
        Raleway_100Thin,
        Raleway_200ExtraLight,
        Raleway_300Light,
        Raleway_400Regular,
        Raleway_500Medium,
        Raleway_600SemiBold,
        Raleway_700Bold,
        Raleway_800ExtraBold,
        Raleway_900Black,
        Raleway_100Thin_Italic,
        Raleway_200ExtraLight_Italic,
        Raleway_300Light_Italic,
        Raleway_400Regular_Italic,
        Raleway_500Medium_Italic,
        Raleway_600SemiBold_Italic,
        Raleway_700Bold_Italic,
        Raleway_800ExtraBold_Italic,
        Raleway_900Black_Italic,
        "MonumentExtended-Regular": require("../assets/fonts/MonumentExtended-Regular.otf"),
        "MonumentExtended-Ultrabold": require("../assets/fonts/MonumentExtended-Ultrabold.otf")
    });
    const MyStatusBar = ({ backgroundColor, ...props }) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );
    return (
        <ImageBackground
            source={require('../assets/Tenders.png')}
            resizeMode="cover" style={styles.imageLoading}>
            <MyStatusBar
                backgroundColor="black"
                barStyle="light-content" // Here is where you change the font-color
            />
            <Text style={styles.loadload}>
                LOADING
            </Text>
            <Text style={styles.loadFilth}>
                YOUR FILTH
            </Text>
            <Progress.Bar progress={props.progress} color={'#FFFFFF'} width={234} />
        </ImageBackground>

    );
}

