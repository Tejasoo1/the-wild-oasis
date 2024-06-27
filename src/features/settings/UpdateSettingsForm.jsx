import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  console.log("UpdateSettingsFrom");
  //Fetching the settings data (using React Query) & then immidiately place it here, in each of these input fields.
  const { isLoading, settings } = useSettings();
  console.log({ isLoading });
  console.log(settings);

  const {
    minBookingLength,
    maxBookingLength,
    breakfastPrice,
    maxGuestsPerBooking,
  } = settings || {};

  //Updating a setting.
  /*
   1] The way we want to do this, is that, whenever we click on the input field (its in focus state) then we 
      write some new value in the input field, & then as soon as we leave the input field(its out of focus state)
      then only we want the updating to happen.
  
   2] And so we can do that with the onBlur event handler   
  
  */
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value, defaultValue } = e.target;
    console.log({ value });
    console.log({ defaultValue });

    // If the value is empty, restore it to the defaultValue (previous value)
    if (!value.trim()) {
      e.target.value = defaultValue;
      return;
    }

    // If the value has changed and is not empty, trigger the update operation
    if (value !== defaultValue) {
      updateSetting({ [field]: value });
    }
  }

  if (isLoading) return <Spinner />;

  //Placing the data that we received, as the default value of these 4 inputs
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")} // (new value(e), name of the field that needs to be updated)
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
