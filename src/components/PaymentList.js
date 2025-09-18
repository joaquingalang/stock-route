import PaymentTile from "./PaymentTile";

function PaymentList({payments}) {

    const paymentList = payments.map(items => (
        <PaymentTile id={items.id} name={items.name} orderId={items.orderId}></PaymentTile>
    ));

    return (
        <div className="col-span-6 row-span-10">
            <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                <div className="px-6 py-4">
                    <h1 className="font font-semibold text-lg mb-2">Payment</h1>

                    {paymentList}

                </div>

            </div>
        </div>
    );
}

export default PaymentList;