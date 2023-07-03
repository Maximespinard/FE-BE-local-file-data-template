import "./style.css";

export const Header = ({ handleSignInClick }) => {
  return (
    <header>
      <h1>KANTA</h1>
      <button onClick={handleSignInClick}>Connexion</button>
    </header>
  );
};
