export default function checkErrors(obj) {
  let noError = true;
  let errors = Object.values(obj).flat();
  errors.forEach(val => {
    val.length > 0 && (noError = false)
  })
  return noError;
}

