import { useParams } from "react-router-dom";
import { useGetGameQuery } from "__generated__";
import Loading from "components/loading/loading";
import "./style.scss";

function GamePage() {
  const { id = "" } = useParams();

  const { data, loading } = useGetGameQuery({
    variables: { id },
  });

  const { title, platform, averageRating, reviews = [] } = data?.game || {};

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h3>Game title: {title}</h3>
          <p>Platform: {platform}</p>
          <p>Rating: {averageRating}</p>
          <div>
            Reviews:
            <div className="review-box">
              {reviews.map(review => {
                return (
                  <div className="review-item" key={review.id}>
                    <p>
                      Author: {review.author.name} ({review.author.verified ? "Verified" : "Unverified"})
                    </p>
                    <p>Rating: {review.rating}</p>
                    <p>Content: {review.content}</p>
                    <div className="author-reviews-box">
                      <p>Author's other reviews:</p>
                      {review.author.reviews.map(review => {
                        return (
                          <div className="author-review-item" key={review.id}>
                            <h4>
                              Game: {review.game.title}
                              {review.game.id === id && "*"}
                            </h4>
                            <p>Rating: {review.rating}</p>
                            <p>Content: {review.content}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GamePage;
