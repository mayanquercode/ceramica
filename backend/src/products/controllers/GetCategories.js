import { join } from 'node:path'
import { readFileContent } from '../../utils/fs.js';

const storePath = join(...[process.cwd(), 'data', 'store.json'])

export default class GetCategories {
    static async run(req, res) {
        try {

            const contentStore = await readFileContent(storePath);
            const store = JSON.parse(contentStore)
            
            res.status(200).json(store.categories);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}
