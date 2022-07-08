import { NextApiRequest, NextApiResponse } from 'next';

const api = (_req: NextApiRequest, res: NextApiResponse): void => {
	res
		.status(200)
		.json({ name: 'John Doe', email: 'JohnDoe@amiarealboy.test.com' });
};

export default api;
