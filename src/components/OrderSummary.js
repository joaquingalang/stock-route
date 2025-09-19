function OrderSummary({onOrder, subtotal}) {

    // formatter for PHP currency
    const currencyFormatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    let taxAmount = subtotal * 0.12;

    return (
        <div className="bg-white rounded-xl shadow-2xl mt-4">
            <div className="px-6 py-4">

                <p className="text-xl font-semibold mb-3">Order Summary</p>

                <div className="flex justify-between mb-2">
                    <p className="font-semibold text-gray-500">Subtotal</p>
                    <p className="font-semibold">{currencyFormatter.format(subtotal)}</p>
                </div>

                <div className="flex justify-between mb-2">
                    <p className="font-semibold text-gray-500">Tax (12%)</p>
                    <p className="font-semibold">{currencyFormatter.format(taxAmount)}</p>
                </div>

                <div className="flex justify-between mb-2">
                    <p className="font-semibold">Total Amount</p>
                    <p className="font-semibold">{currencyFormatter.format(subtotal + taxAmount)}</p>
                </div>

                <hr className="my-4 bg-[#D9D9D9] h-px border-none"></hr>

                <div className="bg-[#EA948D] rounded-lg w-full flex justify-center items-center cursor-pointer">
                    <p className="text-white font-semibold py-3">Order Now</p>
                </div>

            </div>

        </div>
    );
}

export default OrderSummary;