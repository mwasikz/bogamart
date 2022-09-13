import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';

const styles = {
    viewClass: {

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                backgroundColor: 'white'
            },
            android: {
                shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 5,


            },
        }),
    }
};

const ShopCard = ({
    id,
    imgUrl,
    title,
    products,

}) => {

    const navigation = useNavigation();

    return (


        <TouchableOpacity
            style={styles.viewClass}
            onPress={() => {
                navigation.navigate("Shop", {
                    id,
                    imgUrl,
                    title,
                    products,

                })
            }}
            className='bg-white ml-2 rounded-md'>



            <Image

                source={{
                    uri: urlFor(imgUrl).url(),
                }}

                style={{
                    height: 90,
                    width: 90,
                    resizeMode: "contain",
                    borderRadius: 20,

                }}


            />
            <View className='pb-1'>
                <Text className='text-xs pt-1 text-[#361c00] text-center'>{title}</Text>
            </View>

        </TouchableOpacity>


    )
}

export default ShopCard;