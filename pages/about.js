import { Avatar, Link } from "@material-ui/core";
import Head from "next/head"
import { useRouter } from "next/router";
import Header from "../components/Header"

function about() {
    const router = useRouter();
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
            
       <div className="postinboxingContainer" style={{marginBottom:20}}>
            <center>
            <Avatar
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/avi.jpeg?alt=media&token=848360de-bfd7-4520-9c68-8730f458659f"
                style={{height:150 , width:150 , marginRight:"auto" , marginLeft:"auto" , marginBottom:"10px" , marginTop:"10px"}}
            />
            <h3>Avi Vashishta</h3>
            
            <p style={{pading:20}}>
            An 18 year old young entrepreneur and a CS student at IIITD , who's also a self taught Web Designer/Developer, a Game Developer, an Author and an Android App Developer. He was one of the first Teen Brand Ambassadors of Fampay and manages Social Media handles of a budding startup called Memboro.com and has worked as a content-writer for them aswell.
            </p>
            <Link href="https://avivashishta.netlify.app/"><button className="sendbutton" style={{width:"100px",fontWeight:"bold"}}>Portfolio</button></Link>
            </center>
        </div>   

         <Avatar 
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(2).png?alt=media&token=e4392320-1885-4f13-922e-e0672b876ebd"
                style={{height:150 , width:150 , marginRight:"auto" , marginLeft:"auto" , marginBottom:"5px" , marginTop:"10px"}}
            />    
            <p style={{fontSize:10 , textAlign:"center",color:"#636262"}}>
                Copyright © 2021
                <br/>
                Made By Avi Vashishta
            </p>
        </div>
        
    )
}

export default about
