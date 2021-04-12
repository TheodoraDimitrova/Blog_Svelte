<script>
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle
	} from 'sveltestrap';

	import { db } from '../firebase';
	import { collectionData } from 'rxfire/firestore';
	import { startWith } from 'rxjs/operators';
	import { fade, scale } from 'svelte/transition';
	import { posts } from './postStore';

	export let isEditing;
	export let title;
	export let showForm;
	export let author = '';
	export let id = '';
	export let postTitle = '';
	export let sortDesc = '';
	export let content = '';
	export let imageURL = '';
	export let category = '';
	export let uid='';
	export let likes=0;
	
	if (!isEditing) {
		postTitle = '';
		content = '';
		imageURL = '';
		sortDesc = '';
		category = '';
	}

	

	const savePost = () => {
		let newPost = {
			uid,
			postTitle,
			category,
			sortDesc,
			author,
			imageURL,
			content,
			likes: 0,
			date: Date.now()
		};
		
		posts.addPost([...$posts, newPost]);
		db.collection('posts').add(newPost);
		showForm = false;
		postTitle = '';
		content = '';
		imageURL = '';
		sortDesc = '';
		category = '';
	}
	const editPost = (event) => {
		let editedPost = {
			postTitle,
			category,
			sortDesc,
			imageURL,
			content,
			likes,
			date: Date.now()
		};
	

		db.collection('posts').doc(id).update(editedPost);
		let pos = $posts.findIndex((inx) => inx.id === event.detail.id);
		$posts.splice(pos, 1);
		posts.addPost([...$posts].editedPost);

		showForm = !showForm;
		postTitle = '';
		content = '';
		imageURL = '';
		sortDesc = '';
		category = '';
		likes=0;
	}
	const close = () => {
		showForm = !showForm
		isEditing = false
	}
</script>

<div in:scale out:fade>
	<Card class="mb-3" color="dark">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardBody>
			<CardText>
				<form>
					<input type="text" placeholder="Enter title" bind:value={postTitle} />
					<input type="text" placeholder="Image URL" bind:value={imageURL} />
					<input type="text" placeholder="Enter Summary" bind:value={sortDesc} />
					<select bind:value={category}>
						<option value="food" selected="selected">Choose category</option>
						<option value="impovement">Self impovement</option>
						<option value="motivation">Motivation</option>
						<option value="health">Health</option>
						<option value="productivity">Productivity</option>
					</select>
					<textarea placeholder="Enater the post content" bind:value={content} />
				</form>
			</CardText>

			<CardFooter>
				
				{#if isEditing}
					<Button color="warning" on:click={editPost}>Edit Post</Button>
				{:else}
					<Button color="success" on:click={savePost}>Save Post</Button>
				{/if}
			
				<Button on:click={close}>Cancel</Button>
			</CardFooter>
		</CardBody>
	</Card>
</div>

<style>
	input,
	textarea,
	select {
		width: 100%;
		margin-top: 10px;
	}
</style>
