import { joiResolver } from "@hookform/resolvers/joi";
import {
  Button,
  FloatingLabel,
  HelperText,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cardSchema } from "../../validations/createCardSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { TEditCard } from "../../types/editCards";

type EditCardModalProps = {
  show: boolean;
  onClose: () => void;
  initialData: TEditCard;
  cardId: string;
  onCardUpdated: () => void;
};

const EditCardModal = ({
  show,
  onClose,
  initialData,
  cardId,
  onCardUpdated,
}: EditCardModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<TEditCard>({
    resolver: joiResolver(cardSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (formData: TEditCard) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        formData,
        { headers: { "x-auth-token": token || "" } },
      );
      toast.success("הכרטיס עודכן בהצלחה!");
      onCardUpdated();
      onClose();
    } catch (error) {
      console.error("שגיאה בעדכון:", error);
      toast.error("אירעה שגיאה בעדכון הכרטיס");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Card editing</ModalHeader>
      <ModalBody className="max-h-[70vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md space-y-4 p-4"
        >
          <FloatingLabel
            variant="filled"
            label="Title"
            {...register("title")}
          />
          {errors.title && (
            <HelperText color="failure">{errors.title.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Subtitle"
            {...register("subtitle")}
          />
          {errors.subtitle && (
            <HelperText color="failure">{errors.subtitle.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Description"
            {...register("description")}
          />
          {errors.description && (
            <HelperText color="failure">
              {errors.description.message}
            </HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Phone"
            {...register("phone")}
          />
          {errors.phone && (
            <HelperText color="failure">{errors.phone.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Email"
            {...register("email")}
          />
          {errors.email && (
            <HelperText color="failure">{errors.email.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Website"
            {...register("web")}
          />
          {errors.web && (
            <HelperText color="failure">{errors.web.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Image URL"
            {...register("image.url")}
          />
          {errors.image?.url && (
            <HelperText color="failure">{errors.image.url.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Image Alt"
            {...register("image.alt")}
          />
          {errors.image?.alt && (
            <HelperText color="failure">{errors.image.alt.message}</HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="State"
            {...register("address.state")}
          />
          {errors.address?.state && (
            <HelperText color="failure">
              {errors.address.state.message}
            </HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Country"
            {...register("address.country")}
          />
          {errors.address?.country && (
            <HelperText color="failure">
              {errors.address.country.message}
            </HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="City"
            {...register("address.city")}
          />
          {errors.address?.city && (
            <HelperText color="failure">
              {errors.address.city.message}
            </HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="Street"
            {...register("address.street")}
          />
          {errors.address?.street && (
            <HelperText color="failure">
              {errors.address.street.message}
            </HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="House Number"
            type="number"
            {...register("address.houseNumber")}
          />
          {errors.address?.houseNumber && (
            <HelperText color="failure">
              {errors.address.houseNumber.message}
            </HelperText>
          )}

          <FloatingLabel
            variant="filled"
            label="ZIP Code"
            type="number"
            {...register("address.zip")}
          />
          {errors.address?.zip && (
            <HelperText color="failure">
              {errors.address.zip.message}
            </HelperText>
          )}

          <Button
            type="submit"
            color="purple"
            fullSized
            disabled={!isDirty || !isValid || isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Update ticket"}
          </Button>
        </form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

export default EditCardModal;
