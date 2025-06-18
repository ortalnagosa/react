import { Header } from "./components/Navbar/Header";
import Flex, { Aligns, FlexDirectionTypes } from "./types/Flex";
import Footer from "./components/Footer/footer";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./Routes";

const App = () => {
  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.BETWEEN}
      items={Aligns.BETWEEN}
      className=" bg-green-100 dark:bg-slate-700"
    >
      <Header />

      <AppRoutes />

      <Footer />
      <ToastContainer />
    </Flex>
  );
};

export default App;
