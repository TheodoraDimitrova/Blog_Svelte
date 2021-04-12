<script>
    import { createEventDispatcher, onMount } from 'svelte';
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
		Icon,
		Container
	} from 'sveltestrap';

    const dispatch = createEventDispatcher();

	export let postTitle;
	export let category;
	export let sortDesc;
	export let author;
	export let imageURL;
	export let content;
	export let uid = '';
	export let date ='';
	export let id ='';
	export let likes = 0;
	let hide=false;
	
   
</script>

<div class="container-card" on:click>
	<Card class="mb-3" color="secondary">
        <img class='card-img' src="{imageURL}" alt="photo">
		<CardHeader>
			<CardTitle><h2>{postTitle}</h2></CardTitle>
		</CardHeader>
		<CardBody>
			<CardSubtitle>
				<Row>
					<Col><Icon name="card-text" />{sortDesc}</Col>
				</Row>
			</CardSubtitle>
			<CardText>
				{content}
			</CardText>
		</CardBody>
		<CardFooter>
			<Row>
				<Col><Icon name="person-fill" />{author}</Col>
			</Row>
			<Row>
				<Col><Icon name="book" /><span class="tag">{category}</span></Col>
			</Row>
		</CardFooter>
	</Card>
</div>

<style>
    .container-card{
        margin: 0 auto;
		margin-top: 40px;
		width: 60%;
	
    }
	.card-img {
		height: 400px !important;
		padding: 30px !important;
	}
	.tag {
		background: #ffc107;
		border-radius: 5px;
		text-align: center;
		width: 40%;
        padding: 0 20px;
        margin-left: 20px;
	}
</style>
