import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import DealsCard from './DealsCard'
import sanityClient, { urlFor } from '../sanity';

const Deals = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        sanityClient
            .fetch(
                `
      *[_type == "deals"]
    `
            )
            .then((data) => {
                setDeals(data);
            })
            .catch((err) => {
                console.log("Err from Deals:", err);
            });
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >

            {/* Deals Card */}

            {deals?.map((deals) => (
                <DealsCard
                    key={deals._id}
                    imgUrl={urlFor(deals.image).url()}
                    title={deals.name}
                />
            ))}

        </ScrollView>
    )
}

export default Deals;