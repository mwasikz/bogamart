import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ShopCard from "./ShopCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, short_description }) => {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        sanityClient
            .fetch(
                `
      *[_type == "categories" && _id == $id] {
        ...,
        shops[]->{
          ...,
          products[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
                { id }
            )
            .then((data) => {
                console.log("shops:", data?.shops);
                setShops(data?.shops);
            })
            .catch((err) => {
                console.log("Err at Featured Row:", err);
            });
    }, [id]);

    return (
        <View>
            <View className="flex-row items-center justify-between px-5 bg-[#F1F1F1]">
                <Text className="font-bold text-sm text-[#361c00]">{title}</Text>

            </View>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                    paddingTop: 10,
                }}
                showsHorizontalScrollIndicator={false}
                className="bg-[#F1F1F1]"
            >
                {/* Shop Cards */}

                {shops?.map((shop, i) => (
                    <ShopCard
                        key={`${shop._id}-${i}`}
                        id={shop._id}
                        imgUrl={shop.image}
                        title={shop.name}
                        products={shop.products}


                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default FeaturedRow;