import PaymentTile from "./PaymentTile";

function PaymentList() {
    return (
        <div className="col-span-6 row-span-10">
            <div className="bg-[#FFFFFF] h-[100%] rounded-md shadow-2xl">

                <div className="px-6 py-4">
                    <h1 className="font font-semibold text-lg mb-2">Order List</h1>

                    <PaymentTile id="47" title={"Skateboard"} orderNum={2054}></PaymentTile>

                </div>

            </div>
        </div>
    );
}

export default PaymentList;