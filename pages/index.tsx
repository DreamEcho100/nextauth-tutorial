import type { NextPage } from 'next';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
const Home: NextPage = () => {
	const { data: session, status } = useSession();

	console.group('session');
	console.dir(session);
	console.dir(status);
	console.log(getSession());
	console.groupEnd();

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
