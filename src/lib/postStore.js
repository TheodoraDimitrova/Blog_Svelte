import { writable } from 'svelte/store'

function postsStore() {
    const { subscribe, set, update } = writable([{
       
    }])

    return {
        subscribe,
        addPost: (updatedPost) => set(updatedPost)

    }


}
export const posts = postsStore()