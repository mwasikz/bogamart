import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 4,

    },
    elevation: {
        elevation: 30,
        shadowColor: '#52006A',
    },
});

const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
) => {
    if (Platform.OS === 'ios') {
        styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
        };
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
        <View style={[styles.card, styles.boxShadow]}>
            <TouchableOpacity

                onPress={() => {
                    navigation.navigate("Shop", {
                        id,
                        imgUrl,
                        title,
                        products,

                    })
                }}
                className='bg-white shadow-2xl rounded-md'>


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
        </View>
    )
}

export default ShopCard;