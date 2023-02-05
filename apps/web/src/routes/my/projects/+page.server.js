import { error, redirect } from '@sveltejs/kit'
import { serializeNonPOJOs } from '$lib/utils'

export const load = ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/login')
  }

  const getUsersProjects = async userId => {
    try {
      const projects = serializeNonPOJOs(await locals.pb.collection('projects').getFullList(undefined, {
        filter: `user = "${userId}"`
      }))
    } catch (err) {
      console.log('Error: ', err);
      throw error(err.status, err.message)
    }
  }

  return {
    projects: getUsersProjects(locals.user.id)
  }
}