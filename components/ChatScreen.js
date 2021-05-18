import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {useCollection}  from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import DrawerComp from "./DrawerComp";
import Head from "next/head";

function ChatScreen({chat,messages}) {

    useEffect(() => {
        ScrollToBottom();
    }, [])

    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"));

    const [input,setInput] = useState("");

    const endOfMessagesRef = useRef(null);

    const showMessages = ()=>
    {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) =>(

                <Message 
                key={message.id} 
                user={message.data().user}
                message = {{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ))
    
            
        } else{
            return JSON.parse(messages).map(message=>(
                <Message key={message.id} user={message.user} message={message}/>
            ))

        }

    
    }


    const ScrollToBottom = () =>{
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start",
        })
    }


    const sendMessage = (e)=>{
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen : firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true})
    
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user: user.email,
            photoURL: user.photoURL,
        })

        setInput("");
        ScrollToBottom();

    }

    const recipientEmail = getRecipientEmail(chat.users , user);

    const [recipientSnapshot] = useCollection(db?.collection('users').where('email','==',getRecipientEmail(chat.users,user)));
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    return (
        <Container>
             <Head>
                <title>Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(1).png?alt=media&token=672d2261-bca7-40b9-a086-6d8ea629e05c" />

            </Head> 
            <Header>
                <DrawerComp></DrawerComp>
                <div style={{display: 'flex' , alignItems: 'center'}}>
                    {/*recipient ?(
                        <Avatar style={{backgroundColor:"#333333" , color:"whitesmoke" , marginLeft:10}}>{recipientEmail[0]}</Avatar>
                    ):(
                        <Avatar>{recipientEmail[0]}</Avatar>
                    )*/}

                    <HeaderInformation>
                        <h3>#{recipient?.userid}</h3>
                        {recipientSnapshot?(
                            <div>Last Seen : {' '}
                            {recipient?.lastSeen?.toDate()?(
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                            ):("Unavailable")}
                            </div>
                        ):(
                            <div>Loading Last Active</div>
                        )}
                    
                    </HeaderInformation>
                </div>
                

            </Header>

            <MessageContainer>
                {/* Show Messages */}
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef}/>
            </MessageContainer>

            <InputContainer>
                <Input placeholder="Send A Message Anonymously..." value={input} onChange={e=>setInput(e.target.value)} />
                <button disabled={!input} type="submit" className="button_send" onClick={sendMessage}>Send</button>
            </InputContainer>
        </Container>
    )

}

    export default ChatScreen;



const Container = styled.div`

`;

const Input = styled.input`
    flex:0.95;
    align-items:center;
    position:sticky;
    padding:10px;
    bottom:0;
    background-color:#636262;
    border:none;
    border-radius:7px;
    color:#fff;

    ::placeholder{
        color:#fff;
        opacity:0.4;
    }

`;

const InputContainer = styled.form`

    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:#333333;
    z-index:100;
    padding-left:15px;
`;

const MessageContainer = styled.div`
    padding:30px;
    background-color:#212121;
    min-height:90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom:50px;
`;

const Header = styled.div`
    position:sticky;
    color:#333333;
    background-color:#FFAE5F;
    z-index:100;
    top:0;
    display:flex;
    justify-content:space-between;
    padding:4px;
    height:auto;
    align-items:center;
    border-bottom:1px solid #171717;

`;

const HeaderInformation = styled.div`
    margin-left:15px;
    display:flex;
    flex-direction:column;
    padding:10;

    >h3{
        margin-top:10px;
        padding-right:50px;
        line-height:0.5;
        margin-bottom:10px;
    }
    >div{
        font-size:10px;
        color:#171717;
    }

`;

const HeaderIcons = styled.div``;