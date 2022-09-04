import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import {
    ArrowLeftIcon,

} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import ProductRow from '../components/ProductRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setShop } from "../features/shopSlice";

const ShopScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

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
                    shadowRadius: 10,
                    elevation: 3,


                },
            }),
        }
    };

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
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className='relative'>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url()
                        }}
                        className="bg-white"
                        style={{
                            height: 200,
                            width: 380,
                            resizeMode: "contain"
                        }}
                    />
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="absolute top-10 left-1 p-5 bg-white rounded-full opacity-80">
                        <ArrowLeftIcon size={20} color="#ef8700" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white" style={styles.viewClass}>
                    <View className='px-4 pt-4 py-2'>
                        <Text className="text-3xl font-bold text-[#361c00]">{title}</Text>

                    </View>
                </View>
                <View className="pb-36">
                    <Text className="px-4 pt-4 mb-3 font-bold text-xl text-[#361c00]">
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