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
	import { onErrorResumeNext } from 'rxjs';

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
	export let uid = '';
	export let likes = 0;
	export let date = '';



	let errors = { postTitle: '', sortDesc: '', category: '', content: '' };
	let valid = false;

	if (!isEditing) {
		postTitle = '';
		content = '';
		imageURL = '';
		sortDesc = '';
		category = '';
	}

	const validate = () => {
		valid = true;
		if (postTitle.trim().length < 5) {
			valid = false;
			errors.postTitle = 'This field is required';
		} else {
			errors.postTitle = '';
			errors.sortDesc = '';
			errors.category = '';
			errors.content = '';
		}
		if (sortDesc.trim().length < 3) {
			valid = false;
			errors.sortDesc = 'This field is required';
		} else {
			errors.sortDesc = '';
		}
		if (category.trim().length < 1) {
			valid = false;
			errors.category = 'This field is required';
		} else {
			errors.category = '';
		}
		if (content.trim().length < 10) {
			valid = false;
			errors.content = 'This field is required';
		} else {
			errors.content = '';
		}
		return valid;
	};

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

		valid = validate();

		if (valid) {
			posts.addPost([...$posts, newPost]);
			db.collection('posts').add(newPost);
			showForm = false;
			postTitle = '';
			content = '';
			imageURL = '';
			sortDesc = '';
			category = '';
		}
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
		valid = validate();

		if (valid) {
		
			db.collection('posts').doc(id).update(editedPost);
			let pos = $posts.findIndex((inx) => inx.id === event.detail.id);
			$posts.splice(pos, 1);
			
			posts.addPost([...$posts],editedPost);

			showForm = !showForm;
			postTitle = '';
			content = '';
			imageURL = '';
			sortDesc = '';
			category = '';
			likes = 0;
		}
	}
	const close = () => {
		showForm = !showForm;
		isEditing = false;
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
					<div class="error">{errors.postTitle}</div>
					<input type="text" placeholder="Image URL" bind:value={imageURL} />
					<input type="text" placeholder="Enter Summary" bind:value={sortDesc} />
					<div class="error">{errors.sortDesc}</div>
					<select bind:value={category}>
						<option value="" selected="selected">Choose category</option>
						<option value="impovement">Self impovement</option>
						<option value="motivation">Motivation</option>
						<option value="health">Health</option>
						<option value="productivity">Productivity</option>
					</select>
					<div class="error">{errors.category}</div>
					<textarea rows="5" placeholder="Enater the post content" bind:value={content} />
					<div class="error">{errors.content}</div>
				</form>
			</CardText>

			<CardFooter>
				{#if isEditing}
					<Button color="warning" on:click={editPost} type="submit">Edit Post</Button>
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
	.error {
		color: red;
	}
</style>
