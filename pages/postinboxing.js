import {Avatar} from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState , useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Header from '../components/Header';
import  {auth}  from '../firebase';
import getUsername from '../utils/getUsername';


export default function postinboxing() {
    var [copybuttontext, setCopybuttontext] = useState("Copy");
    const router = useRouter();
    const [userLoggedIn] = useAuthState(auth);
    const textAreaRef = useRef(null);
  
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    alert("Link is Copied!");
  };

    return (
        <div>
            <Head>
            <title>Anonimo</title>
            <meta name="description" content="This is the About Page of Anonimo.fun" />
            <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
            <meta name="description" content="Anonimo.fun is a website created and launched by Avi Vashishta in 2021. It is meant to be a completely harmless , just for fun chatting and inboxing website.
        Features like anonymous inboxing allows users to send constructive messages to friends/co-workers anonymously." />

            </Head>

            <Header/>
            <div className="postinboxingContainer">
            <h1>
                Your Message Was Sent
            </h1>
            <center>
            <p style={{color:"#fff",opacity:"0.7",fontSize:15}}>
                Share your link with friends to receive anonymous texts.
            </p>
            <button className="sendbutton" onClick={()=>{router.push('/')}}>Home</button>
            </center>

           
            </div>

            <UpperContainer>
            
                <h4>Copy Your Link</h4>
                <div style={{alignItems:"center" , display:"flex", flexDirection:"column"}}>
                
                <form>
                    <textarea className="link_textarea"
                    ref={textAreaRef}
                    value={`www.anonimo.fun/inbox/${getUsername(userLoggedIn)}`}
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
            <Avatar 
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd"
                style={{height:150 , width:150 , marginRight:"auto" , marginLeft:"auto" , marginBottom:"5px" , marginTop:"10px"}}
            />    
            <p style={{fontSize:10 , textAlign:"center"}}>
                Copyright © 2021
                <br/>
                Made By Avi Vashishta
            </p>
                 
        </div>
    )
}



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

