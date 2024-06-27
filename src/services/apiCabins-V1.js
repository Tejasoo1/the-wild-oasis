import supabase from "./supabase";

export async function getCabins() {
  console.log("getCabins");

  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }

  // console.log(data);

  return data;
}

/*
1] Now, if we want to edit a cabin then we need to pass in, the new cabin data + the 'id' of the cabin, that is being 
   edited.

2] And so that's how we will know if we are in an edit session or not.   
   
3] So, we want to create a new cabin only if there is no 'id'.

*/

//Inserting a new Row (new Cabin)
export async function createEditCabin(newCabin) {
  console.log("createCabin");

  // format of the URL:- https://acqtzlewrgwnsmyrswyp.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imageURL = `https://acqtzlewrgwnsmyrswyp.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create the cabin (And if that is successful)
  const { data, error } = await supabase
    .from("cabins")
    // .insert([{ some_column: "someValue", other_column: "otherValue" }])
    // .insert([newCabin])
    .insert([{ ...newCabin, image: imageURL }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  console.log(data);

  //2. Then we upload the image. (Now, if the cabin was successfully uploaded)
  const { error: storageError } = await supabase.storage
    .from("cabin-images") //bucket name
    .upload(
      imageName,
      newCabin.image //specify 'name' of the 'file' & 'file' itself
    );

  //3. Prevent a new cabin from being created, in case that this file actually didn't upload correctly. (But then, there was an error in uploading the image file)
  //  (i.e Delete the cabin, If there was an error while uploading the image to the bucket)
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); //Then we just go back, delete that cabin as well.
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded & the cabin was not created"
    );
  }

  return data;
}

/*
 1] Now if we were to attempt to call this function now, then actually nothing would happen.
 2] And the reason for that is we activated row level security on this table.
*/
export async function deleteCabin(id) {
  console.log("deleteCabin");

  const { data, error } = await supabase
    .from("cabins") //it will select the cabins table
    .delete() // & it will delete from there, but ofcourse it shouldn't delete everything.....
    .eq("id", id); // And so that row is where the ID column is equal to the id that we pass in here.

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  console.log(data);

  return data;
}

//.... And so, we need to tell supabase what to delete from there.
// .eq("some_column", "someValue"); //& so here we basically select the row that we want to delete.
