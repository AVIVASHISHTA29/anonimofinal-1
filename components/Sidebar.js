import { Avatar, Button } from "@material-ui/core";
import DrawerComp from "./DrawerComp";
import styled from "styled-components";
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import {useAuthState } from "react-firebase-hooks/auth";
import {useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import SendIcon from '@material-ui/icons/Send';
import { useState } from "react";

function Sidebar() {

    const [user]= useAuthState(auth);
    const userChatRef = db.collection('chats').where('users','array-contains',user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = ()=>{
        const input = prompt('Please enter an email adress for the user you wish to chat with.');

        if (!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !==user.email){
            // We need to add the chats into db and chat collection and bring stuff blah blah blah
            db.collection('chats').add({
                users:[user.email,input],
            })
        }

    }

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(chat =>chat.data().users.find(user => user == recipientEmail)?.length>0
        );

    return (
        <Container>
            <Header>
               {//<UserAvatar src={user.photoURL} onClick={()=> auth.signOut()}/>   
                }
                <DrawerComp></DrawerComp>  
                <div style={{display: 'flex' , alignItems: 'center' , padding:10 , color:"#333333"}}>
                    <NotificationsIcon style={{display:"none",paddingRight:5}}/>
                    <h3>Messages</h3>
                </div>


            </Header>

            <center style={{paddingTop:0}}>
               {//<button onClick={createChat}>Create a chat</button>
                }
            <div style={{alignItems:"center",display:"flex",flexDirection:"column",paddingTop:30}}>
                <h1>Chats</h1>
            </div>
                <div style={{border:"0px solid #333333",width:"90%"}}>
                {/* List of Chats */}
                {chatsSnapshot?.docs.map(chat=> 
                    <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
                    )}
                </div>
                <h5 style={{color:"#636262"}}>Share your Link with Friends to get Anonimous texts!</h5>
            </center>
  
        
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    margin-left:auto;
    margin-right:auto;
    height:100vh;
    width:100%;
    overflow-y:scroll;
    align-items:center;
    
    ::-webkit-scrollbar {
        display: none;
    }
    
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

`;

const SidebarButton = styled(Button)`
    width:50%;
    margin-left:auto !important;
    margin-right:auto !important;
    border-radius:7px;
    &&&{
        color:#333333;
        border:1px solid #FFAE5F;
        background-color:#FFAE5F;
    }
    
`;

const Header = styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:#FFAE5F;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom:1px solid #171717;
    margin-left:auto;
    margin-right:auto;

`;

const UserAvatar = styled(Avatar)`
cursor:pointer;

:hover{
    opacity:0.8;

}

`;

const IconsContainer = styled.div``;

const Search = styled.div`
    display:flex;
    align-items:center;
    padding:20px;
    border-radius:2px;
`;

const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
    color:#fff;
    background-color:#636262;
    padding:5px;
    padding-left:10px;
    margin-left:15px;

    ::placeholder{
        color: #fff;
        opacity: 1;
    }
    
`;

