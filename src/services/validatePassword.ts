export const validatePassword = (password: string) => {
    return /^.{6,}$/.test(password)
}