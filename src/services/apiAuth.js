import supabase from "./supabase";

/*
1] Basically, on our supabase client, we can use the 'auth' submodule.
2] And so on here, we can call all kinds of method.  
   And the most basic one is the :- signInWithPassword
                                          |  
                                          |----------> This then accepts an object which contains the email 
                                                       & password of the user.

3] And so from now on ,on all the next requests supabase will automatically send this data(data) to the server to basically let
   supabase know that we are currently authenticated.
   
   supabase basically stores this data in local storage.   



*/

export async function login({ email, password }) {
  console.log("login");

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log(data);

  return data;
}

/*
 Q. Why do we actually need another function to load the user's data from supabase server ?
 --> see video: 3:40 to 

   1] Now, the thing is the user might want to access this page a bit later, so not only 
      immidiately after thay have logged in.
      
   2] So, in a web application even if you logged in like a day ago & if you then reload the 
      page you will still want to be logged in & not only immidiately after after you do
      that login process.
      
   3] And so then each time that you reload the page, for ex., a day later then that user
      will need to be refetched from the supabase API.
      
      And so then we can check if that user exists & if he/she is still authenticated or not.



*/

export async function getCurrentUser() {
  console.log("getCurrentUser");
  /*
    For this, first we actually need to check whether there is an active session or not & for that we use 
    getSession method.
    
    And so this will actually get that data form local storage (that we saw earlier)
  */

  const { data: session } = await supabase.auth.getSession();

  //If there is no session at all, then return null (so then there is really no current user )
  // (if we have current user inside local storage, then its an active session)
  if (!session.session) return null;

  //But if there is, then we can get that user again from supabase.
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log("user data retrived", data);

  //We are actually only interested in returning the user (object) itself
  return data?.user; //Now we will manage this state(info.) coming from backend, using React Query
}

//For implementing logging out functionality
export async function logout() {
  console.log("logout");

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  //This function doesn't return any data, therefore you don't need to return anything from this function.
  console.log("Successfully logged out");
}

//For signing up the users into our supabase sever.
export async function signup({ fullName, email, password }) {
  console.log("signup function");

  //? Save the current session before signing up a new user
  const { data: savedSessionData } = await supabase.auth.getSession();

  //This signUp function receives an object having email & password as properties.
  //However we can also pass in an options object
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    //For adding some optional data into the newly created user.
    options: {
      //Inside this options object, we can specify a field called data, which is then another object.
      data: {
        //In this object, we can pass in any kind of information that we want about this user.
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  //?Log the entire response for debugging
  console.log("Sign-up response:", { user, error });

  //~ If there was a previously authenticated user, restore their session
  //~ This action should be placed right after signUp, otherwise the authError will stop the restore
  if (savedSessionData) {
    await supabase.auth.setSession(savedSessionData.session);
  }

  //! Handle errors
  let authError = null;

  if (user && !user.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }

  if (authError) throw new Error(authError.message);

  // return data;
  return user;
  //So, this is enough to signup a user into supabase.
}

/*

!! It looks like the newly created user becomes the active user. How to avoid this?

export async function signUp({ fullName, email, password }) {
   ? Save the current session before signing up a new user
   const { data: savedSessionData } = await supabase.auth.getSession();

    const {
      data: { user },
      error,
      } = await supabase.auth.signUp({
           email,
           password,
           options: {
              data: {
                fullName,
                avatar: "", 
              },
            },
         });

  ? Log the entire response for debugging
  console.log("Sign-up response:", { user, error });

  ~ If there was a previously authenticated user, restore their session
  ~ This action should be placed right after signUp, otherwise the authError will stop the restore
    if (savedSessionData) {
      await supabase.auth.setSession(savedSessionData.session); 
     }

  ! Handle errors
   let authError = null;

   if (user && !user.identities.length) {
      authError = {
        name: "AuthApiError",
        message: "This email has already been registered",
      };
   } else if (error) {
      authError = {
      name: error.name,
      message: error.message,
     };
   }

   if (authError) throw new Error(authError.message);

   return user;
}



*/

// We will need a function to update our user

export async function updateCurrentUser({ password, fullName, avatar }) {
  console.log("updateCurrentUser func.");
  //1. Update password OR the fullName (we can not update the password & fullName at the same time)
  //So, the way we update the currently logged in user is with:-
  /*
    1] So, this will automatically know which user is currently logged in & then we can update that user.
    2] We need to pass in an object of all the stuff that needs to be updated.
    3] Remember that only one of these 2, can be true at the same time.
  */
  let updateData;
  if (password) updateData = { password };

  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log("fullName/password updated successfully");

  //If there is no avatar then we are already done, with the function at this point.
  if (!avatar) return data;

  //2. Upload the avatar image.
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3. update the avatar in user itself. (By adding the image URL to the appropriate user object/row, to the avatar image field)
  const { data: updatedUser, error: errorMessage } =
    await supabase.auth.updateUser({
      data: {
        //We need to replace this path 'acblackflag-1638989393641.jpg' with the actual fileName.
        // avatar: `https://acqtzlewrgwnsmyrswyp.supabase.co/storage/v1/object/public/avatars/acblackflag-1638989393641.jpg`,
        avatar: `https://acqtzlewrgwnsmyrswyp.supabase.co/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (errorMessage) throw new Error(errorMessage.message);

  console.log("Avatar has been updated");

  return updatedUser;
}
