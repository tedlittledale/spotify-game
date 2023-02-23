import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { customGet } from "../../utils/customGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = 'R.E.M.';
  const session = await getSession({ req });
  console.log({session})
  const searchResults = await customGet(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20`,
    session
  );
  console.log({ searchResults })
  res.status(200).json(searchResults);
}