import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
    StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import ProductRow from '../components/ProductRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setShop } from "../features/shopSlice";

const ShopScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { params: {
        id,
        imgUrl,
        title,
        products,
    }
    } = useRoute();

    useEffect(() => {
        dispatch(
            setShop({
                id,
                imgUrl,
                title,
                products,
            })
        );
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
    console.log(title)

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className='relative'>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        className="w-full h-56 bg-gray-300 p-4"
                    />
                    <TouchableOpacity onPress={navigation.goBack} className="absolute top-12 left-3 p-2 bg-gray-300 rounded-full opacity-80">
                        <ArrowLeftIcon size={20} color="#9e110bff" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className='px-4 pt-4 py-2'>
                        <Text className="text-3xl font-bold">{title}</Text>

                    </View>
                </View>
                <View className="pb-36">
                    <Text className="px-4 pt-4 mb-3 font-bold text-xl">
                        All Products
                    </Text>
                    {/* Products */}
                    {products.map(product => (
                        <ProductRow
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            description={product.short_description}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default ShopScreen;