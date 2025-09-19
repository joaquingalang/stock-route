import { useState } from "react";
import SideNavigationMenu from "../components/SideNavigationMenu";
import ApprovalsPage from "./ApprovalsPage";
import DashboardPage from "./DashboardPage";
import OrdersPage from "./OrdersPage";
import ProductsPage from "./ProductsPage";
import CreateOrderPage from "./CreateOrderPage";
import WarehousePage from "./WarehousePage";
import BillingPage from "./BillingPage";

function MainPage() {

    const [selectedPage, setSelectedPage] = useState("dashboard");

    function handleNavigation(page) {
        setSelectedPage(page);
    }

    function currentPage() {
        switch (selectedPage) {
            case "dashboard":
                return <DashboardPage></DashboardPage>;
            case "products":
                return <ProductsPage></ProductsPage>;
            case "orders":
                return <BillingPage></BillingPage>;
        }
    }

    return (
        <div className="grid grid-cols-20">
            <div className="col-span-4"></div>
            <SideNavigationMenu currentPage={selectedPage} onClick={handleNavigation}></SideNavigationMenu>
            
            {/* <CreateOrderPage></CreateOrderPage> */}

            {currentPage()}
            
            {/* <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>
            <h1>6</h1>
            <h1>7</h1>
            <h1>8</h1>
            <h1>9</h1>
            <h1>10</h1>
            <h1>11</h1>
            <h1>12</h1>
            <h1>13</h1>
            <h1>14</h1>
            <h1>15</h1>
            <h1>16</h1>
            <h1>17</h1>
            <h1>18</h1>
            <h1>19</h1>
            <h1>20</h1> */}
        </div>
    );
}

export default MainPage;