import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "sonner";
import { useGetUserQuery } from "./store/apis/userApi";
import LoadingSpinner from "./components/LoadingSpinner";

const Custom = ({children}) => {
  const {isLoading} = useGetUserQuery();
  // const isLoading = true
  return <>
    {isLoading ? <LoadingSpinner/> : <>{children}</>}
  </>
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Custom>
      <App />
      <Toaster />
      </Custom>
    </Provider>
  </StrictMode>
);
