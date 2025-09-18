function PopularProductTile({rank=1, image, name="Product Name", quantity=1}) {

    return (
        <div className="flex items-center mb-3">
            <h1 className="font-semibold mr-4">{"0" + rank}</h1>

            <div className="w-12 h-12 rounded-md bg-[#293A7A] flex justify-center items-center mr-5">
                <h1 className="text-sm text-white font-bold">{"E" + rank}</h1>
            </div>

            <div className="flex flex-col justify-between">
                <h1 className="text-sm font-semibold">{name}</h1>
                <h1 className="text-xs mb-2">Total Orders: <span className="font-semibold text-[#293A7A]">{quantity}</span></h1>
            </div>
        </div>
    );
}

export default PopularProductTile;