import ShoppingBagIcon from "../assets/shopping_bag_icon.png";
import InboxIcon from "../assets/inbox_icon.png";
import GiftIcon from "../assets/gift_icon.png";
import CoffeeIcon from "../assets/coffee_icon.png";
import CategoryButton from "../components/CategoryButton";
import QuinCover from "../assets/quin_cover.png";
import KyleCover from "../assets/kyle_cover.png";
import AaronCover from "../assets/aaron_cover.png";
import LaineCover from "../assets/laine_cover.png";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import DetailedProductCard from "../components/DetailedProductCard";

function ProductsPage() {


    const [selectedCategory, setSelectedCategory] = useState("shopping");
    
    const [productList, setProductList] = useState([]);
    const [isProductSelected, setIsProductSelected] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() => {
        let products = [
            {
                image: QuinCover,
                name: "Joaquin Galang",
                id: "1024",
                desc: "Goofy ass looking dumdum that likes DND and bully people.",
                quantity: 3,
                category: "clothes",
                costPrice: 12,
                sellPrice: 20,
                createdAt: "2025-08-05",
                updatedAt: "2025-08-20",
            },
            {
                image: KyleCover,
                name: "Adrian Mariano",
                id: "2078",
                desc: "Racist in his own heritage, likes people with down syndrome and TFT.",
                quantity: 5,
                category: "clothes",
                costPrice: 12,
                sellPrice: 20,
                createdAt: "2025-08-05",
                updatedAt: "2025-08-20",
            },
            {
                image: AaronCover,
                name: "Aaron Francisco",
                id: "5093",
                desc: "Cute Guy that has on a crush on Henry Cavill and is obsessed with body builders",
                quantity: 12,
                category: "clothes",
                costPrice: 12,
                sellPrice: 20,
                createdAt: "2025-08-05",
                updatedAt: "2025-08-20",
            },
            {
                image: LaineCover,
                name: "Ellaine Gonzales",
                id: "2035",
                desc: "Wala cute lang.",
                quantity: 0,
                category: "clothes",
                costPrice: 12,
                sellPrice: 20,
                createdAt: "2025-08-05",
                updatedAt: "2025-08-20",
            },
        ];
        setProductList(products);
    });

    const onProductSelect = (product) => {
        setIsProductSelected(true);
        setSelectedProduct(product);
    }

    const products = productList.map(items => (<ProductCard onClick={() => onProductSelect(items)} image={items.image} name={items.name} id={items.id} desc={items.desc} quantity={items.quantity}></ProductCard>));

    return (
        <div className="col-span-16 px-10 pt-8 bg-[#EAEAEA]">
            <p className="text-2xl font-semibold">Categories</p>

            <div className="flex mt-3 mb-5">
                <CategoryButton onClick={() =>setSelectedCategory("shopping")} icon={ShoppingBagIcon} isSelected={selectedCategory === "shopping"}></CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory("inbox")} icon={InboxIcon} isSelected={selectedCategory === "inbox"}></CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory("gift")} icon={GiftIcon} isSelected={selectedCategory === "gift"}></CategoryButton>
                <CategoryButton onClick={() => setSelectedCategory("coffee")} icon={CoffeeIcon} isSelected={selectedCategory === "coffee"}></CategoryButton>
            </div>

            <p className="text-2xl font-semibold">Products</p>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-3">
                <div className={"grid gap-8" +(isProductSelected ? " col-span-2 grid-cols-2" : " col-span-3 grid-cols-3")}>
                {products}
                </div>

                {isProductSelected && (
                <div className="relative">
                    <DetailedProductCard
                    onClose={() => setIsProductSelected(false)}
                    image={selectedProduct.image}
                    name={selectedProduct.name}
                    id={selectedProduct.id}
                    desc={selectedProduct.desc}
                    quantity={selectedProduct.quantity}
                    costPrice={selectedProduct.costPrice}
                    sellPrice={selectedProduct.sellPrice}
                    createdAt={selectedProduct.createdAt}
                    updatedAt={selectedProduct.updatedAt}
                    />
                </div>
                )}
            </div>

            <br/>
            <br/>


        </div>
    );
}

export default ProductsPage;