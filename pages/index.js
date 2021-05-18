import { Avatar } from '@material-ui/core'
import Head from 'next/head'
import styled from 'styled-components';
import Header from '../components/Header';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, db } from '../firebase';
import { useRef, useState } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useCollection } from 'react-firebase-hooks/firestore';
import InboxList from '../components/InboxList';
import Cookies from 'cookies';



export default function Home({inboxSnapshot}) { 

  var [copybuttontext, setCopybuttontext] = useState("Copy")
  const [user] = useAuthState(auth);
  const textAreaRef = useRef(null);
  
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    alert("Link is Copied!");
  };

  const [userLoggedInSnapshot] = useCollection(db?.collection('users').where('email','==',user.email))
    
  const userLoggedIn = userLoggedInSnapshot?.docs?.[0]?.data();

  //console.log(userLoggedIn?.userid);
  return (
    <div>
      <Head>
        <title>Anonimo</title>
        <meta name="description" content="Anonimo.fun is a website created and launched by Avi Vashishta in 2021. It is meant to be a completely harmless , just for fun chatting and inboxing website.
        Features like anonymous inboxing allows users to send constructive messages to friends/co-workers anonymously." />
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>
      <Header/>

      <UpperContainer>
      <Avatar 
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd"
                style={{height:140 , width:140 , marginRight:"auto" , marginLeft:"auto" , marginBottom:"5px" , marginTop:"10px"}}
                />
      <h4>{user.email}</h4>
      <div style={{alignItems:"center" , display:"flex", flexDirection:"column"}}>
      
      <form>
        <textarea className="link_textarea"
          ref={textAreaRef}
          value={`www.anonimo.fun/inbox/${userLoggedIn?.username}`}
          readonly={true}
          onClick={(event) =>{
            event.preventDefault()
          }
          
          }
        />
      </form>
      {
       /* Logical shortcut for only displaying the 
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
       <div>
       <button className="buttoncopy" onClick={copyToClipboard}><strong>{copybuttontext}</strong></button> 
     </div>
      }

    </div>
      </UpperContainer>
      <div style={{alignItems:"center",display:"flex",flexDirection:"column",paddingTop:30}}>
      <AccountBoxIcon style={{display:"none",marginBottom:-20}}fontSize="large"/>
      <h1>Inbox</h1>
      </div>
        
        {/* List of Inboxes */}
        <InboxList inboxSnapshot={inboxSnapshot}/>
        
    </div>
  )
}

const InboxContainer =styled.div`
  background-color:#333333;
  width:90%;
  margin-left:auto;
  margin-right:auto;
  padding:10px;
`;

const UpperContainer = styled.div`

  margin-top:20px;
  background-color:#333333;
  width:max-content;
  padding:20px;
  margin-right:auto;
  margin-left:auto;
  border-radius:7px;

  >h4{
    text-align:center;
    padding-bottom:5px;
  }

`;


export async function getServerSideProps(ctx) {
  const cookie = new Cookies(ctx.req, ctx.res)
  const userEmail = cookie.get('auth');
  var userInboxRef = [];
  if (userEmail){
  await db.collection('inbox').where('receiver','==',userEmail).orderBy("timestamp","desc").get().then((docs)=>{
    docs.forEach((doc)=>{
      userInboxRef = [...userInboxRef, doc.data()]
    })

  });

  return{
    
      props: {
          data:"hi",
          inboxSnapshot:JSON.stringify(userInboxRef)
        
      }
  }
  }

  else{
    return{
        redirect: {
          permanent : false,
          destination : "/login"
        }
    }
  

  }

  

}