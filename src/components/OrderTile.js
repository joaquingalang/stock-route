import checkIcon from "../assets/check_icon.png";
import clockIcon from "../assets/clock_icon.png";
import completedIcon from "../assets/completed_icon.png";

function OrderTile({id, title, quantity, status}) {

    let statusText = "";
    let statusBg = "";
    let statusTextColor = "";
    let statusIcon = "";

    function setStatusDetails() {
        let cleaned = status.toLowerCase();
        switch (cleaned) {
            case "ready":
                statusText = "Ready";
                statusBg = "bg-[#60A32D]";
                statusTextColor = "text-[#3C7B0C]";
                statusIcon = checkIcon;
                break;
            case "progress":
                statusText = "In Progress";
                statusBg = "bg-[#CCD042]";
                statusTextColor = "text-[#7B6A0C]";
                statusIcon = clockIcon;
                break;
            case "completed":
                statusText = "Completed";
                statusBg = "bg-[#6C7EC2]";
                statusTextColor = "text-[#293A7A]";
                statusIcon = completedIcon;
                break;
        }   
    }

    setStatusDetails();

    return (
        <div className="flex justify-between mb-3">
            <div className="flex">
                <div className="w-12 h-12 rounded-md bg-red-300 flex justify-center items-center mr-5">
                    <h1 className="text-sm font-bold">{"E" + id}</h1>
                </div>

                <div className="flex flex-col justify-between">
                    <h1 className="text-sm font-semibold">{title}</h1>
                    <h1 className="text-xs mb-2">{quantity + " Items"}</h1>
                </div>
            </div>

            <div className={statusBg + " rounded-md my-2"}>
                <div className="flex justify-center items-center h-[100%] mx-2">
                    <img src={statusIcon} className="mr-1"/>
                    <h1 className={statusTextColor + " text-xs font-semibold"}>{statusText}</h1>
                </div>
            </div>

        </div>
    );
}

export default OrderTile;