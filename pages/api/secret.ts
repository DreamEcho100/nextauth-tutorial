// This is an example of to protect an API route
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const api = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });

	if (session) res.send({ content: 'YO WHATS GOOD BRODIE.' });
	else res.send({ error: 'STRANGER DANGER ' });
};

export default api;
