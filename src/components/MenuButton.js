function MenuButton({icon, selected=false, children, onClick}) {
    return (
        <button 
            onClick={onClick}
            className={(selected ? "bg-[#293A7A] " : "") + "rounded-lg my-2 w-[100%] cursor-pointer"}
        >
            <div className="flex items-center my-[8px] ml-[25%]">
                <img src={icon} className={(selected ? "invert " : "") + "w-[20px] h-[20px] mr-[22px]"}/>
                <h3 className={(selected ? "text-[#F9F6F0] " : "") + "font font-semibold text-xl"}>{children}</h3>
            </div>
        </button>
    );
}

export default MenuButton;