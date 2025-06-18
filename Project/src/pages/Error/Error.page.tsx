import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";

const ErrorPage = () => {
  const navigate = useNavigate();

  const navHome = () => {
    navigate("/");
  };

  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.CENTER}
      items={Aligns.CENTER}
      className="min-h-screen px-4 text-center"
    >
      <h1 className="mt-12 text-3xl font-bold md:text-5xl">404!!!!</h1>
      <p className="my-10 text-xl font-semibold md:text-3xl">Page not found</p>
      <Button onClick={navHome} className="text-base md:text-xl">
        Go Home
      </Button>
    </Flex>
  );
};

export default ErrorPage;
