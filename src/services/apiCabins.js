import supabase from "./supabase";

/*

1] To ensure that edited cabins retain their position in the table instead of being moved to the last position, a possible solution is
   to order the cabins based on the 'created_at' field in the 'getCabins' function within the 'apiCabins.js' file.

2] By incorporating the 'created_at' field into the query's sorting mechanism, the cabins can be arranged chronologically according 
   to their creation time. 
   
   This approach guarantees that when a cabin is edited, it maintains its relative position in the table based on its original creation
   time, rather than being automatically shifted to the last position.

const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });
*/

export async function getCabins() {
  console.log("getCabins");

  let { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }

  // console.log(data);
  console.log("cabins-data-retrived");

  return data;
}

/*
1] Now, if we want to edit a cabin then we need to pass in, the new cabin data + the 'id' of the cabin, that is being 
   edited.

2] And so that's how we will know if we are in an edit session or not.   
   
3] So, we want to create a new cabin only if there is no 'id'.

*/

//Inserting a new Row (new Cabin)
export async function createEditCabin(newCabin, id, currentImage) {
  console.log("createEditCabin");
  // console.log(newCabin, id);
  // console.log(newCabin.image);

  //variable to check, what kind of data we have in image property of newCabin object. (Is it image file or URL)
  const hasImagePath = newCabin.image?.startsWith?.(
    "https://acqtzlewrgwnsmyrswyp.supabase.co"
  );

  // format of the URL:- https://acqtzlewrgwnsmyrswyp.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imageURL =
    hasImagePath || newCabin.image === null
      ? newCabin.image
      : `https://acqtzlewrgwnsmyrswyp.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create/Edit the cabin (And if that is successful)
  let query = supabase.from("cabins");

  //A] Create a Cabin
  if (!id)
    query = query
      // .insert([{ some_column: "someValue", other_column: "otherValue" }])
      // .insert([newCabin])
      .insert([{ ...newCabin, image: imageURL }]);

  //B] Edit a Cabin (id of the row, which we want to update)
  if (id) query = query.update({ ...newCabin, image: imageURL }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  console.log(data);

  //To avoid uploading invalid image to the bucket
  if (newCabin.image !== null && typeof newCabin.image === "object") {
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

    // at the end of the function, before return data and after the storage error check
    // if the new image failed to upload, we don't want this to run
    await supabase.storage.from("cabin-images").remove([currentImage]);
  }
  return data;
}

/*
 1] Now if we were to attempt to call this function now, then actually nothing would happen.
 2] And the reason for that is we activated row level security on this table.
*/
export async function deleteCabin(id, imageName, cabin) {
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

  // Deleting the image name from the bucket, corresp. to the deleted row's image URL.
  // At the end of the function, after checking for a cabin error.

  if (imageName !== null && !cabin?.name.startsWith("copy of")) {
    const { error: imageError } = await supabase.storage
      .from("cabin-images")
      .remove([imageName]);

    if (imageError) {
      console.log(imageError);
      throw new Error(
        "Cabin deleted, but unable to delete image from the bucket"
      );
    }
  }
  return data;
}

//.... And so, we need to tell supabase what to delete from there.
// .eq("some_column", "someValue"); //& so here we basically select the row that we want to delete.
