export default function validLength (str) { 
  return str.length < 20 || str.length > 50 ? false : true
};