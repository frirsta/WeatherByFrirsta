import Weather from "./components/Weather";

const api = {
  key: process.env.REACT_APP_API_KEY,
};
function App() {
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;
