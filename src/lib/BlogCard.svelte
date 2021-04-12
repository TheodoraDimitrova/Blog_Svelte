<script>
	import { createEventDispatcher } from 'svelte';
	import {authState} from 'rxfire/auth'
    import {googleProvider, auth } from '../firebase'
	import { db } from '../firebase';
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		CardImg,
		Row,
		Col,
		Icon
	} from 'sveltestrap';

	
	const dispatch = createEventDispatcher();
	let unsubscribed=authState(auth).subscribe(u=>user=u)

	
	let isEditing = false;
	let showForm = false;
	let showPost =false;
	let user;
	
	
	export let postTitle="";
	export let category="";
	export let sortDesc="";
	export let author="";
	export let imageURL="";
	export let content="";
	export let id = '';
	export let uid = '';
	export let likes=0;
	export let date="";
	let counter=0

	

	const showBlogPost = () => {
		showPost=!showPost
		counter+=1
	
		dispatch('showPost', {
			showPost,
			id,
			isEditing,
			likes:counter
		})
	}
	
	const editBlogPost = () => {		
		showForm=true
		isEditing=true
		dispatch('editPost', {
			id,
			showForm,
			isEditing,
			counter		
		})
		document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
	}
	const delBlogPost = () => {
		db.collection('posts').doc(id).delete();
		dispatch('deletePost', {
			id
		})
	}


</script>


	<Card class="mb-4" style="width: 18rem;" color="secondary">
		<img src={imageURL} alt="post_photo" style="height: 180px;" on:click={showBlogPost} />
		<CardHeader>
			<CardTitle>{postTitle}</CardTitle>
		</CardHeader>
		<CardBody>
			<CardSubtitle>
				<Row>
					<Col><Icon name="person-fill" />{author}</Col>
				</Row>
			</CardSubtitle>
			<CardText>
				{sortDesc}
				<Row>
					<div class="col icon"><Icon name="eye" />{likes+counter}</div>
					Category:
					<Col>
						<span class="tag">{category}</span>
					</Col>
				</Row>
			</CardText>
		</CardBody>
		<CardFooter>
			<Row>
				<div class="col icon"><Icon name="heart" /></div>
				{#if user}
				<div class="col icon" on:click={editBlogPost}><Icon name="pen-fill" /></div>
				<div class="col icon" on:click={delBlogPost}><Icon name="trash" /></div>
				{/if}
			</Row>
		</CardFooter>
	</Card>


<style>
	.icon {
		cursor: pointer !important;
		text-align: center;
	}
	.tag {
		background: #ffc107;
		border-radius: 5px;
		text-align: center;
		width: 40%;
        padding:  10px;
        margin-left: 20px;
	}
</style>
