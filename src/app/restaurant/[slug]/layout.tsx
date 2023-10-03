import { Metadata } from "next";
import Header from "./menu/components/Header";



export default function RestaurantLauout({
  children,
  params
}: {
  children: React.ReactNode;
  params :{slug:string}
}) {
  return (
    <>
      <Header slug={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
}
