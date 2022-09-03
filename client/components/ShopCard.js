import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';


const ShopCard = ({
    id,
    imgUrl,
    title,
    products,

}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Shop", {
                    id,
                    imgUrl,
                    title,
                    products,

                })
            }}
            className='bg-white shadow-2xl mx-1'>
            <Image

                source={{
                    uri: urlFor(imgUrl).url(),
                }}

                style={{
                    height: 90,
                    width: 90,
                    resizeMode: "contain",
                }}

            />
            <View className='pb-1'>
                <Text className='text-xs pt-1 text-[#361c00] text-center'>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ShopCard;