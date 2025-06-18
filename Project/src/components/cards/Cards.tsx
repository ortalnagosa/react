import { Card, Spinner, Pagination } from "flowbite-react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Tcards } from "../../types/CardsData";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { TRootState } from "../../store/store";
import { searchActions } from "../../store/searchSlice";

function Cards() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<Tcards[]>([]);
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const filterBySearch = () => {
    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
  };

  const filteredCards = filterBySearch();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord]);

  useEffect(() => {
    const getCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
        dispatch(searchActions.setSearchWord(""));
      }
    };

    getCards();
  }, [dispatch]);

  const likeOrUnlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;
      await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
      );

      const card = cards.find((card) => card._id === cardId);

      if (card) {
        const isLiked = card.likes.includes(user?._id + "");
        const cardsArr = [...cards];

        if (isLiked) {
          card.likes = card?.likes.filter((like) => like !== user?._id + "");
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = card;
          toast.success("הכרטיס הוסר מהכרטיסים האהובים");
        } else {
          card.likes = [...card.likes, user?._id + ""];
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = card;
          toast.success("הכרטיס נוסף לכרטיסים האהובים");
        }

        setCards(cardsArr);
      }
    } catch (error) {
      console.log("יש שגיאה בעת סימון/ביטול ה-לייק", error);
    }
  };

  return (
    <>
      <Flex
        direction={FlexDirectionTypes.Row}
        justify={Aligns.CENTER}
        items={Aligns.CENTER}
        wrap
        className="mx-auto max-w-4xl flex-wrap justify-center gap-6 dark:text-white"
      >
        {loading && (
          <div className="flex h-screen w-full items-center justify-center">
            <Spinner color="purple" aria-label="Loading spinner" />
          </div>
        )}

        {!loading && filteredCards.length === 0 && (
          <div className="flex h-screen w-full items-center justify-center">
            <p>לא נמצא כרטיס עם מזהה כזה</p>
          </div>
        )}

        {!loading &&
          currentCards.map((card) => {
            const isLiked = card.likes.includes(user?._id + "");
            return (
              <Card key={card._id} className="relative h-80 w-full max-w-xs">
                {user ? (
                  <Link
                    to={`/card/${card._id}`}
                    className="h-40 overflow-hidden"
                  >
                    <img
                      src={card.image.url}
                      alt={`תמונה של ${card.title}`}
                      className="h-40 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/default.jpg";
                      }}
                    />
                  </Link>
                ) : (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={card.image.url}
                      alt={`תמונה של ${card.title}`}
                      className="h-40 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/300x200?text=Image+Not+Found&font=roboto";
                      }}
                    />
                  </div>
                )}

                <h1 className="text-base font-bold md:text-lg">{card.title}</h1>
                <hr />
                <h3>{card.subtitle}</h3>
                <hr />
                {user && (
                  <div className="mt-4 flex justify-between text-xl md:text-3xl">
                    <BsTelephoneFill />
                    <FaHeart
                      className={`${isLiked ? "text-red-500" : "text-gray-500"} cursor-pointer`}
                      onClick={() => likeOrUnlikeCard(card._id)}
                    />
                  </div>
                )}
              </Card>
            );
          })}
        {filteredCards.length > cardsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCards.length / cardsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            showIcons
          />
        )}
      </Flex>
    </>
  );
}

export default Cards;
