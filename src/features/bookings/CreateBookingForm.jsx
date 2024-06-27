import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCabins } from "../cabins/useCabins";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { getToday } from "../../utils/helpers";
import { useAllBookings } from "./useAllBookings";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #ced4da;
  border-radius: 4px;
  color: black;
  padding: 10px;
  font-size: 16px;

  .react-datepicker-popper {
  }
`;

function CreateBookingForm() {
  console.log("CreateBookingForm");

  const [cabinName, setCabinName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hasBreakFast, setHasBreakFast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [status, setStatus] = useState("unconfirmed");

  console.log({ startDate: startDate.toISOString() });
  console.log({ endDate: endDate.toISOString() });

  //Accessing the cabin's data
  const { isLoading, cabins } = useCabins();
  console.log({ isLoading, cabins });

  //Accessing bookings data
  const { allBookings: bookings, isLoading: isLoadingBookings } =
    useAllBookings();

  console.log({ bookings, isLoadingBookings });

  //React Hook Form
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { errors } = formState;
  console.log(errors);

  //Accessing only the bookings which has selected cabin name:-
  // console.log(bookings?.[0]?.cabins.name);

  const cabinBookings = bookings?.filter((booking) => {
    return booking.cabins.name === (cabinName || "001");
  });

  console.log({ cabinBookings });

  //Checking the start date & end date
  const checkAvailability = (stDate, edDate) => {
    const start = new Date(stDate);
    const end = new Date(edDate);

    if (bookings) {
      for (let booking of cabinBookings) {
        const bookingStart = new Date(booking?.startDate);
        const bookingEnd = new Date(booking?.endDate);

        // Check for overlap
        if (
          (start >= bookingStart && start < bookingEnd) ||
          (end > bookingStart && end <= bookingEnd) ||
          (start <= bookingStart && end >= bookingEnd)
        ) {
          return false; // Cabin is already booked for selected dates
        }
      }
    }

    return true; // Cabin is available for selected dates
  };

  //Use to handle the toasts bug.
  useEffect(
    function () {
      if (!bookings) return;
      const isAvailable = checkAvailability(startDate, endDate);
      if (isAvailable) {
        toast.success("Cabin is available between these dates");
      } else {
        toast.error(
          "Cabin is already booked for selected dates!!! Please try to select other dates"
        );
      }
    },
    [startDate, endDate]
  );

  if (isLoading || isLoadingBookings) return <Spinner />;

  //Computing options array for Select element.
  const options = cabins.map((cabin) => {
    return {
      value: cabin.name,
      label: cabin.name,
    };
  });
  console.log({ options });

  //options array for status of the booking
  const optionsBooking = [
    { value: "unconfirmed", label: "unconfirmed" },
    { value: "checked-in", label: "checked-in" },
    { value: "checked-out", label: "checked-out" },
  ];

  //Derived state (cabinId)
  const cabinId = cabinName
    ? cabins.find((cab) => cab.name === cabinName).id
    : cabins.find((cab) => cab.name === options[0].value).id;

  console.log(cabinId);

  //Derived state (selected cabinPrice, cabinDiscount)
  //Derived state (selected Cabin Price)
  const cabinPrice = cabins.find((cab) => cab.id === cabinId).regularPrice;
  console.log({ cabinPrice });

  //Derived state (totalPrice, extrasPrice)
  const extrasPrice = hasBreakFast ? 120 : 0;

  const totalPrice = cabinPrice + extrasPrice;

  //For handling the Cabins name info.
  function handleCabin(e) {
    console.log(e.target.value);
    setCabinName(e.target.value);
  }

  //For handling the status of the booking
  function handleBooking(e) {
    console.log(e.target.value);
    setStatus(e.target.value);
  }

  /*
    [
       { value: "startDate-desc", label: "Sort by date (recent first)" },
       { value: "startDate-asc", label: "Sort by date (earlier first)" },
       {
         value: "totalPrice-desc",
         label: "Sort by amount (high first)",
       },
       { value: "totalPrice-asc", label: "Sort by amount (low first)" },
    ]

  --------------------------------------------------------------------------------------------------------------
    DatePicker:
          'onChange={(date) => setDate(date)}': 
           1. This prop specifies a callback function that will be called whenever the selected date in the date picker changes. 
           2. In this code, it updates the state variable date with the selected date. 
           3. The setDate function is typically a state update function provided by React's useState hook.


          'selected={date}': 
           1. This prop specifies the currently selected date in the date picker. 
           2. It is typically bound to a state variable (date in this case) that holds the selected date. 
           3. This allows the date picker to be a controlled component, meaning its state is controlled by React.

          dateFormat="dd/MM/yyyy": 
           1. This prop specifies the format in which dates should be displayed in the date picker. 
           2. In this case, dates will be displayed in the format "dd/MM/yyyy", where "dd" represents the day, "MM" represents 
              the month, and "yyyy" represents the year. 
        
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />

        import DatePicker from "react-datepicker";
        import "react-datepicker/dist/react-datepicker.css";

        npm install react-datepicker --save
  
  */

  function onSubmit(data) {
    console.log({ data });

    const updatedObj = {
      ...data,
      endDate: endDate.toISOString(),
      startDate: startDate.toISOString(),
      cabinPrice,
      extrasPrice,
      totalPrice,
      hasBreakFast,
      isPaid,
      cabinId,
      status,
      guestId: 12,
    };

    //Guard clause
    if (startDate.toISOString() === endDate.toISOString()) {
      toast.error("start date & end date can not be same !!!");
      return;
    }

    console.log(updatedObj);

    /*
       {  
          cabinPrice: undefined,
          extrasPrice: undefined,
          numNights: "5",
          numGuests: "6",
          observations: "Don't Add breakfast",
          totalPrice: undefined,
       }
       cabinId: 25,
       guestId: 12,

    */
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Select a Cabin" error={""}>
        <Select
          options={options}
          onChange={handleCabin}
          value={cabinName || options[0].value}
        />
      </FormRow>
      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="text"
          id="cabinPrice"
          value={cabinPrice}
          disabled={cabinId}
          {...register("cabinPrice")}
        />
      </FormRow>
      <FormRow
        type="date"
        label="Select start date"
        error={errors?.startDate?.message}
      >
        <StyledDatePicker
          id="startdate"
          onChange={(date) => setStartDate(date)}
          selected={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </FormRow>
      <FormRow
        type="date"
        label="Select end date"
        error={errors?.endDate?.message}
      >
        <StyledDatePicker
          id="enddate"
          onChange={(date) => setEndDate(date)}
          selected={endDate}
          dateFormat="dd/MM/yyyy"
        />
      </FormRow>
      <FormRow label="Number of Nights" error={errors?.numNights?.message}>
        <Input
          type="text"
          id="numNights"
          {...register("numNights", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum no. of nights should be atleast 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="text"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 2,
              message: "Minimum no. of guests should be atleast 2",
            },
          })}
        />
      </FormRow>
      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="text"
          id="extrasPrice"
          value={extrasPrice}
          disabled={cabinId}
          {...register("extrasPrice")}
        />
      </FormRow>
      <FormRow label="Total Price" error={errors?.totalPrice?.message}>
        <Input
          type="text"
          id="totalPrice"
          value={totalPrice}
          disabled={cabinId}
          {...register("totalPrice")}
        />
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <textarea
          type="text"
          id="observations"
          style={{ color: "black" }}
          {...register("observations", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Status of the Booking" error={""}>
        <Select
          options={optionsBooking}
          onChange={handleBooking}
          value={status || optionsBooking[0].value}
        />
      </FormRow>
      <FormRow label="" error={errors?.hasBreakFast?.message}>
        <Checkbox
          checked={hasBreakFast}
          onChange={() => {
            setHasBreakFast((has) => !has);
          }}
          id="breakfast"
        >
          Add breakFast ?
        </Checkbox>
      </FormRow>

      <FormRow label="" error={errors?.hasBreakFast?.message}>
        <Checkbox
          checked={isPaid}
          onChange={() => {
            setIsPaid((has) => !has);
          }}
          id="isPaid"
        >
          isPaid ?
        </Checkbox>
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;

// if (startDate.toISOString() !== endDate.toISOString()) {
//   const currDate = getToday();

//   if (startDate.toISOString() < currDate) {
//     toast.error("startDate should not be less than current date");
//     setStartDate(new Date());
//     return;
//   } else if (endDate.toISOString() < currDate) {
//     toast.error("endDate should not be less than current date");
//     setEndDate(new Date());
//     return;
//   }

//   const stDate = startDate.toISOString();
//   const edDate = endDate.toISOString();

//   console.log({ stDate });
//   console.log({ edDate });

//   if (edDate > stDate) {
//     console.log("Date check");

//     const isBooked = cabinBookings.find(
//       (booking) => stDate > booking.startDate && edDate < booking.endDate
//     );

//     console.log(isBooked);
//     console.log(Boolean(isBooked));

//     if (Boolean(isBooked)) {
//       toast.error(
//         "Cabin is already booked between selected dates!!! Please select other dates"
//       );
//     } else {
//       toast.success("Cabin is available between these dates");
//     }
//   }
// }
