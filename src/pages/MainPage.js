import SideNavigationMenu from "../components/SideNavigationMenu";
import DashboardPage from "./DashboardPage";
import ProductsPage from "./ProductsPage";

function MainPage() {
    return (
        <div className="grid grid-cols-20">
            <div className="col-span-4"></div>
            <SideNavigationMenu></SideNavigationMenu>
            <ProductsPage></ProductsPage>
            {/* <DashboardPage></DashboardPage> */}
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