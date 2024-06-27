import styled from "styled-components";
import { formatCurrency, getImageNameFromUrl } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

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
        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            {/* This is where we actually now want to render this createCabinForm component */}
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          {/* 
            1] When, we click on the delete button we actually don't want the cabin to be deleted immidiately.
            2] But, instead as is usual in normal web-applications, first we should get asked, whether we are 
               sure if that cabin should be deleted or not. 
          */}
          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            {/*
              1] Now, we need to pass in the function that should actually be called when we confirm.
              2] After we delete the cabin, the row no longer exists & so therefore the Modal component
                 inside the row also no longer exists.
                 And so therefore, the Modal Window can no longer be shown. 
            */}
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin({ cabinId, imageName })}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
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
