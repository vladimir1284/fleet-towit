import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { z } from 'zod';
import { minioClient } from '$lib/minio';
export const load = (async({ params }) => {


}) satisfies PageServerLoad

export const actions = {
    default: async ({ request }) => {
      const formData = await request.formData();
  
      const file = formData.get('image');
      if (file instanceof File) {
        console.log('dadsdfsdfsdf', file);
        let buff = Buffer.from(await file.arrayBuffer())
        await minioClient.putObject('develop', file.name, buff)
        .finally(() => {console.log('fin')})
      }
  
      return {};
    }
  };


  