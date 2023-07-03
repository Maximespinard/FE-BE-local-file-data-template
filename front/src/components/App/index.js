import { useState } from "react";
import { Header } from "../Header";
import { Map } from "../Map";
import { SignIn } from "../SignIn";

function App() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <Header handleSignInClick={handleSignInClick} />
      <Map />
      {isSignInModalOpen && <SignIn handleSignInClose={handleSignInClose} />}
    </>
  );
}

export default App;
