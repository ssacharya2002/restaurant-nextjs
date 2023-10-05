import RestaurantsPrice from "@/app/components/RestaurantsPrice";
import { Location, PRICE, Region } from "@prisma/client";
import Link from "next/link"

interface restaurantProp {
  location: Location
  region:Region
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
}

function RestaurantCard({restaurant}: {restaurant:restaurantProp}) {
  return (
    <div className="border-b flex pb-5">
    <img
      src={restaurant.main_image}
      alt=""
      className="w-44 rounded"
    />
    <div className="pl-5">
      <h2 className="text-3xl">{restaurant.name}</h2>
      <div className="flex items-start">
        <div className="flex mb-2">*****</div>
        <p className="ml-2 text-sm">Awesome</p>
      </div>
      <div className="mb-9">
        <div className="font-light flex text-reg">
          <p className="mr-4">
            <RestaurantsPrice price={restaurant.price} />
          </p>
          <p className="mr-4">{restaurant.region.name}</p>
          <p className="mr-4">{restaurant.location.name}</p>
        </div>
      </div>
      <div className="text-red-600">
        
        <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
      </div>
    </div>
  </div>
  )
}

export default RestaurantCard
