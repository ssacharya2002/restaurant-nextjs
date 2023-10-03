import { PrismaClient } from "@prisma/client";
import RestaurantNavbar from "./components/RestaurantNavbar";
import RestaurnatTitle from "./components/RestaurnatTitle";
import RestaurnatRating from "./components/RestaurnatRating";
import RestaurantDescription from "./components/RestaurantDescription";
import RestaurantImages from "./components/RestaurantImages";

const prisma = new PrismaClient();

interface props {
  params: {
    slug: string;
  };
}

interface RestaurantType {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

const fetchRestaurant = async (slug: string): Promise<RestaurantType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};

async function restaurantPage({ params }: props) {
  const restaurant = await fetchRestaurant(params.slug);

  return (
    <>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          
          <RestaurantNavbar slug={restaurant.slug} />

          <RestaurnatTitle title={restaurant.name} />

          <RestaurnatRating />

          <RestaurantDescription description={restaurant.description} />

          <RestaurantImages images={restaurant.images} />

          <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
              What 100 people are saying
            </h1>
            <div>
              {/* REVIEW CARD */}
              <div className="border-b pb-7 mb-7">
                <div className="flex">
                  <div className="w-1/6 flex flex-col items-center">
                    <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                      <h2 className="text-white text-2xl">MJ</h2>
                    </div>
                    <p className="text-center">Micheal Jordan</p>
                  </div>
                  <div className="ml-10 w-5/6">
                    <div className="flex items-center">
                      <div className="flex mr-5">*****</div>
                    </div>
                    <div className="mt-5">
                      <p className="text-lg font-light">
                        Laurie was on top of everything! Slow night due to the
                        snow storm so it worked in our favor to have more one on
                        one with the staff. Delicious and well worth the money.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* REVIEW CARD */}
            </div>
          </div>
          {/* REVIEWS */}
        </div>
        <div className="w-[27%] relative text-reg">
          <div className="fixed w-[15%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
              <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
              <label htmlFor="">Party size</label>
              <select name="" className="py-3 border-b font-light" id="">
                <option value="">1 person</option>
                <option value="">2 people</option>
              </select>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[48%]">
                <label htmlFor="">Date</label>
                <input type="text" className="py-3 border-b font-light w-28" />
              </div>
              <div className="flex flex-col w-[48%]">
                <label htmlFor="">Time</label>
                <select name="" id="" className="py-3 border-b font-light">
                  <option value="">7:30 AM</option>
                  <option value="">9:30 AM</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
                Find a Time
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */}{" "}
      {/* RESERVATION
    CARD PORTION */}
    </>
  );
}

export default restaurantPage;
