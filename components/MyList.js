import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import SendIcon from '@material-ui/icons/Send';
import { Avatar, Link } from "@material-ui/core";
import { auth } from '../firebase';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { removeUserCookie } from '../utils/usercookie';

function MyList() {
    const [user] = useAuthState(auth);
    return (

        user?(
            <List>
            <Avatar 
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(1).png?alt=media&token=672d2261-bca7-40b9-a086-6d8ea629e05c"
                style={{height:60 , width:60 , marginRight:"auto" , marginLeft:"auto" , marginBottom:"10px"}}
                />
                
              <Link href="/about" style={{color:"#fff" , display:"flex" , alignItems:"center" , textDecoration:"none"}}>
                <ListItem >
                      <ListItemIcon ><InfoIcon style={{color:"#fff"}} /></ListItemIcon>
                      <ListItemText primary="About" />
                </ListItem>
              </Link>
              <hr style={{color:"#636262" , width:"90%", opacity:0.2}}/>
              <Link href="/" style={{ color:"#fff" , display:"flex" , alignItems:"center", textDecoration:"none"}}>
                <ListItem>
                  
                      <ListItemIcon ><AccountCircleIcon style={{color:"#fff"}}/></ListItemIcon>
                      <ListItemText primary="Home" />
                </ListItem>
              </Link>

              <Link href="/chats" style={{ color:"#fff" , display:"flex" , alignItems:"center", textDecoration:"none"}}>
                <ListItem>
                  
                      <ListItemIcon ><SendIcon style={{color:"#fff"}}/></ListItemIcon>
                      <ListItemText primary="Chats" />
                </ListItem>
              </Link>
              <Link href="/" style={{color:"#fff" , display:"flex" , alignItems:"center", textDecoration:"none"}}>
              <ListItem onClick={()=> {auth.signOut(); removeUserCookie()}}>
                  
                      <ListItemIcon ><PowerSettingsNewIcon style={{color:"#fff"}}/></ListItemIcon>
                      <ListItemText primary="Logout" />
                </ListItem>
              </Link>

            </List>
        ):(
            <List>
            <Avatar 
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(1).png?alt=media&token=672d2261-bca7-40b9-a086-6d8ea629e05c"
                style={{height:60 , width:60 , marginRight:"auto" , marginLeft:"auto" , marginBottom:"10px"}}
                />
                
              <Link href="/about" style={{color:"#fff" , display:"flex" , alignItems:"center", textDecoration:"none"}}>
                <ListItem >
                      <ListItemIcon ><InfoIcon style={{color:"#fff"}} /></ListItemIcon>
                      <ListItemText primary="About" />
                </ListItem>
              </Link>
              <hr style={{color:"#636262" , width:"90%", opacity:0.2}}/>

              <Link href="/" style={{color:"#fff" , display:"flex" , alignItems:"center", textDecoration:"none"}}>
                <ListItem >
                      <ListItemIcon><AccountCircleIcon style={{color:"#fff"}} /></ListItemIcon>
                      <ListItemText primary="Login" />
                </ListItem>
              </Link>
            </List>
        )
        
    )
}

export default MyList
