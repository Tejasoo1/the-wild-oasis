import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

//Creating the API of this Modal Component & so then we will know what we should actually implement.
function AddCabin() {
  console.log("AddCabin");

  /* 
   1] So, putting this Modal component into a div html element, so that button doesn't occupy all the space.
   2] Let's re-use this Modal window both for deleting & for editing.
  */
  return (
    <div>
      <Modal>
        {/*
        1] A button to open & close the Modal.
        2] And into this Modal.Open, we want the user of this component to be able to pass in the button itself.
        3] Let's allow the user to pass in whatever button(customized) they want, to make the Modal component
           more flexible.
        4] Now, here we will not keep a state, which will decide whether the Modal should be open or not.
           Instead we will have that state inside the Modal component itself.    
      */}

        <Modal.Open opens="cabin-form">
          {/* Now, we need a way of adding that 'open' event handler function to this Button (So, to the children prop of Open)  */}
          <Button>Add new cabin</Button>
        </Modal.Open>
        {/* it's going to be into this window, where we are going to plce the content itself */}
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* 
             We can have multiple windows inside the same Modal component. 
             We need to give each window, a name & then we associate each open component to that name.
             Then the Modal needs to keep track, which window is currently open. 
          1] So, we also want the user of the Modal component to be able to add mutiple Modal windows.
          2] However, ofcourse only one of them can be opened at the same time.
          3] And so therefore, each of these buttons needs to know which window it should actually open.
          4] And so therefore, we need to pass a prop called opens, to solve this issue.
      */}

        {/* 
      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>

      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> 
      */}
      </Modal>
    </div>
  );
}

export default AddCabin;
