import Cookies from 'js-cookie';

export default function authHeader() {

  const valueOrNull = (value = null) => value;
  const userCurrent = JSON.parse(valueOrNull(Cookies.get('userCurrent')));

  if (userCurrent) {
    return { Authorization: "Bearer " + userCurrent.token.token };
  }
  else return {};
}