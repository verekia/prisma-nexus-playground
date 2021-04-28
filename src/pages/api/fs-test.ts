import fs from 'fs'

import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  fs.writeFileSync('test.txt', 'kikoo')
  res.status(200).json({ name: 'John Doe' })
}
