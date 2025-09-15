import OrderList from "../components/OrderList";
import OrderTrackerPanel from "../components/OrderTrackerPanel";
import PaymentList from "../components/PaymentList";
import PopularProductTile from "../components/PopularProductTile";

function ProductsPage() {
    return (
        <div className="col-span-16 h-screen">
            <div className="grid grid-cols-16">

                {/* Main Dashboard */}
                <div className="col-span-12">
                    <div className="m-6">
                        
                        <h1 className="font font-semibold text-lg mb-2">Friday, August 22 2025</h1>
                        
                        <div className="grid grid-cols-12 grid-rows-12 gap-5">
                            
                            <OrderTrackerPanel newOrders={11} totalOrders={31} inProgress={9}></OrderTrackerPanel>

                            <OrderList></OrderList>

                            <PaymentList></PaymentList>

                        </div>

                    </div>

                </div>

                {/* Right Sidebar */}

                <div className="col-span-4">
                    <div className="my-6 ml-0 mr-6">
                        
                        <h1 className="font font-semibold text-lg mb-2 text-transparent user-select-none">Friday</h1>

                        <div className="grid grid-cols-4 grid-rows-12 gap-6 user-select-none cursor-none ">
                            <button className="bg-[#D72A1D] rounded-md col-span-4 row-span-1 shadow-2xl">
                                <div className="flex justify-center items-center p-4">
                                    <h1 className="text-lg font-semibold text-white pr-5">+</h1>
                                    <h1 className="text-lg font-semibold text-white">Create New Product</h1>
                                </div>
                            </button>

                            <div className="col-span-4 row-span-4">
                                <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                                    <div className="px-6 py-4">
                                        <h1 className="font font-semibold text-lg mb-2">Most Popular Products</h1>

                                        <PopularProductTile rank={1} name={"Cool Awesome Product"} quantity={"12"}></PopularProductTile>
                                        <PopularProductTile rank={2} name={"Hollow Knight Silksong"} quantity={"8"}></PopularProductTile>
                                        <PopularProductTile rank={3} name={"Death Note"} quantity={"4"}></PopularProductTile>

                                    </div>

                                </div>
                            </div>

                            <div className="col-span-4 row-span-4">
                                <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                                    <div className="px-6 py-4">
                                        <h1 className="font font-semibold text-lg mb-2">Out of Stock</h1>
                                    </div>

                                </div>
                            </div>


                        </div>

                    </div>
                </div>




            </div>
        </div>
    );
}

export default ProductsPage;