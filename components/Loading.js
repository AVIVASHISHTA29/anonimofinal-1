import {Circle} from "better-react-spinkit";
import Head from "next/head";

function Loading() {
    return (
        <div>
            <Head>
            <title>Anonimo</title>
            <meta name="description" content="Anonimo.fun is a website created and launched by Avi Vashishta in 2021. It is meant to be a completely harmless , just for fun chatting and inboxing website.
                    Features like anonymous inboxing allows users to send constructive messages to friends/co-workers anonymously." />

            <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

        </Head>
        <center style={{display: 'grid',placeItems:"center",height:"100vh"}}>
            <div>
               <img src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd" 
               alt="logo"
               height={150}
               style={{marginBottom:10}}
               />       
               <Circle color="#FFAE5F" size={60}/>      
            </div>
        </center>
        </div>
    )
}

export default Loading
