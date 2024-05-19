import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a client
const queryClient = new QueryClient({ defaultOptions: {} });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);
