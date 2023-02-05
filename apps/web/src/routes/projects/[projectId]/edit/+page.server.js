import { error } from '@sveltejs/kit'
import { serializeNonPOJOs } from '$lib/utils'

export const load = async ({ locals, params }) => {
  if (!locals.pb.authStore.isValid) {
    throw error(401, 'Unauthorized')
  }
  try {
    const project = serializeNonPOJOs(await locals.pb.collection('projects').getOne(params.projectId))

    if (locals.user.id === project.user) {
      return project
    } else {
      throw error(403, 'Forbidden')
    }
  } catch (err) {
    console.log('Error: ', err)
    throw error(err.status, err.message)
  }
}