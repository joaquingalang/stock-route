import { useEffect, useState } from "react";
import OrderList from "../components/OrderList";
import OrderTrackerPanel from "../components/OrderTrackerPanel";
import PaymentList from "../components/PaymentList";
import PopularProductList from "../components/PopularProductList";
import OutOfStockList from "../components/OutOfStockList";

function DashboardPage() {

    const [newOrders, setNewOrders] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [inProgress, setInProgress] = useState(0);

    const [orderList, setOrderList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    let [popularProductList, setPopularProductList] = useState([]);
    let [outOfStockList, setOutOfStockList] = useState([]);

    useEffect(() => {
        // Order Panel
        setNewOrders(11);
        setTotalOrders(31);
        setInProgress(9);

        // Order List
        let orders = [
            {
                id: 78,
                name: "XBOX 360",
                quantity: 5,
                status: "ready"
            },
            {
                id: 14,
                name: "XBOX 360",
                quantity: 5,
                status: "ready"
            },
            {
                id: 19,
                name: "XBOX 360",
                quantity: 5,
                status: "ready"
            },
        ];
        setOrderList(orders);

        // Payment List
        let payments = [
            {
                id: 78,
                name: "Shrek 5 DVD",
                orderId: "DH3095",
            },
            {
                id: 23,
                name: "Air Jordans",
                orderId: "AL1035",
            },
        ];
        setPaymentList(payments);

        // Popular Product List
        let popularProducts = [
            {
                rank: 1,
                name: "Cool Awesome Product",
                quantity: 12,
            },
            {
                rank: 2,
                name: "Hollow Knight Silksong",
                quantity: 8,
            },
            {
                rank: 3,
                name: "Death Note",
                quantity: 4,
            },
        ];
        setPopularProductList(popularProducts);

        // Out Of Stock List
        let outOfStockItems = [
            {
                name: "Aquaflask",
                timestamp: "4:00 PM",
            },
            {
                name: "Samsuing Galaxy A13",
                timestamp: "11:30 AM",
            },
            {
                name: "Lava Lamp",
                timestamp: "2:26 AM",
            },
            {
                name: "Umbrella",
                timestamp: "1:13 AM",
            },
        ];
        setOutOfStockList(outOfStockItems);
    });

    return (
        <div className="col-span-16 h-screen">
            <div className="grid grid-cols-16">

                {/* Main Dashboard */}
                <div className="col-span-12">
                    <div className="m-6">
                        
                        <h1 className="font font-semibold text-lg mb-2">Friday, August 22 2025</h1>
                        
                        <div className="grid grid-cols-12 grid-rows-12 gap-5">
                            
                            <OrderTrackerPanel newOrders={newOrders} totalOrders={totalOrders} inProgress={inProgress}></OrderTrackerPanel>

                            <OrderList orders={orderList}></OrderList>

                            <PaymentList payments={paymentList}></PaymentList>

                        </div>

                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="col-span-4">
                    <div className="my-6 ml-0 mr-6">
                        
                        <h1 className="font font-semibold text-lg mb-2 text-transparent user-select-none cursor-default">Friday</h1>

                        <div className="grid grid-cols-4 grid-rows-12 gap-6">
                            
                            <button className="bg-[#D72A1D] rounded-md col-span-4 row-span-1 shadow-2xl cursor-pointer">
                                <div className="flex justify-center items-center p-4">
                                    <h1 className="text-lg font-semibold text-white pr-5">+</h1>
                                    <h1 className="text-lg font-semibold text-white">Create New Product</h1>
                                </div>
                            </button>

                            <PopularProductList popularProducts={popularProductList}></PopularProductList>

                            <OutOfStockList outOfStockItems={outOfStockList}></OutOfStockList>


                        </div>

                    </div>
                </div>




            </div>
        </div>
    );
}

export default DashboardPage;