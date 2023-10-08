
import Image from "next/image";
import errorSrc from "../../../public/icons/error.png";

function NotFoundPage({ error }: { error: Error }) {
  return (
    <div className="h-screen flex flex-col justify-center bg-gray-200 items-center">
      <Image src={errorSrc} alt="" className="w-56 mb-8" />

      <div className="bg-white px-9 py-14 shadow rounded ">
        <h3 className="text-3xl font-bold">Well, this is not good</h3>
        <h3 className="text-xl font-bold">an error occured</h3>
        <p className="mt-6 text-sm font-light">404</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
