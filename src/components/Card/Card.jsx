import { useNavigate } from "react-router-dom";
import s from "./Card.module.css";

export const Card = ({ imageUrl, name, id }) => {
  const navigate = useNavigate();

  return (
    <div className={s.card}>
      <div className={s.cardLeft}>
        <img src={imageUrl} alt="profile image" />
      </div>
      <div className={s.cardRight}>
        <div
          className={s.name}
          role="button"
          onClick={() => {
            navigate(`/user/${name}`);
          }}
        >
          {name}
        </div>
        <div className={s.id}>
          User Id <span className={s.dot}>·</span> {id}
        </div>
      </div>
    </div>
  );
};
