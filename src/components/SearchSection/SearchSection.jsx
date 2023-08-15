import s from "./SearchSection.module.css";

export const SearchSection = ({ setUsername, username, handleFetch }) => {
  return (
    <div className={s.root}>
      <input
        type="text"
        className={s.inputField}
        autoFocus
        placeholder="Search by username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className={s.btn} onClick={() => handleFetch()}>
        Search
      </button>
    </div>
  );
};
