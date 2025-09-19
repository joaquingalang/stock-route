import { useAuth } from "../contexts/AuthContext";
import MenuButton from "./MenuButton";
import appLogo from "../assets/stock_route_logo.png";
import gridIcon from "../assets/grid_icon.png";
import serverIcon from "../assets/server_icon.png";
import clipboardIcon from "../assets/clipboard_icon.png";
import logoutIcon from "../assets/logout_icon.png";

function SideNavigationMenu() {
    const { signOut } = useAuth();

    const handleLogout = async () => {
        try {
            const { error } = await signOut();
            if (error) {
                console.error('Logout error:', error);
            } else {
                console.log('Logout successful');
            }
        } catch (err) {
            console.error('Unexpected logout error:', err);
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-86 bg-[#FFFFFF] flex flex-col justify-between shadow-[10px_0px_15px_-10px_rgba(0,0,0,0.3)]">

            <div className="flex flex-col items-center">
                <img src={appLogo} className="p-10"/>

                <div className="mx-10">
                    <MenuButton icon={gridIcon} selected={true}>Dashboard</MenuButton>
                    <MenuButton icon={serverIcon}>Products</MenuButton>
                    <MenuButton icon={clipboardIcon}>Orders</MenuButton>
                </div>
            </div>

            <div className="mx-10">
                <MenuButton icon={logoutIcon} onClick={handleLogout}>Logout</MenuButton>
            </div>
        </div>
    );
}

export default SideNavigationMenu;
