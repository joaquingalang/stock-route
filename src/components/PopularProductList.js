import PopularProductTile from "../components/PopularProductTile"; 

function PopularProductList({popularProducts}) {

    const popularProductsList = popularProducts.map(items => (
        <PopularProductTile rank={items.rank} name={items.name} quantity={items.quantity}></PopularProductTile>
    ));

    return (
        <div className="col-span-4 row-span-4">
            <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                <div className="px-6 py-4">
                    <h1 className="font font-semibold text-lg mb-5">Most Popular Products</h1>

                    {popularProductsList}
                </div>

            </div>
        </div>
    );
}

export default PopularProductList;