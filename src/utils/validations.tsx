

// Valid email validation
export  const email = (value: string) =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
'Invalid email address' : undefined;

// Reqiured field Validation
export const required = (value:any) => value ? undefined : 'Required'

// Max length validaiton
const maxLength = (max: number) => (value: { length: number; }) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
  
export const maxLength15 = maxLength(15)

const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined

export const minValue10 = minValue(10)