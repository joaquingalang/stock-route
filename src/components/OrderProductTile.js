import ProductSample from "../assets/product_sample.png";

function OrderProductTile({onClick, image=ProductSample, name="Product Name", quantity=0, price=0}) {

    // formatter for PHP currency
    const currencyFormatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const isOutOfStock = quantity <= 0;

    return (
        <div className="bg-white shadow-2xl rounded-md">
            <div className="flex flex-col items-center mx-5 my-4">
                <img src={image} className="w-45"/>
                <p className="self-start font-semibold">{name}</p>
                <p className="self-start font-semibold text-sm text-gray-400 mb-2">
                    {quantity} Units Available
                </p>
                <p className="self-start font-semibold text-xl mb-2">{currencyFormatter.format([price])}</p>
                <div 
                    onClick={isOutOfStock ? undefined : onClick} 
                    className={`rounded-lg w-full flex justify-center items-center ${
                        isOutOfStock 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-[#6C7EC2] cursor-pointer'
                    }`}
                >
                    <p className="text-white font-semibold py-3">
                        {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderProductTile;