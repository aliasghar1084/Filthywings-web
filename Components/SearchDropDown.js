
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';

export default function SearchDropDown({ dataSource, data, onPress }) {
  const set1 = (item) => {
    data = item
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
      }}>

      <View style={{
        width: '100%',
        backgroundColor: '#ffffff',

        flexWrap: 'wrap',


      }}>
        {
          dataSource.length ?

            dataSource.map(item => {
              return (
                <TouchableOpacity onPress={() => set1(item)} style={{
                  backgroundColor: 'white',
                  height: 30,
                  width: '90%',
                  marginBottom: 10,
                  justifyContent: 'center',
                  borderRadius: 4,
                }}>
                  <Text style={{
                    color: 'black',
                    paddingHorizontal: 10,
                  }}>{item}</Text>
                </TouchableOpacity>
              );
            })

            :
            <View
              style={{
                alignSelf: 'center',
                height: 100,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              }}>
              <Text style={{
                fontFamily: 'Raleway_400Regular',
                fontSize: 16,
                color: '#000000'
              }}>No search items matched</Text>
            </View>
        }

      </View>
    </TouchableOpacity >

  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  subContainer: {
    width: '100%',
    backgroundColor: '#ffffff',

    flexWrap: 'wrap',


  },
  itemView: {
    backgroundColor: 'white',
    height: 30,
    width: '90%',
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  itemText: {
    color: 'black',
    paddingHorizontal: 10,
  },
  noResultView: {
    alignSelf: 'center',
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  noResultText: {
    fontFamily: 'Raleway_400Regular',
    fontSize: 16,
    color: '#000000'
  },

});