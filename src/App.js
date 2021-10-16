import {getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider,signOut  } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';


const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
initializeAuthentication();


function App() {
  const [user,setUser]=useState({});
  const auth = getAuth();   //this function must have inside the app() other its given error

  // this part is gitHub 

  const handleGitHubSignIn=()=>{
    signInWithPopup(auth, gitHubProvider)
    .then((result)=>{
      const {displayName,photoURL,email,uid}=result.user;
      const loggedInUser={
        name:displayName,
        img:photoURL,
        email: email,
        userId:uid
      }
      setUser(loggedInUser);
     // console.log(user);  // we do not get name and email from gitHub that's why name and email is not show on display .when we make only img tag its showing on tah display but concept is right.
     
    })
    .catch(error=>{
      const errorCode=error.code;
      console.log(errorCode);
    })

  }


  // this part is google 
  const handleGoogleSignIn=()=>{
    
    signInWithPopup(auth, googleProvider)
    .then((result)=>{
      const {displayName,email,photoURL,uid}=result.user;
      const loggedInUser={
        name:displayName,
        email:email,
        img: photoURL,
        userId:uid
      }
      setUser(loggedInUser);
      console.log(result.user);

    })
    .catch(error=>{
      const errorCode=error.code;
      console.log(errorCode);
    })
   


  }
  const handleSignOut=()=>{
    signOut(auth)
    .then(() => {
      setUser({});
    
    })
    .catch((error) => {
      console.log(error.code);
    });
  }
  return (
    <div className="App">
     {
      ! user.userId ?  <div>
       <button onClick={handleGoogleSignIn}> Google sign in</button>
       <button onClick={handleGitHubSignIn}> GitHub sign in</button>
       </div> : <button onClick={handleSignOut}>sign out</button>
     }
      
      
      <br />    
      {
        user.email && <div>    
          welcome {user.name}
          <h3>Your email: {user.email}</h3>
          <img src={user.img} alt="" />
        </div>
      }
      
    </div>
    
  );
}

export default App;
