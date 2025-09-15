import OrderTile from "./OrderTile";

function OrderList() {
    return (
        <div className="col-span-6 row-span-10">
            <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                <div className="px-6 py-4">
                    <h1 className="font font-semibold text-lg mb-2">Order List</h1>

                    <OrderTile id={28} title={"XBOX 360"} quantity={5} status={"ready"}></OrderTile>
                    

                </div>

            </div>
        </div>
    );
}

export default OrderList;