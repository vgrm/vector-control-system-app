import Cookies from 'js-cookie';

export default function authHeader() {
  //const userCurrent = JSON.parse(localStorage.getItem("userCurrent"));

  const user = Cookies.get('userCurrent');
  const valueOrNull = (value = null) => value;
  const userCurrent = JSON.parse(valueOrNull(Cookies.get('userCurrent')));

  console.log("AUTH:", userCurrent);
  if (userCurrent) {
    return { Authorization: "Bearer " + userCurrent.token.token };
  }
  else return {};

  /*
  if (userCurrent && userCurrent.token) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + userCurrent.accessToken };
 
    // for Node.js Express back-end
    //return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
  */
}