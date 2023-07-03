import "./style.css";

export const SignIn = ({ handleClose }) => {
  return (
    <div className="signIn-modal">
      <div className="signIn-modal--content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Connexion</h2>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};
