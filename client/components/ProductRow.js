import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const ProductRow = ({
    id,
    name,
    description,
    price,
    image
}) => {

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

    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItemFromBasket = () => {

        if (!items.length > 0) return;

        dispatch(removeFromBasket({ id }));
    };

    console.log(items)

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`} style={styles.viewClass} >
                <View className="flex-row">
                    <View className="flex-1 pr-2">

                        <Text className="text-md font-bold mb-1 text-[#361c00]">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Currency quantity={price} currency="BDT" />
                        </Text>

                    </View>
                    <View>
                        <Image
                            style={{

                                resizeMode: "contain",

                            }}
                            source={{ uri: urlFor(image).url() }}
                            className="h-20 w-20 bg-gray-300"
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity
                            disabled={!items.length}
                            onPress={removeItemFromBasket}
                        >
                            <MinusCircleIcon
                                color={items.length > 0 ? "#ef8700" : "gray"}
                                size={40}
                            />
                        </TouchableOpacity>
                        <Text>{items?.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon

                                color="#ef8700"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default ProductRow;