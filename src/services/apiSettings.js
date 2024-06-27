import supabase from "./supabase";

export async function getSettings() {
  console.log("getSettings");

  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  console.log("setting data retrived", data);

  return data;
}

/* 
 1] The object that we will pass in here, is simply an object, with the column/field that needs to be updated with
    its new value.

 2] So, it doesn't have to be the complete new settings object, only the fields or the columns that we want to 
    update.

 3] Creating a new custom Hook for updating the settings.   

*/
// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  console.log("updateSettings");

  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
