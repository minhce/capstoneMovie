import "./App.css";
import useRouteElement from "./routes/useRouteElements";

function App() {
  const routeElements = useRouteElement();
  return <>{routeElements}</>;
}

export default App;
