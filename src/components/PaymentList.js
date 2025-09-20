import PaymentTile from "./PaymentTile";

function PaymentList({payments, onNavigate}) {

    const paymentList = payments.map(items => (
        <PaymentTile 
            key={items.id}
            id={items.id} 
            name={items.name} 
            cost={items.cost}
            onNavigate={onNavigate}
        />
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