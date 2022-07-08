import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
const Home: NextPage = () => {
	const { data: session, status } = useSession();

	console.log('session', session);

	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}
	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<button type='button' onClick={() => signOut()}>
					Sign out
				</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button type='button' onClick={() => signIn()}>
				Sign in
			</button>
		</>
	);
};

export default Home;
