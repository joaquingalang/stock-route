import OrderTile from "./OrderTile";

function OrderList({orders}) {

    const orderList = orders.map(items => (
        <OrderTile id={items.id} name={items.name} quantity={items.quantity} status={items.status}></OrderTile>
    ));

    return (
        <div className="col-span-6 row-span-10">
            <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                <div className="px-6 py-4">
                    <h1 className="font font-semibold text-lg mb-2">Order List</h1>

                    {orderList}
                    

                </div>

            </div>
        </div>
    );
}

export default OrderList;