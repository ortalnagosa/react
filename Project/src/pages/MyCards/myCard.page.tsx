import { Spinner, Modal, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tcards } from "../../types/CardsData";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { toast } from "react-toastify";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { TEditCard } from "../../types/editCards";
import EditCardModal from "../../components/cards/editCardModal";

function MyCardsPage() {
  const [cards, setCards] = useState<Tcards[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<TEditCard | null>(null);
  const [editCardId, setEditCardId] = useState<string | null>(null);

  const handleEditClick = (cardId: string) => {
    const card = cards.find((card) => card._id === cardId);
    if (!card) return;

    const formattedCard: TEditCard = {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      phone: card.phone,
      email: card.email,
      web: card.web || "",
      image: {
        url: card.image?.url || "",
        alt: card.image?.alt || "",
      },
      address: {
        state: card.address?.state || "",
        country: card.address?.country || "",
        city: card.address?.city || "",
        street: card.address?.street || "",
        houseNumber: card.address?.houseNumber || 0,
        zip: card.address?.zip || 0,
      },
    };

    setCardToEdit(formattedCard);
    setEditCardId(cardId);
    setIsEditModalOpen(true);
  };

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  const user = useSelector((state: TRootState) => state.userSlice.user);

  const fetchMyCards = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;

      const { data } = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
      );
      setCards(data);
    } catch (error) {
      console.error("שגיאה בטעינת הכרטיסים :", error);
      toast.error("אירעה שגיאה בטעינת הכרטיסים ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  const confirmDelete = (cardId: string) => {
    setCardToDelete(cardId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!cardToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardToDelete}`,
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );
      toast.success("הכרטיס נמחק בהצלחה");
      fetchMyCards();
    } catch (error) {
      toast.error("שגיאה במחיקת הכרטיס, נסה שוב");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setCardToDelete(null);
    }
  };

  const likeOrUnlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["x-auth-token"] = token;

      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
      );

      const updatedCards = [...cards];
      const cardIndex = updatedCards.findIndex((card) => card._id === cardId);

      if (cardIndex !== -1) {
        const card = updatedCards[cardIndex];
        const isLiked = card.likes.includes(user?._id + "");

        if (isLiked) {
          card.likes = card.likes.filter((like) => like !== user?._id + "");
          toast.success("הלייק הוסר מהכרטיס");
        } else {
          card.likes = [...card.likes, user?._id + ""];
          toast.success("נוסף לייק לכרטיס");
        }

        updatedCards[cardIndex] = card;
        setCards(updatedCards);
      }
    } catch (error) {
      console.error("שגיאה בלייק/אנלייק:", error);
      toast.error("שגיאה, נסי שוב");
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchWord.toLowerCase()),
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Flex
        direction={FlexDirectionTypes.Col}
        justify={Aligns.CENTER}
        items={Aligns.CENTER}
        className="min-h-screen"
      >
        <Spinner size="xl" aria-label="Loading" />
        <p className="mt-4">Loading your cards...</p>
      </Flex>
    );
  }

  return (
    <>
      <Flex
        direction={FlexDirectionTypes.Col}
        justify={Aligns.CENTER}
        items={Aligns.CENTER}
        className="min-h-screen p-4"
      >
        <h1 className="mb-16 text-4xl font-bold  dark:text-white">My Cards </h1>

        {loading && (
          <div className="my-10 flex justify-center">
            <Spinner size="xl" color="purple" />
          </div>
        )}

        {!loading && filteredCards.length === 0 && (
          <div className="flex h-screen w-full items-center justify-center  dark:text-white">
            <p className="text-xl font-medium dark:text-white">
              No cards were found!!!
            </p>
          </div>
        )}

        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 px-2 sm:px-0  md:grid-cols-2 lg:grid-cols-3">
          {currentCards.map((card) => {
            const isLiked = card.likes.includes(user?._id + "");
            return (
              <div
                key={card?._id}
                className="rounded-2xl border bg-white p-4 shadow"
              >
                <Link to={`/card/${card._id}`}>
                  <img
                    src={card.image?.url}
                    alt={card.image?.alt || card.title}
                    className="mb-4 aspect-video w-full rounded object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/default.jpg";
                    }}
                  />
                </Link>
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-gray-600">{card.subtitle}</p>
                <p className="mt-2 text-sm">{card.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  טלפון: {card.phone}
                </p>
                <p className="text-sm text-gray-500">אימייל: {card.email}</p>

                <div className="mt-4 flex gap-5">
                  <GrEdit
                    color="light"
                    onClick={() => handleEditClick(card._id)}
                    className="size-7 cursor-pointer"
                  />
                  <RiDeleteBin6Line
                    color="failure"
                    onClick={() => confirmDelete(card._id!)}
                    className="size-7 cursor-pointer"
                  />
                  <FaHeart
                    className={`cursor-pointer text-2xl sm:text-3xl ${
                      isLiked ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => likeOrUnlikeCard(card._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showIcons
            />
          </div>
        )}
      </Flex>

      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header>Deletion confirmation</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the card?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleDeleteConfirmed}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            YES
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="rounded bg-gray-300 px-4 py-2"
          >
            NO
          </button>
        </Modal.Footer>
      </Modal>

      {cardToEdit && editCardId && (
        <EditCardModal
          show={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={cardToEdit}
          cardId={editCardId}
          onCardUpdated={fetchMyCards}
        />
      )}
    </>
  );
}

export default MyCardsPage;
