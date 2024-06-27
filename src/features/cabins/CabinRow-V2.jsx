import styled from "styled-components";
import { formatCurrency, getImageNameFromUrl } from "../../utils/helpers";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  console.log("CabinRow");

  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    image,
    regularPrice,
    discount,
    description,
  } = cabin;

  // Get the image name.
  const imageName = getImageNameFromUrl(image);

  //For deleting a cabin (Using our useDeleteCabin Custom Hook)
  const { isDeleting, deleteCabin } = useDeleteCabin();

  console.log({ isDeleting });

  //Duplicating a cabin with same clicked cabin's button's data
  const { isCreating, createCabin } = useCreateCabin();

  console.log({ isCreating });

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        {/* Another div container to hold two buttons */}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((showForm) => !showForm)}>
            <HiPencil />
          </button>
          <button
            onClick={() => deleteCabin({ cabinId, imageName })}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;

/*
~ Extracting this logic(here), into its own custom Hook:-

~ For deleting a cabin:- (So, lets copy all of this & refactor it into a useDeleteCabinHook)
  (Let's create this Hook in the 'cabins' feature folder) 

const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ cabinId: id, imageName }) => deleteCabin(id, imageName),
    
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    
    onError: (err) => toast.error(err.message),
  });



*/
