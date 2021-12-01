import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="pageContainer">
      <Header />
      <main className="mainContainer">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
