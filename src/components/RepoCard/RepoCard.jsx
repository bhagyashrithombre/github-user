import { Eye, GitFork, Star } from "@phosphor-icons/react";
import s from "./RepoCard.module.css";

export const RepoCard = ({ name, watchers, forks, star, url, homepage }) => {
  const redirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={s.card}>
      <div className={s.repoName} role="button" onClick={() => redirect(url)}>
        {name}
      </div>
      <div className={s.detailsWrapper}>
        <div className={s.detail}>
          {watchers} <Eye />
        </div>
        <div className={s.detail}>
          {forks} <GitFork />
        </div>
        <div className={s.detail}>
          {star}
          <Star />
        </div>
      </div>
      {homepage && (
        <div className={s.url} onClick={() => redirect(homepage)}>
          {homepage}
        </div>
      )}
    </div>
  );
};
