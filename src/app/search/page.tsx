import Navbar from "../components/Navbar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";

function searchPage() {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <Sidebar />

        <div className="w-5/6">
          <RestaurantCard />
        </div>
      </div>
    </>
  );
}

export default searchPage;
