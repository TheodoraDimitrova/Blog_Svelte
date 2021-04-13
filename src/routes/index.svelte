<script>
	import Counter from '$lib/Counter.svelte';
	import BlogGrid from '$lib/BlogGrid.svelte';
	import Navbar from '$lib/Navbar.svelte';

	

	import { db } from '../firebase';
	import { collectionData } from 'rxfire/firestore';
	import { startWith } from 'rxjs/operators';
	import { posts } from '../lib/postStore';

	let isEditing;
	let showForm;
	let author;
	
	

	const showNewPostForm = (event) => {
		isEditing = event.detail.isEditing;
		showForm = event.detail.showForm;
		author = event.detail.author;
	}
   
	const query = db.collection('posts').orderBy('date');
	const allPosts = collectionData(query, 'id').pipe(startWith([]));
     allPosts.forEach(post => {
		 posts.addPost(post)
	 })
	
	
</script>

<main>
	<Navbar on:newPost={showNewPostForm} />
	<BlogGrid bind:showForm={showForm} bind:isEditing={isEditing} author={author} />
</main>
