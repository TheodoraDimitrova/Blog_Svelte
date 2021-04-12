import { writable } from 'svelte/store'

function createStore() {
    const { subscribe, set, update } = writable([{
        // author: "Theodora Dimitrova",
        // category: "fitness",
        // content: "erferwfew4frwef",
        // date:1617883362855,
        // imageURL: "",
        // likes: 0,
        // postTitle: "vgbfrvdr",
        // sortDesc: "refw4eafre"
    }])

    return {
        subscribe,
        addPost: (updatedPost) => set(updatedPost)

    }


}
export const posts = createStore()