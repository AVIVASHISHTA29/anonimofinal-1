import { Avatar, styled } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';

function postinboxing() {
    const router = useRouter();

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
                Your Message Was Sent!
            </h1>

            <button className="sendbutton" onClick={()=>{router.push('/')}}>Back</button>
            </div>
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

export default postinboxing


