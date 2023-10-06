import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewAverage } from "@/util/calculateReviewAverage";
import fullstar from "../../../public/icons/full-star.png";
import emptystar from "../../../public/icons/empty-star.png";
import halfstar from "../../../public/icons/half-star.png";

function Stars({ reviews, rating }: { reviews: Review[]; rating?: number }) {
  const reviewRating = rating || calculateReviewAverage(reviews);

  const renderStar = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const differnce = parseFloat((reviewRating - i).toFixed(1));

      if (differnce >= 1) stars.push(fullstar);
      else if (differnce < 1 && differnce > 0) {
        if (differnce <= 0.2) stars.push(emptystar);
        else if (differnce > 0.2 && differnce <= 0.6) stars.push(halfstar);
      } else stars.push(emptystar);
    }

    return stars.map((star) => (
      <Image src={star} alt="" className="w-4 h-4 mr-1 " />
    ));
  };

  return <div className="flex">{renderStar()}</div>;
}

export default Stars;
