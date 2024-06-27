import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  console.log("UpdateUserDataForm component");
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  console.log(currentFullName);

  //Hook for updaing the user fullName, avatar
  const { updateUser, isUpdating } = useUpdateUser();
  console.log({ updateUser, isUpdating });

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim()) return; //The fullName needs to exist, but the avatar doesn't have to.

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          //e.target ---> form element
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          disabled={isUpdating}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        {/* 
           Since, this button here actually has the type of reset, which is an html5 attribute, this will
           actually not submit the form automatically.

           So, we don't even need to do preventDefault in handleCancel function.
        */}
        <Button
          disabled={isUpdating}
          onClick={handleCancel}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
