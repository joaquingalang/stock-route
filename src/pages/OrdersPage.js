import OrderList from "../components/OrderList";
import AllOrdersList from "../components/AllOrdersList";
import OrderTrackerPanel from "../components/OrderTrackerPanel";
import PaymentList from "../components/PaymentList";
import PopularProductTile from "../components/PopularProductTile";

function OrdersPage() {
  return (
    <div className="col-span-16 h-screen">
      <div className="grid grid-cols-16">
        {/* Main Dashboard */}
        <div className="col-span-16">
          <div className="m-6">
            <h1 className="font font-semibold text-lg mb-2">Orders</h1>
            <div className="grid grid-cols-8 grid-rows-8 gap-5">
              <AllOrdersList></AllOrdersList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
