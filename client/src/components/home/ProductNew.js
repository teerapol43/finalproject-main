import React, { useEffect, useState } from "react";
import { listProductBy } from "../../functions/product";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard";

const ProductNew = () => {
    const [product, setProduct] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const res = await listProductBy(4, "createAt", "asc");
            setProduct(res.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="row">
                {loading ? <LoadingCard count={4} />
                    : product.map((item) => (
                        <ProductCard key={item._id} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductNew;
