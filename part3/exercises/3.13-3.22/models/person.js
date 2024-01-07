import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validatePhoneNumber(v)
      },
      message: (props) => {
        return generateErrorMessage(validatePhoneNumber, props)
      },
    },
  },
})

// Validation functions
const hasValidLength = (v) => v.length >= 8
const hasTwoPartsSeparatedByHyphen = (v) => v.split('-').length === 2
const hasValidFirstPart = (v) => /^\d{2,3}$/.test(v.split('-')[0])
const hasValidSecondPart = (v) => /^\d+$/.test(v.split('-')[1])

// Compose validation functions
const validatePhoneNumber = (v) =>
  hasValidLength(v) &&
    hasTwoPartsSeparatedByHyphen(v) &&
    hasValidFirstPart(v) &&
    hasValidSecondPart(v)

const generateErrorMessage = (validator, props) => {
  if (!validator(props.value)) {
    if (!hasValidLength(props.value)) {
      return `${props.value} is not a valid phone number. It should have a length of 8 or more.`
    }
    if (!hasTwoPartsSeparatedByHyphen(props.value)) {
      return `${props.value} is not a valid phone number. It should be formed of two parts separated by a hyphen.`
    }
    if (!hasValidFirstPart(props.value)) {
      return `${props.value} is not a valid phone number. The first part should have two or three numbers.`
    }
    if (!hasValidSecondPart(props.value)) {
      return `${props.value} is not a valid phone number. The second part should consist of numbers.`
    }
  }
  // Default error message
  return `${props.value} is not a valid phone number.`
}


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Person = mongoose.model('Person', personSchema)