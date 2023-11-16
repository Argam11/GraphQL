import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_GAME } from "apollo/games";
import Loading from "components/loading/loading";

import "./style.scss";

function GamePage() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { id }
  });

  const { title, platform, averageRating, reviews } = data?.game || {};

  console.log('data', data);

  return <>{loading ? <Loading /> : <div>
    <h3>Game title: {title}</h3>
    <p>Platform: {platform}</p> 
    <p>Rating: {averageRating}</p> 
    <div>Reviews:

      <div className="review-box">
        {reviews.map((review: any) => {
          return (
            <div className="review-item">
              <p>Content: {review}</p>
            </div>
          )
        })}
      </div>
    </div>
  
  </div>}</>;
}

export default GamePage;
