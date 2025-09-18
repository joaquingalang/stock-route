
function OrderTrackerPanel({newOrders=0, totalOrders=0, inProgress=0}) {
    return (
        <div className="col-span-12 row-span-2">
            <div className="bg-[#FFFFFF] rounded-md shadow-2xl">
                <div className="flex justify-between items-center px-12 py-5">
                    
                    <div className="flex flex-col justify-center items-center">
                        <div className="relative">
                            <div className="w-2 h-2 bg-[#D72A1D] rounded-md absolute top-0 left-7"></div>
                            <h1 className="font font-semibold text-3xl mb-1">{newOrders}</h1>
                        </div>
                        <p className="font font-semibold text-lg">New Orders</p>
                    </div>

                    <div class="border-l-2 border-gray-300 h-10"></div>
                    
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font font-semibold text-3xl mb-1">{totalOrders}</h1>
                        <p className="font font-semibold text-lg">Total Orders</p>
                    </div>

                    <div class="border-l-2 border-gray-300 h-10"></div>

                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font font-semibold text-3xl mb-1">{inProgress}</h1>
                        <p className="font font-semibold text-lg">In Progress</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderTrackerPanel;