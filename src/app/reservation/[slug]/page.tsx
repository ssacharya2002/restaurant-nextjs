import Navbar from "@/app/components/Navbar";
import Header from "./components/Header";
import Form from "./components/Form";

const reservationPage = () => {
  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header />

          <Form />
        </div>
      </div>
    </>
  );
};

export default reservationPage;
