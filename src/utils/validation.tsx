export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export interface ValidationError {
  field: string
  message: string
}

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!validateRequired(email)) {
    errors.push({ field: 'email', message: 'Email là bắt buộc' })
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Email không hợp lệ' })
  }

  if (!validateRequired(password)) {
    errors.push({ field: 'password', message: 'Mật khẩu là bắt buộc' })
  }

  return errors
}
