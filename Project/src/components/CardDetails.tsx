import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tcards } from "../types/CardsData";
import { Button, Card, Spinner } from "flowbite-react";
import { toast } from "react-toastify";


const CardDetails = () => {
  const [card, setCard] = useState<Tcards | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

    useEffect(() => {
      const fetchCardDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
          );
          setCard(response.data);
        } catch (error) {
          console.error("Error fetching card details:", error);
          toast.error("אירעה שגיאה בטעינת פרטי הכרטיס 😞");
        } finally {
          setLoading(false);
        }
      };

      fetchCardDetails();
    }, [id]);


  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 dark:text-white">
      <h1 className="text-4xl font-bold">Card Details</h1>

      {loading && (
        <Spinner aria-label="Default status example" className="size-16" />
      )}

      {!loading && !card && (
        <>
          <p>No card with such ID found</p>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Back to the main page
          </Button>
        </>
      )}

      {card && (
        <button onClick={() => navigate(-1)}>
          <Card
            className="w-full max-w-2xl p-6 shadow-lg dark:bg-gray-800 dark:text-white"
           
          >
            <div className="flex flex-col md:flex-row md:gap-8">
              <img
                src={card.image.url}
                alt={card.image.alt}
                className="h-48 w-48 rounded-lg object-cover shadow-md"
              />
              <div className="flex flex-col justify-center text-right gap-2">
                <h1 className="text-3xl font-bold">{card.title}</h1>
                <h2 className="text-lg text-gray-400">{card.subtitle}</h2>
                <p className=" text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-left text-sm">
              <div>
                <strong>📞 phone: </strong>
                <a href={`tel:${card.phone}`} className="hover:underline">
                  {card.phone}
                </a>
              </div>
              <div>
                <strong>📧 mail: </strong>
                <a href={`mailto:${card.email}`} className="hover:underline">
                  {card.email}
                </a>
              </div>
              <div>
                <strong>🌐 site: </strong>
                <a
                  href={card.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {card.web}
                </a>
              </div>
              <div>
                <strong>📍 address: </strong>
                {card.address.street} {card.address.houseNumber},
                {card.address.city}, {card.address.state},{card.address.country}
              </div>
              <div>
                <strong>🔢 Business number: </strong> {card.bizNumber}
              </div>
              <div>
                <strong>❤️ Likes: </strong> {card.likes.length}
              </div>
            </div>
          </Card>
        </button>
      )}
    </div>
  );
};

export default CardDetails;
