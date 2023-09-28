import Navbar from "@/app/components/Navbar";

import RestaurantNavbar from "./components/RestaurantNavbar";
import Menu from "./components/Menu";
import Card from "@/app/components/Card";
import Header from "./components/Header";

function page() {
  return (
    <>

        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavbar />
          <Menu />
        </div>
    </>
  );
}

export default page;
