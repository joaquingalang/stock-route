function OutOfStockTile({name="Product Name", timestamp="12:00 AM"}) {
    return (
        <div className="px-6">
            <h1 className="text-sm font-semibold">{name}</h1>
            <h1 className="text-sm font-light">Last Update: <span className="text-[#293A7A] font-bold">{timestamp}</span></h1>
        </div>
    );
}

export default OutOfStockTile;