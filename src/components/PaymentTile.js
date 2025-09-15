import rightArrowIcon from "../assets/right_arrow_icon.png";

function PaymentTile({id, title, orderNum}) {

    return (
        <div className="flex justify-between mb-3">
            <div className="flex">
                <div className="w-12 h-12 rounded-md bg-red-300 flex justify-center items-center mr-5">
                    <h1 className="text-sm font-bold">{"E" + id}</h1>
                </div>

                <div className="flex flex-col justify-between">
                    <h1 className="text-sm font-semibold">{title}</h1>
                    <h1 className="text-xs mb-2">{"#" + orderNum}</h1>
                </div>
            </div>

            <div className="bg-[#E5746C] rounded-md my-2">
                <div className="flex justify-center items-center h-[100%] mx-2">
                    <h1 className="text-white text-sm font-semibold mr-1">Process Now</h1>
                    <img src={rightArrowIcon}/>
                </div>
            </div>

        </div>
    );
}

export default PaymentTile;