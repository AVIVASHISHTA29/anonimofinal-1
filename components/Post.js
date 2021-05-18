import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import {useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useState } from "react";
import TimeAgo from "timeago-react";

function Post({id,sender,message,time}) {

    const router = useRouter();
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',sender))
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const [user]= useAuthState(auth);
    const userChatRef = db.collection('chats').where('users','array-contains',user.email);
    
    const chatsId  = ()=>{
        var flag = false
       db.collection("chats").where('users','array-contains',user.email).get().then((docs)=>{
            docs.forEach((doc)=>{
                doc.data().users.forEach((user)=>{
                    if (user==sender){
                        flag = true
                        enterChat(doc.id)
                    }
            
                })

            })

            if (!flag){
                db.collection('chats').add({
                    users:[user.email,sender]
                })
                chatsId()

            }
        
       })
       
        
    }

    
    const enterChat =(Trueid)=>{
        if(Trueid)
        router.push(`/chat/${Trueid}`);
        else{
        router.push('/chats');
        }
    }

   

    return (
        <Container>
            
            <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            
            <div style={{alignItems:"center"}}>
                <div style={{float:"left", width:"100%", display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
                    {recipient?(
                        <Avatar 
                        src={recipient?.photoURL}
                        style={{height:60 , width:60 }}
                        />
                    ):(<Avatar 
                        src={recipient?.photoURL}
                        style={{height:60 , width:60}}
                        />)
                    }
                    <h3 style={{whiteSpace:"nowrap"}}>#{recipient?.userid}</h3>
                    <div style={{color:"grey",fontSize:"1.5vh",marginLeft:"auto",padding:"5px"}}>{time}</div>
                    <div style={{display:"flex",float:"right",padding:10,marginLeft:"auto"}}>
                    <button className="Post_Button" onClick={()=>chatsId()} style={{padding:"7px"}}>Chat</button>
                    <button className="Post_DelButton" onClick={()=>{db.collection('inbox').doc(id).delete()}}><DeleteOutlineIcon/></button>
                </div>
                </div>
                
            </div>
            
            <div style={{padding:"15px", textAlign:"left", color:"lightgrey"}}>{message}</div>
            </div>
        </Container>
    )
}

export default Post

const Container = styled.div`
    display:flex;
    align-items:center;
    cursor:pointer;
    padding-left:10px;
    word-break: break-word;
    border:1px solid #333333;
    border-radius:7px;
    margin-top:10px;
    justify-content:start;
    :hover{
        background-color:#333333;
    }
    padding:10px;

`;

const UserAvatar = styled(Avatar)`
    margin:5px;
    margin-right:15px;
`;