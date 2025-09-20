import { useEffect, useState } from "react";
import OrderList from "../components/OrderList";
import OrderTrackerPanel from "../components/OrderTrackerPanel";
import PaymentList from "../components/PaymentList";
import PopularProductList from "../components/PopularProductList";
import OutOfStockList from "../components/OutOfStockList";
import NewProductModal from "../components/NewProductModal";
import { 
  getDashboardMetrics, 
  getOrderList, 
  getPaymentList, 
  getPopularProducts, 
  getOutOfStockItems 
} from "../services/DashboardService";

function DashboardPage({ onNavigate }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newOrders, setNewOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  const [orderList, setOrderList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [popularProductList, setPopularProductList] = useState([]);
  const [outOfStockList, setOutOfStockList] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all dashboard data in parallel
        const [
          metricsResult,
          orderListResult,
          paymentListResult,
          popularProductsResult,
          outOfStockResult
        ] = await Promise.all([
          getDashboardMetrics(),
          getOrderList(10),
          getPaymentList(),
          getPopularProducts(),
          getOutOfStockItems()
        ]);

        // Set metrics
        if (metricsResult.data) {
          setNewOrders(metricsResult.data.newOrders);
          setTotalOrders(metricsResult.data.totalOrders);
          setInProgress(metricsResult.data.inProgress);
        }

        // Set order list
        if (orderListResult.data) {
          setOrderList(orderListResult.data);
        }

        // Set payment list
        if (paymentListResult.data) {
          setPaymentList(paymentListResult.data);
        }

        // Set popular products
        if (popularProductsResult.data) {
          setPopularProductList(popularProductsResult.data);
        }

        // Set out of stock items
        if (outOfStockResult.data) {
          setOutOfStockList(outOfStockResult.data);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="col-span-16 h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="col-span-16 h-screen overflow-y-auto">
      <div className="grid grid-cols-16">
        {/* Main Dashboard */}
        <div className="col-span-12">
          <div className="mt-6 ml-10 mr-6">
            <h1 className="font font-semibold text-lg mb-2">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h1>

            <div className="grid grid-cols-12 grid-rows-12 gap-5">
              <OrderTrackerPanel
                newOrders={newOrders}
                totalOrders={totalOrders}
                inProgress={inProgress}
              />

              <OrderList orders={orderList} />

              <PaymentList payments={paymentList} onNavigate={onNavigate} />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4">
          <div className="my-6 ml-0 mr-6">
            <h1 className="font font-semibold text-lg mb-2 text-transparent select-none cursor-default">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
            </h1>

            <div className="grid grid-cols-4 grid-rows-12 gap-6">
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