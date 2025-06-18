import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { cardSchema } from "../../validations/createCardSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { TCreateCard } from "../../types/createCards";
import { Button, FloatingLabel, HelperText, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

type Props = {
  setOpen?: (open: boolean) => void;
  open?: boolean;
};

function CreateCard({ setOpen, open }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TCreateCard>({ resolver: joiResolver(cardSchema) });


  const handleClose = () => {
    if (setOpen) {
      setOpen(false); 
    } else {
      window.history.back(); 
    }
  };


  const onSubmit = async (data: TCreateCard) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Card created:", response.data);
      toast.success("הכרטיס נוצר בהצלחה!");
      reset();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("אירעה שגיאה בעת יצירת הכרטיס");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={open} onClose={handleClose}>
      <ModalHeader>Create a card</ModalHeader>
      <ModalBody className="max-h-[70vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-md space-y-4 p-4"
        >
          <FloatingLabel
            {...register("title")}
            variant="standard"
            label="Title"
            color={errors.title ? "error" : undefined}
          />

          {errors.title && (
            <HelperText className="text-left" color="failure">
              {errors.title.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("subtitle")}
            variant="standard"
            label="Subtitle"
            color={errors.subtitle ? "error" : undefined}
          />

          {errors.subtitle && (
            <HelperText className="text-left" color="failure">
              {errors.subtitle.message}
            </HelperText>
          )}
          <FloatingLabel
            {...register("description")}
            variant="standard"
            label="Description"
            color={errors.description ? "error" : undefined}
          />

          {errors.description && (
            <HelperText className="text-left" color="failure">
              {errors.description.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("phone")}
            variant="standard"
            label="Phone"
            type="phone"
            color={errors.phone ? "error" : undefined}
          />
          {errors.phone && (
            <HelperText className="text-left" color="failure">
              {errors.phone?.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("email")}
            variant="standard"
            label="email"
            type="email"
            color={errors.email ? "error" : undefined}
          />

          {errors.email && (
            <HelperText className="text-left" color="failure">
              {errors.email.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("web")}
            variant="standard"
            label="Web"
            color={errors.web ? "error" : undefined}
          />

          {errors.web && (
            <HelperText className="text-left" color="failure">
              {errors.web.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("image.url")}
            variant="standard"
            label="image url"
            color={errors.image?.url ? "error" : undefined}
          />

          {errors.image?.url && (
            <HelperText className="text-left" color="failure">
              {errors.image.url.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("image.alt")}
            variant="standard"
            label="image alt"
            color={errors.image?.alt ? "error" : undefined}
          />

          {errors.image?.alt && (
            <HelperText className="text-left" color="failure">
              {errors.image.alt.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("address.state")}
            variant="standard"
            label="State"
            color={errors.address?.state ? "error" : undefined}
          />

          {errors.address?.state && (
            <HelperText className="text-left" color="failure">
              {errors.address.state.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("address.country")}
            variant="standard"
            label="Country"
            color={errors.address?.country ? "error" : undefined}
          />

          {errors.address?.country && (
            <HelperText className="text-left" color="failure">
              {errors.address.country.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("address.city")}
            variant="standard"
            label="City"
            color={errors.address?.city ? "error" : undefined}
          />

          {errors.address?.city && (
            <HelperText className="text-left" color="failure">
              {errors.address.city.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("address.street")}
            variant="standard"
            label="Street"
            color={errors.address?.street ? "error" : undefined}
          />

          {errors.address?.street && (
            <HelperText className="text-left" color="failure">
              {errors.address.street.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("address.houseNumber")}
            variant="standard"
            label="House Number"
            type="number"
            color={errors.address?.houseNumber ? "error" : undefined}
          />

          {errors.address?.houseNumber && (
            <HelperText className="text-left" color="failure">
              {errors.address.houseNumber.message}
            </HelperText>
          )}

          <FloatingLabel
            {...register("address.zip")}
            variant="standard"
            label="Zip Code"
            type="number"
            color={errors.address?.zip ? "error" : undefined}
          />

          {errors.address?.zip && (
            <HelperText className="text-left" color="failure">
              {errors.address.zip.message}
            </HelperText>
          )}

          <Button
            type="submit"
            color="purple"
            fullSized
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
}



export default CreateCard;