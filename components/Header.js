import styled from "styled-components";
import DrawerComp from "./DrawerComp";
import { Avatar, Link } from "@material-ui/core";

function Header() {

    return (
        <Container>
            <DrawerComp></DrawerComp>
            <Link href="/" style={{color:"#333333" , textDecoration:"none"}}>
            <div className="LogoDiv">
                <h3 style={{marginRight:10}}>Anonimo</h3>
                <Avatar 
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-2-6f89f.appspot.com/o/Anonimo%20Logo%20(1).png?alt=media&token=672d2261-bca7-40b9-a086-6d8ea629e05c"
                style={{height:60 , width:60}}
                />
            </div>
            </Link>
        </Container>
    )
}

export default Header

const Container = styled.div`
    background-color:#FFAE5F;
    color:#333333;
    border-bottom:1px solid #636262;
    width:100%;
    position:sticky;
    padding:4px;
    padding-left:10px;
    padding-right:10px;
    top:0;
    text-align:left;
    display:flex;
    align-items:center;
    justify-content:space-between;
    z-index:1000;
`;
