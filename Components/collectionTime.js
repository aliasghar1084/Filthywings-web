import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, navigation } from 'react-native';
import { styles } from '../stylesheet';
export default function CollectionTime({ navigation }) {
    const [collectionTime, setCollectionTime] = React.useState({
        title: "730"
    });
    return (
        <View style={{ alignItems: 'center' }}>
            <View key={Math.random()} style={[styles.infoSet3, { width: '100%' }]}>
                <Text style={styles.orderInfoText3}>{collectionTime.title}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Details", { collectionTime: collectionTime.title })} >
                    <Text style={styles.selectTime}>select</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
