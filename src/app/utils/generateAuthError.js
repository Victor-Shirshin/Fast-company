export function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "или пароль введены не корректно";
    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    default:
      return "Слишком много попыток ввода. Попробуйте позднее";
  }
}