import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Post from './Post';
import * as EmailValidator from "email-validator";
import moment from 'moment';
import parseMilliseconds from 'parse-ms';

function InboxList({inboxSnapshot}) {

    const inbox = JSON.parse(inboxSnapshot);
    const [user]= useAuthState(auth);
    const prettyMilliseconds = require('pretty-ms');
    return (
        <center>
            <div style={{border:"0px solid #333333",width:"90%"}}>
                {/* List of Inbox Posts */}
                
                {inbox?.map(inboxpost=> 
                    
                    <Post key={inboxpost.id} id={inboxpost.id} sender={inboxpost.sender} message={inboxpost.message} />
                    )}
            </div>
                    {//<button onClick={createInbox}>Create Inbox</button>
                    }
                    <h5 style={{color:"#636262"}}>Share your Link with Friends to get Anonimous texts!</h5>
        </center>
    )
}

export default InboxList



