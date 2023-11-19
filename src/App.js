import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { client } from "./api/api.service";
import { Header } from "./components/header/Header";
import { CartProvider } from "./providers/CartProvider";
import { RoutesComp } from "./RoutesComp";
import store from "./store";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Header />
        <RoutesComp />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
