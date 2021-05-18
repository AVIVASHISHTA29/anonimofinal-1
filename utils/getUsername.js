var usernameArray = "";
const getUsername = (user) =>{

 usernameArray = user.email.split('@',1);

 return usernameArray[0];
}

export default getUsername;