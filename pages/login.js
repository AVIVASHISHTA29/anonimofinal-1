import styled from "styled-components";
import Head from "next/head";
import { Avatar, Button, makeStyles, Modal } from "@material-ui/core";
import {auth,provider} from "../firebase";
import Header from "../components/Header";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUserCookie } from "../utils/usercookie";
import Cookies from "cookies";


function Login() {

    function getModalStyle() {
        const top = 50 ;
        const left = 50 ;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
          width:"90%",
          outline: 0,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: "#212121",
          border: '2px solid #636262',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          color:"#fff",
          alignItems:"center",
          borderRadius:"7px"
        },
      }));


    const user = useAuthState(auth);
    const [ open,setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [ password,setPassword] = useState('');
    const [ email,setEmail] = useState('');
    const [ confirmPassword,setConfirmPassword] = useState('');

    const signUp = (event)=>{
        event.preventDefault();

        if (confirmPassword != password){
            return alert("Password and Confirm Passwords do not match!");
        }
      
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
          return authUser.user.updateProfile({
            
          })
        })
        .catch((error)=>alert(error.message));
        
      }
      
      const signInWithEmail = (event) =>{
        event.preventDefault();
      
        auth.signInWithEmailAndPassword(email,password).then((result)=> {
          setUserCookie(result.user.email)})
        .catch((error)=>alert(error.message))
        
      
    }
    
    const signInWithGoogle = () =>{
        auth.signInWithRedirect(provider).catch(alert);
        auth
        .getRedirectResult()
        .then((result) => {
            console.log(result)
            setUserCookie(result?.user?.email);
        
    })
  }
    
    return (

        <Container>
            <Head>
                <title>Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd" />
                <meta name="description" content="Anonimo.fun is a website created and launched by Avi Vashishta in 2021. It is meant to be a completely harmless , just for fun chatting and inboxing website.
        Features like anonymous inboxing allows users to send constructive messages to friends/co-workers anonymously." />

            </Head> 
            
            <Header/>
            <LoginContainer>

            
            <h3>Login With Email</h3>
                <form className="SignupForm">
                    <center>

                <input
                  className="inputLogin"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                  className="inputLogin"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                    
                    
                    <button type="submit" onClick={signInWithEmail} className="button_login"><h3 style={{color:"#212121"}}>Log In</h3></button>
                    </center>
                </form>
          
            <p>or</p>

            <Button onClick={signInWithGoogle} variant="outlined" ><div className="googleLogin"><Avatar style={{padding:10}}src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/5847f9cbcef1014c0b5e48c8.png?alt=media&token=fe67ee6c-a33f-40a2-a5dd-f5c8e3d044dd"/><h3 style={{paddingRight:7}}>Log In With Google</h3></div></Button>
            <h5 onClick={()=>setOpen(true)} style={{color:"#FFAE5F",paddingBottom:20}}>Don't Have An Account? Click Here To Sign Up!</h5>
            </LoginContainer>





        <Modal
                open={open}
                onClose={()=>setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}>
        <div className="modalBox">
        <h3>Sign Up With Email</h3>
          <form className="SignupForm">

                <input
                  className="inputLogin" 
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />

                <input
                  className="inputLogin" 
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  className="inputLogin" 
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                <button type="submit" className="button_signup" onClick={signUp}><strong>Sign up</strong></button>

          </form>
          <p>or</p>

            <Button onClick={signInWithGoogle} variant="outlined" ><div className="googleLogin"><Avatar src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/5847f9cbcef1014c0b5e48c8.png?alt=media&token=fe67ee6c-a33f-40a2-a5dd-f5c8e3d044dd" style={{padding:10}}/><h3>Sign Up With Google</h3></div></Button>
            <h5 onClick={()=>setOpen(false)} style={{color:"#FFAE5F",paddingBottom:20}}>Have An Account Already? Click Here To Login!</h5>
          </div>
          

        </div>
      </Modal>

    
        </Container>
    )
}

export default Login

const Container = styled.div`
    
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction:column;
    padding:10px;
    background-color:#212121;
    align-items:center;
    border-radius:7px;
    border:1px solid #333333;
    margin-right:auto;
    margin-left:auto;
    margin-top:100px;
    width:400px;
    height:400px;
    color:#fff;

`;

export async function getServerSideProps(ctx) {
  const cookie = new Cookies(ctx.req, ctx.res)
  const userEmail = cookie.get('auth');
  
if (userEmail){
  return{
    redirect: {
      permanent : false,
      destination : "/"
    }
}
  }
  
  return {
    props:{

    }
  }

  

}


