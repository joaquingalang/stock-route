import rightArrowIcon from "../assets/right_arrow_icon.png";

function PaymentTile({id, name, orderId}) {
    let idBackgroundColor = id % 2 === 0 ? "bg-[#293A7A]" : "bg-[#E36A61]";

    return (
        <div className="flex justify-between mb-3">
            <div className="flex">
                <div className={"w-12 h-12 rounded-md flex justify-center items-center mr-5 " + idBackgroundColor}>
                    <h1 className="text-sm text-white font-bold">{"E" + id}</h1>
                </div>

                <div className="flex flex-col justify-between">
                    <h1 className="text-sm font-semibold">{name}</h1>
                    <h1 className="text-xs mb-2">{"#" + orderId}</h1>
                </div>
            </div>

            <div className="bg-[#E36A61] rounded-md my-2 cursor-pointer">
                <div className="flex justify-center items-center h-[100%] mx-2">
                    <h1 className="text-white text-sm font-semibold mr-1">Process Now</h1>
                    <img src={rightArrowIcon}/>
                </div>
            </div>

        </div>
    );
}

export default PaymentTile;