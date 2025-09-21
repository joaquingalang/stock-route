import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import { useAuth } from "../contexts/AuthContext";
import LogoImg from "../assets/logo_img.png"; 
import BigEllipsis from "../assets/big_ellipsis.png"; 
import SmallEllipsis from "../assets/small_ellipsis.png";

function SplashScreenPage() {
  const navigate = useNavigate();

return (
  <div className="min-h-screen flex items-center justify-around relative p-4">
    <Background />
    <div className="relative z-10 p-8 sm:p-10 md:p-12 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl transform -translate-y-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8 md:mb-10 text-center font-serif">
        Welcome to Stock Route
      </h1>
      <p className="mb-6 text-xl">
        Easily process, pack, and ship products while keeping everything
        organized in real time. Built for both employees and customers,
        StockRoute ensures faster fulfillment and smarter stock management.
      </p>
      <button  onClick={() => navigate('/signIn')}  className="rounded-md bg-[#293A7A] text-white p-3 font-bold lg:w-120 ">
        Try Stockroute
      </button>
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center transform translate-y-10">
        <img src={BigEllipsis} alt="Ellipsis" className="w-64 h-64 md:w-100 md:h-100" />
        <img src={LogoImg} alt="Logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-50 lg:h-50" />
        <img src={SmallEllipsis} alt="Ellipsis" className="absolute left-10 top-70 transform -translate-x-1/2 w-30 h-30"/>
    </div>
  </div>
);
// ...existing code...
}

export default SplashScreenPage;
