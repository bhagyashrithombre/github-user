import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./Profile.module.css";
import { RepoCard } from "../RepoCard/RepoCard";

export const Profile = () => {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  const handleFetchUser = async () => {
    const url = `https://api.github.com/users/${username}`;

    const response = await fetch(url);

    const responseJson = await response.json();

    setUser(responseJson);

    const responseRepo = await fetch(responseJson.repos_url);

    const responseRepoJson = await responseRepo.json();

    setRepos(responseRepoJson);
  };

  const redirect = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <div className={s.root}>
      {user && (
        <>
          <div className={s.left}>
            <div className={s.profileImage}>
              <img src={user.avatar_url} alt="profile image" />
            </div>
            <div className={s.nameWrapper}>
              <div className={s.name}>{user.name}</div>
              <div
                className={s.username}
                button="role"
                onClick={() => redirect(user.html_url)}
              >
                {user.login}
              </div>
            </div>
            <div className={s.bio}>{user.bio}</div>
            <div className={s.connectionWrapper}>
              <span className={s.connectionCount}>{user.followers} </span>
              Followers
              <span className={s.connectionCount}> · </span>
              <span className={s.connectionCount}>{user.following} </span>
              Followings
            </div>
          </div>
          <div className={s.right}>
            {repos.length > 0 ? (
              <div className={s.cardWrapper}>
                {repos.map((item) => {
                  return (
                    <RepoCard
                      name={item.name}
                      watchers={item.watchers}
                      forks={item.forks}
                      star={item.stargazers_count}
                      url={item.html_url}
                      homepage={item.homepage}
                    />
                  );
                })}
              </div>
            ) : (
              "No repositories"
            )}
          </div>
        </>
      )}
    </div>
  );
};
