import ShoppingBagIcon from "../assets/shopping_bag_icon.png";
import InboxIcon from "../assets/inbox_icon.png";
import GiftIcon from "../assets/gift_icon.png";
import CoffeeIcon from "../assets/coffee_icon.png";
import CategoryButton from "../components/CategoryButton";
import { useEffect, useState } from "react";
import OrderProductTile from "../components/OrderProductTile";
import OrderDetailsList from "../components/OrderDetailsList";
import OrderSummary from "../components/OrderSummary";

function CreateOrderPage() {


    const [selectedCategory, setSelectedCategory] = useState("shopping");

    return (
        <div className="col-span-16 px-10 pt-8 h-full bg-[#EAEAEA]">
            <p className="text-2xl font-semibold">Create Order</p>

            <div className="flex justify-between">

                <div className="flex mt-3 mb-5">
                    <CategoryButton onClick={() =>setSelectedCategory("shopping")} icon={ShoppingBagIcon} isSelected={selectedCategory === "shopping"}></CategoryButton>
                    <CategoryButton onClick={() => setSelectedCategory("inbox")} icon={InboxIcon} isSelected={selectedCategory === "inbox"}></CategoryButton>
                    <CategoryButton onClick={() => setSelectedCategory("gift")} icon={GiftIcon} isSelected={selectedCategory === "gift"}></CategoryButton>
                    <CategoryButton onClick={() => setSelectedCategory("coffee")} icon={CoffeeIcon} isSelected={selectedCategory === "coffee"}></CategoryButton>
                </div>

                <div className="flex self-end mb-4">
                    <p className="text-xl font-semibold mr-2">Customer ID:</p>
                    <div className="bg-white rounded-lg shadow-2xl w-65 flex items-center">
                        <p className="ml-4 text-gray-400 text-sm">E2041-5JA20-3LC42-PL4NM</p>
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-16 gap-6">

                <div className="col-span-11">

                    <div className="grid grid-cols-3 gap-4">

                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>
                        <OrderProductTile></OrderProductTile>

                    </div>

                </div>

                <div className="col-span-5">
                    
                    <OrderDetailsList></OrderDetailsList>

                    <OrderSummary onOrder={() => {}} subtotal={10196}></OrderSummary>

                </div>

            </div>

            <br/>
            <br/>


        </div>
    );
}

export default CreateOrderPage;