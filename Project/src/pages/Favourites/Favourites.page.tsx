import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Card, Spinner, Pagination } from "flowbite-react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Tcards } from "../../types/CardsData";
import { TRootState } from "../../store/store";
import { searchActions } from "../../store/searchSlice";
import Flex, { FlexDirectionTypes, Aligns } from "../../types/Flex";

function Favourites() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<Tcards[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const user = useSelector((state: TRootState) => state.userSlice.user);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        const liked = response.data.filter((card: Tcards) =>
          card.likes.includes(user?._id + ""),
        );
        setCards(liked);
      } catch (error) {
        toast.error("שגיאה בטעינת כרטיסים");
      } finally {
        setLoading(false);
        dispatch(searchActions.setSearchWord(""));
      }
    };

    fetchCards();
  }, [user?._id]);

  const handleLike = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        { headers: { "x-auth-token": token || "" } },
      );

      const updatedCards = [...cards];
      const index = updatedCards.findIndex((card) => card._id === cardId);
      if (index !== -1) {
        const card = updatedCards[index];
        const liked = card.likes.includes(user?._id + "");
        if (liked) {
          card.likes = card.likes.filter((id) => id !== user?._id + "");
          toast.success(" הלייק הוסר");
          updatedCards.splice(index, 1);
        } else {
          card.likes.push(user?._id + "");
        }
        setCards(updatedCards);
      }
    } catch {
      toast.error("שגיאה בשמירת לייק");
    }
  };

  const filteredCards = cards.filter((card) =>
    [card.title, card.subtitle]
      .join(" ")
      .toLowerCase()
      .includes(searchWord.toLowerCase().trim())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.CENTER}
      items={Aligns.CENTER}
      className="min-h-screen p-4"
    >
      {!(filteredCards.length === 0) && (
        <h1 className="mb-16 text-4xl font-bold  dark:text-white">
          Favourites
        </h1>
      )}

      {loading && (
        <div className="my-10 flex justify-center">
          <Spinner size="xl" color="purple" />
        </div>
      )}

      {!loading && filteredCards.length === 0 && (
        <p className="mt-20 text-center text-lg">
          {searchWord
            ? "No results found for search"
            : "No favorite tickets at the moment"}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {currentCards.map((card) => {
          const isLiked = card.likes.includes(user?._id + "");
          return (
            <Card key={card._id} className="w-64 dark:bg-white">
              <Link to={`/card/${card._id}`}>
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="h-40 w-full object-cover"
                />
              </Link>
              <h2 className="text-lg font-bold">{card.title}</h2>
              <p>{card.subtitle}</p>
              <div className="mt-2 flex items-center justify-between text-xl">
                <BsTelephoneFill />
                <FaHeart
                  onClick={() => handleLike(card._id)}
                  className={`cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`}
                />
              </div>
            </Card>
          );
        })}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showIcons
          />
        </div>
      )}
    </Flex>
  );
}

export default Favourites;
