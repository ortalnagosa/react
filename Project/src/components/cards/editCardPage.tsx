import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TEditCard } from "../../types/editCards";
import EditCardModal from "./editCardModal";
import { Spinner } from "flowbite-react";

const EditCardPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<TEditCard | null>(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
          { headers: { "x-auth-token": token || "" } },
        );
        setInitialData(data);
      } catch (err) {
        toast.error("שגיאה בטעינת הכרטיס");
      }
    };

    fetchCard();
  }, [id]);

  const handleCardUpdated = () => {
    toast.success("הכרטיס עודכן!");
  };

  const handleClose = () => {
    setShow(false);
    navigate("/my-cards");
  };

  if (!initialData) return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );

  return (
    <EditCardModal
      show={show}
      onClose={handleClose}
      initialData={initialData}
      cardId={id!}
      onCardUpdated={handleCardUpdated}
    />
  );
};

export default EditCardPage;
