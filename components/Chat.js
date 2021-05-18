import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import {useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Chat( {id,users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',getRecipientEmail(users,user)))
    const recipientEmail = getRecipientEmail(users,user);
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const enterChat =()=>{
        router.push(`/chat/${id}`)
    }


    return (
        <Container>
            <div style={{alignItems: 'center'}}>
                <div style={{float:"left", width:"50%", display:"flex", alignItems:"center"}}>
                    {recipient?(
                        <Avatar 
                        src={recipient?.photoURL}
                        style={{height:60 , width:60}}
                        />
                    ):(<Avatar 
                        src={recipient?.photoURL}
                        style={{height:60 , width:60}}
                        />)}
                    
                    <h3 style={{color:"#fff"}}>#{recipient?.userid}</h3>
                </div>
                <div style={{display:"flex",float:"right",marginLeft:"auto",paddingTop:10}}>
                    <button className="EnterChat_Button" onClick={enterChat} style={{padding:"7px"}}>Chat</button>
                <button className="Post_DelButton" onClick={()=>{db.collection('chats').doc(id).delete()}}><DeleteOutlineIcon/></button>
                </div>

            </div>
            

        </Container>
    )
}

export default Chat

const Container = styled.div`
    display:flex;
    flex-direction:column;
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