function CategoryButton({icon, onClick, isSelected}) {
    let selected = isSelected ? "bg-[#E08A83] border border-2 border-red-500" : "bg-white";
    return (
        <div onClick={() => onClick()} className={"p-5 mr-3 rounded-md shadow-2xl cursor-pointer " + selected}>
            <img src={icon} className="w-8"/>
        </div>
    );
}

export default CategoryButton;