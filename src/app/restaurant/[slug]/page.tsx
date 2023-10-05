import { PrismaClient, Review } from "@prisma/client";
import RestaurantNavbar from "./components/RestaurantNavbar";
import RestaurantTitle from "./components/RestaurantTitle";
import RestaurantRating from "./components/RestaurantRating";
import RestaurantDescription from "./components/RestaurantDescription";
import RestaurantImages from "./components/RestaurantImages";
import ReviewCard from "./components/ReviewCard";

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
  reviews: Review[];
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
      reviews: true,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};

async function restaurantPage({ params }: props) {
  console.log(params.slug);

  const restaurant = await fetchRestaurant(params.slug);

  return (
    <>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNavbar slug={restaurant.slug} />

          <RestaurantTitle title={restaurant.name} />

          <RestaurantRating reviews={restaurant.reviews} />

          <RestaurantDescription description={restaurant.description} />

          <RestaurantImages images={restaurant.images} />

          <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
              What {restaurant.reviews.length}{" "}
              {restaurant.reviews.length === 1 ? "person" : "people"} are saying
            </h1>
            <div>
              {/* REVIEW CARD */}
             {restaurant.reviews.map((review)=>(
               <ReviewCard review={review}  key={review.id}/>
             ))}n 
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
