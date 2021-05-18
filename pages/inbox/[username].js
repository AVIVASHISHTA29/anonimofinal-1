import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../firebase';
import * as EmailValidator from "email-validator";
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import styled from 'styled-components';
import { useState } from 'react';
import Head from 'next/head';
import firebase from 'firebase';

function inboxing() {
    const router = useRouter()
    const [ post,setPost] = useState('');
    const { username } = router.query;
    const [user]= useAuthState(auth);
    const userInboxRef = db.collection('inbox').where('receiver','==',user.email);
    const [inboxSnapshot] = useCollection(userInboxRef);
    const [usersSnapshot] = useCollection(db.collection('users').where('username','==',username));
    const useremail = usersSnapshot?.docs?.[0]?.data().email;
    console.log(useremail)

    const createInbox = ()=>{
        const input_message = post;
        if(EmailValidator.validate(useremail) && useremail !==user.email){
            // We need to add the chats into db and chat collection and bring stuff blah blah blah
            db.collection('inbox').add({
                receiver:useremail,
                sender:user.email,
                message:input_message,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            })
            router.push(`/postinboxing`)
        }



    }

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
            <InputContainer>
            <h1>
                Drop In Your Message!
            </h1>
            <textarea
                  className="inputPost"
                  placeholder={`Write a text anonymously to ${username} :)`}
                  type="text"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
            <button className="sendbutton" onClick={createInbox}>Send</button>
            </InputContainer>      
        </div>
    )
}

const InputContainer = styled.div`

  margin-top:20px;
  background-color:#333333;
  width:90%;
  padding:20px;
  margin-right:auto;
  margin-left:auto;
  border-radius:7px;
`;

export default inboxing
