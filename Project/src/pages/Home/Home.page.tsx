import { MdAddCircleOutline } from "react-icons/md";
import Cards from "../../components/cards/Cards";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { TRootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreateCard from "../../components/cards/createCards";

const Home = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const [showModal, setShowModal] = useState(false); 
  return (
    <>
      <Flex
        direction={FlexDirectionTypes.Col}
        justify={Aligns.CENTER}
        items={Aligns.CENTER}
        className="px-4 text-center sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-7xl">
          <h1 className="my-4 text-4xl font-bold dark:text-white">OrtalsApp</h1>
          <h2 className="mb-6 text-2xl dark:text-white">
            Here you can find business cards from all categories
          </h2>
          <hr className="mb-6 border-gray-300" />

          <div className="flex flex-col items-center justify-center">
            <Cards />
          </div>
        </div>
      </Flex>

      {user && (user.isBusiness || user?.isAdmin) && (
        <div className="fixed bottom-10 right-6 z-50 md:right-10">
          <MdAddCircleOutline
            className="cursor-pointer text-6xl text-green-500 transition-transform duration-300 hover:scale-110 dark:text-white"
            onClick={() => setShowModal(true)}
            title="Add New Card"
          />
        </div>
      )}

      {showModal && <CreateCard open={showModal} setOpen={setShowModal} />}
    </>
  );
};

export default Home;
