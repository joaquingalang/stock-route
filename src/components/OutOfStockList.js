import OutOfStockTile from "./OutOfStockTile";

function OutOfStockList({outOfStockItems}) {

    const outOfStockList = outOfStockItems.map(items => (
        <div>
            <OutOfStockTile name={items.name} timestamp={items.updated_at || items.created_at}></OutOfStockTile>
            <hr className="mx-6 m-2 bg-[#D9D9D9] h-px border-none"></hr>
        </div>
        )
    );

    return (
        <div className="col-span-4 row-span-4">
            <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="font font-semibold text-lg mb-2">Out of Stock</h1>
                    <h1 className="text-sm text-[#293A7A] cursor-pointer">View All</h1>
                </div>

                <hr className="mx-6 mb-2 bg-[#D9D9D9] h-px border-none"></hr>
                {outOfStockList}

                <br></br>

            </div>
        </div>
    );
}

export default OutOfStockList;