import { error, fail } from '@sveltejs/kit'
import { validateData } from '$lib/utils'
import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas'

export const actions = {
  updateEmail: async ({ request, locals }) => {
    const { formData, errors } = await validateData(await request(formData()), updateEmailSchema)

    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      })
    }

    try {
      await locals.pb.collection('users').requestEmailChange(formData.email)
    } catch (err) {
      throw error(err.status, err.message)
    }

    return {
      sucess: true
    }
  },

  updateUsername: async ({ request, locals }) => {
    const { formData, errors } = await validateData(await request(formData()), updateUsernameSchema)

    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      })
    }

    try {
      await locals.pb.collection('users').getFirstListItem(`username = "${formData.username}"`)
    } catch (err) {
      if (err.status === 404) {
        try {
          const { username } = await locals.pb.collection('users').update(locals.user.id, { username: formData.username })
          locals.user.username = username
          return {
            success: true
          }
        } catch (err) {
          console.log(err)
          throw error(err.status, err.message)
        }
      }
      console.log('Error: ', err)
      throw error(err.status, err.message)
    }
  }
}