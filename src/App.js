import { ApolloProvider } from "@apollo/client";
import { client } from "./api/api.service";
import { Header } from "./components/header/Header";
import { CartProvider } from "./providers/CartProvider";
import { RoutesComp } from "./RoutesComp";

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Header />
        <RoutesComp />
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;
