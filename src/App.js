import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { client } from "./api/api.service";
import { Header } from "./components/header/Header";
import { RoutesComp } from "./RoutesComp";
import store from "./store";
import { BackToTopButton } from "./atoms/BackToTop/BackToTopButton";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Header />
        <RoutesComp />
        <BackToTopButton />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
