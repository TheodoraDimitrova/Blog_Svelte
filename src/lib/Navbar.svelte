<script>
	import { createEventDispatcher } from 'svelte';
	import { authState } from 'rxfire/auth';
	import { googleProvider, auth } from '../firebase';
	import {
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		UncontrolledDropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Button
	} from 'sveltestrap';

	const dispatch = createEventDispatcher();
	let unsubscribed = authState(auth).subscribe((u) => (user = u));

	let user;
	let isEditing = false;
	let showForm = false;

	const newPostForm = () => {
		isEditing = false;
		showForm = true;
		dispatch('newPost', {
			isEditing,
			showForm,
			author: user.displayName
		});
	};
	const singout = () => {
		auth.signOut();
	};
	const login = () => {
		auth.signInWithPopup(googleProvider);
	};
</script>

<Navbar color="dark" light expand="md">
	<NavbarBrand href="/" class="mr-auto logo">BlogSvelte</NavbarBrand>

	<Nav class="ml-auto" navbar>
		{#if user}
			<NavItem>
				<NavLink><Button color="warning" on:click={newPostForm}>New Post</Button></NavLink>
			</NavItem>
			<NavItem>
				<NavLink><Button color="success" on:click={singout}>Sing out</Button></NavLink>
			</NavItem>
			<NavItem>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						<img src={user.photoURL} width="40" alt="photo" />
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>{user.displayName}</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>My profile</DropdownItem>

						<DropdownItem>Settings</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</NavItem>
		{:else}
			<NavItem>
				<NavLink><Button color="success" on:click={login}>Log in</Button></NavLink>
			</NavItem>
		{/if}
	</Nav>
</Navbar>

<style>
</style>
