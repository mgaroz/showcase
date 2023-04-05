// const { randomBytes } = await import('node:crypto')

export const serializeNonPOJOs = obj => {
  return structuredClone(obj)
}

const generateRandomHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const generateUsername = name => {
  // const id = randomBytes(2).toString('hex')
  const id = generateRandomHex(2)
  return `${name.slice(0, 5)}${id}`
}

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
  return `https://better-exabyte.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}

export const validateData = async (formData, schema) => {
  const body = Object.fromEntries(formData)

  try {
    const data = schema.parse(body)
    return {
      formData: data,
      errors: null
    }
  } catch (err) {
    console.log('Error: ', err);
    const errors = err.flatten()
    return {
      formData: body,
      errors
    }
  }
}