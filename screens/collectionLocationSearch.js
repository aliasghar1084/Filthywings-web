import React from 'react';
import { styles } from '../stylesheet';
import { Text, View, Image, TouchableOpacity, ImageBackground, TextInput, StatusBar, SafeAreaView } from 'react-native';
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);
export default function CollectionLocationSearch({ navigation }) {
    return (
        <View>
            <MyStatusBar
                backgroundColor="black"
                barStyle="light-content" // Here is where you change the font-color
            />
            <ImageBackground resizeMode="cover" source={require('../assets/Tenders.png')} style={styles.image2}>

                <Image style={styles.blurImage} source={require('../assets/blurTenders.png')}></Image>
                <View style={styles.gap9}>
                    <TouchableOpacity><Image style={styles.backicon} source={require('../assets/BackIcon.png')}></Image></TouchableOpacity>

                    <View style={styles.align}>
                        <Image style={[styles.logo1, styles.gap10]} source={require('../assets/LogoWhite.png')}></Image>
                        <Text style={[styles.header, styles.gap11]}>collect your filth</Text>
                    </View>
                    <View style={styles.gap8}>
                        <Text style={styles.inputLabel2}>Enter Your Postcode</Text>
                        <TextInput style={[styles.postcodeinput, styles.gap6]} placeholder='e.g B12 34A'></TextInput>
                    </View>
                    <View style={[styles.flexrow2, styles.gap8]}>
                        <View style={[styles.line, styles.gap3]}></View>
                        <Text style={styles.trackYourOrderButton}>or</Text>
                        <View style={[styles.line, styles.gap4]}></View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("CollectionLocation", {})} style={[styles.useLocation, styles.gap8]}>
                        <Text style={styles.payNow}>use my location previous</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View>
    );
}