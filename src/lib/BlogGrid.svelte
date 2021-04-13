<script>
	import Form from '$lib/Form.svelte';
	import BlogCard from '$lib/BlogCard.svelte';
	import PostPreview from '$lib/PostPreview.svelte';
	import { Row, Col, Container } from 'sveltestrap';
    import {posts} from './postStore'

 
	export let showForm=false;
	export let author;
	export let isEditing=false;
	export let counter=0;
	let id;
	let showBlogPost;
	let postForPreview;
	let postForEditing;
	

	const handleDeletePost = (event) => {
		let pos = $posts.findIndex((inx) => inx.id === event.detail.id);
		$posts.splice(pos, 1);
		posts.addPost([...$posts]);
	};
	const handleShowPost = (event) => {
		showBlogPost = true;
		
		id = event.detail.id;

		let pos = $posts.findIndex((inx) => inx.id === id);
		postForPreview = $posts[pos];
	};
	const handleEditPost = (event) => {
		counter=event.detail.counter
		isEditing = event.detail.isEditing;
		showForm = event.detail.showForm;
		id = event.detail.id;
		let pos = $posts.findIndex((inx) => inx.id === id);
		postForEditing = $posts[pos];
		postForEditing.likes+=counter
	
	};
	const hidePostPreview=()=>{
		showBlogPost=false
	}
</script>

{#if showForm}
	<div class="container">
		<Form
		    {...postForEditing}
			bind:showForm={showForm}
			author={author}
			title="Create blog post"
			bind:isEditing={isEditing}
		/>
	</div>
{/if}

<div class="container">
	{#if showBlogPost}
		<PostPreview {...postForPreview} on:click={hidePostPreview}/>
	{/if}
	<Row>
		{#if $posts}
		{#each $posts as post}
			<Col>
			
				<BlogCard on:deletePost={handleDeletePost}
					{...post}
					on:showPost={handleShowPost}
					on:editPost={handleEditPost}/>
			</Col>
		{/each}
		{/if}
	</Row>
</div>

<style>
	.container {
		margin-top: 40px;
		width: 60%;
		margin-bottom: 40px;
	}
</style>
