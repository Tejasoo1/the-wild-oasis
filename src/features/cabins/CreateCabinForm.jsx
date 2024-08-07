import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { getImageNameFromUrl } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

/*
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

*/

/*

1] At around 20:00 in the video. The reason why error message for discount doesn't display properly, is because both value and 
   getValues().regularPrice are strings.

2] For example, "3000" < "2" returns true when comparing strings so that's why error doesn't appear properly.  We need to 
  compare numbers for it to work properly.

  You can simply put + in front of each to convert both values to number.

  +value <= +getValues().regularPrice

*/

//Now, sometimes this cabinToEdit value will not exist, so we need to give it a default value ({}).

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  console.log("CreateCabinForm");

  /*
  
  Q. Now, How do we get these values into the input field ? 
  ---> 1] There is an easy way to do it with React Hook Form.
       
                      |--------> Here, we can actually pass in, some options    
             useForm({
               defaultValues:  
             })     |
                    |---> And one of those options is the defaultValue 
                      
       2] However, if we are just using this form, to create a new cabin, then we will not
          want any default values.

       3] So, let's first of all, actually figure out if we are using this form to edit or to add
          a new cabin.
          
       4] So, lets create a variable which will contain that information.   
          const isEditSession = Boolean(editId);
                                                                                                           |---> then we want the editValues 
          const { register, handleSubmit, reset, getValues, formState } = useForm({                        |     to become the default values  
                                                                           defaultValues: isEditSession ? editValues : { },
                                                                         });                                            |---> if not, then    
  


  */
  const { id: editId, ...editValues } = cabinToEdit;
  console.log(editId);
  console.log(editValues);

  // get the current image name.
  const currentImage = getImageNameFromUrl(editValues.image);

  //Do we need to create a new cabin or edit the cabin
  const isEditSession = Boolean(editId);
  console.log(isEditSession);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  console.log(errors);

  /*
? We have some more react query logic, that we can extract into its own custom Hook.
   
  const queryClient = useQueryClient();

  ~ For creating a new cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset(); //resetting the Form
    },
    onError: (err) => toast.error(err.message),
  });
  
  ~ For editing a new cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id, currentImage }) =>
      createEditCabin(newCabinData, id, currentImage),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset(); //resetting the Form
    },
    onError: (err) => toast.error(err.message),
  });

  
*/

  //For creating a new cabin
  const { isCreating, createCabin } = useCreateCabin();

  //For editting a cabin
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;
  console.log(isWorking);

  //Submission of form (with form data)
  function onSubmit(data) {
    console.log(data);
    // mutate(data);
    console.log(data.image?.[0]);

    /*
      One case in edit form is missed, this is how it breaks your code

      1. User clicks on Edit Form 
      2. Click on choose File 
      3. But changed mind and did not select any image 
      4. Proceeds to Edit Cabin Result : 
         
         error occurs as when user open the file explorer the image is changed and when it denies to select the image, it gets loaded 
         with empty FileList.


     Q. I just encountered a problem where after refactoring the mutation logic of create and edit cabins ..... the createCabin form 
        is begin reset properly as shown in the video but when we try to edit a cabin .....it is being edited as 
        expected but the edit form is not being reset but gets the previous data of the cabin (before edit) and 
        places that as the default values of the useForm() ?

  ----> To fix this issue you can change the reset function in the editCabin mutation to:    

      1] Apparently, the reset() function reverts the form to its original state: the state in which it was opened. 
         In the event of editing,  it's the 'old' cabin data 
     
      2]  

    */

    //Checking if data.image is a URL(string) or an ImageFile (FileList)
    let image =
      typeof data.image === "object" && data.image?.length > 0
        ? data.image[0]
        : cabinToEdit.image;

    console.log(image);

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId, currentImage },
        // pass the edited data to onSuccess
        {
          onSuccess: (data) => {
            reset(data); // Reset the form with the edited data
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          //            |----------> Here, we get access to the data returned by the mutation function (createEditCabin)
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  // Now the way, in which we know whether this Form is being rendered in a Modal or not is, if it received the onCloseModal prop
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          // type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {/*
          1] However, we do not know whether this Form will ever be reused in some another place, not inside the Modal
          2] And so if this Form is ever used in some place where it isn't contained in a modal, then its not going to
             receive this onCloseModal prop.
          3] And so that means that we need to call this function here conditionally.  
             () => onCloseModal?.()
             
          4] And when we have successfully created a new cabin, then also we need to close this Modal. 
             (See Above, in onSubmit function)    
        */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

/*

     <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        // We didn't make any of these Input's here controlled elements
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
    </FormRow>
    
    <FormRow>
       <Label htmlFor="regularPrice">Regular price</Label>
       <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
     </FormRow>

     <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
     </FormRow>

     <FormRow>
      <Label htmlFor="description">Description for website</Label>
      <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
      />
    </FormRow>

    <FormRow>
      <Label htmlFor="image">Cabin photo</Label>
       <FileInput id="image" accept="image/*" />
    </FormRow>
    
    <FormRow>
        // type is an HTML attribute!
      <Button variation="secondary" type="reset">
        Cancel
      </Button>
      <Button disabled={isCreating}>Add cabin</Button>
    </FormRow>
    











*/
