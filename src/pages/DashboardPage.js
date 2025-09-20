import { useEffect, useState } from "react";
import OrderList from "../components/OrderList";
import OrderTrackerPanel from "../components/OrderTrackerPanel";
import PaymentList from "../components/PaymentList";
import PopularProductList from "../components/PopularProductList";
import OutOfStockList from "../components/OutOfStockList";
import NewProductModal from "../components/NewProductModal";

function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const [newOrders, setNewOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  const [orderList, setOrderList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [popularProductList, setPopularProductList] = useState([]);
  const [outOfStockList, setOutOfStockList] = useState([]);

  useEffect(() => {
    // Order Panel
    setNewOrders(11);
    setTotalOrders(31);
    setInProgress(9);

    // Order List
    setOrderList([
      { id: 78, name: "XBOX 360", quantity: 5, status: "ready" },
      { id: 14, name: "XBOX 360", quantity: 5, status: "ready" },
      { id: 19, name: "XBOX 360", quantity: 5, status: "ready" },
    ]);

    // Payment List
    setPaymentList([
      { id: 78, name: "Shrek 5 DVD", orderId: "DH3095" },
      { id: 23, name: "Air Jordans", orderId: "AL1035" },
    ]);

    // Popular Product List
    setPopularProductList([
      { rank: 1, name: "Cool Awesome Product", quantity: 12 },
      { rank: 2, name: "Hollow Knight Silksong", quantity: 8 },
      { rank: 3, name: "Death Note", quantity: 4 },
    ]);

    // Out Of Stock List
    setOutOfStockList([
      { name: "Aquaflask", timestamp: "4:00 PM" },
      { name: "Samsung Galaxy A13", timestamp: "11:30 AM" },
      { name: "Lava Lamp", timestamp: "2:26 AM" },
      { name: "Umbrella", timestamp: "1:13 AM" },
    ]);
  }, []); // ✅ runs only once on mount

  return (
    <div className="col-span-16 h-screen overflow-y-auto">
      <div className="grid grid-cols-16">
        {/* Main Dashboard */}
        <div className="col-span-12">
          <div className="mt-6 ml-10 mr-6">
            <h1 className="font font-semibold text-lg mb-2">
              Friday, August 22 2025
            </h1>

            <div className="grid grid-cols-12 grid-rows-12 gap-5">
              <OrderTrackerPanel
                newOrders={newOrders}
                totalOrders={totalOrders}
                inProgress={inProgress}
              />

              <OrderList orders={orderList} />

              <PaymentList payments={paymentList} />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4">
          <div className="my-6 ml-0 mr-6">
            <h1 className="font font-semibold text-lg mb-2 text-transparent select-none cursor-default">
              Friday
            </h1>

            <div className="grid grid-cols-4 grid-rows-12 gap-6">
              {/* Create Product Button */}
              

              <PopularProductList popularProducts={popularProductList} />

              <OutOfStockList outOfStockItems={outOfStockList} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <NewProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default DashboardPage;
