import rightArrowIcon from "../assets/right_arrow_icon.png";
import { useRole } from "../hooks/useRole";

function PaymentTile({id, name, cost, onNavigate}) {
    const { roleId } = useRole();
    let idBackgroundColor = id % 2 === 0 ? "bg-[#293A7A]" : "bg-[#E36A61]";

    // Format cost to 2 decimal places
    const formattedCost = cost ? parseFloat(cost).toFixed(2) : "0.00";

    // Handle navigation to billing page
    const handleProcessNow = () => {
        if (onNavigate) {
            onNavigate("billings");
        }
    };

    return (
        <div className="flex justify-between mb-3">
            <div className="flex">
                <div className={"w-12 h-12 rounded-md flex justify-center items-center mr-5 " + idBackgroundColor}>
                    <h1 className="text-sm text-white font-bold">{id}</h1>
                </div>

                <div className="flex flex-col justify-between">
                    <h1 className="text-sm font-semibold">{name}</h1>
                    <h1 className="text-xs mb-2">{"P " + formattedCost}</h1>
                </div>
            </div>

            {roleId === 4 && (
                <div 
                    className="bg-[#E36A61] rounded-md my-2 cursor-pointer"
                    onClick={handleProcessNow}
                >
                    <div className="flex justify-center items-center h-[100%] mx-2">
                        <h1 className="text-white text-sm font-semibold mr-1">Process Now</h1>
                        <img src={rightArrowIcon}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentTile;