import { join } from 'node:path'
import { readFileContent } from '../../utils/fs.js';
import { buildProductData } from '../helpers/index.js';

const storePath = join(...[process.cwd(), 'data', 'store.json'])
const inventoryPath = join(...[process.cwd(), 'data', 'inventory.json'])

export default class GetProductsByCategory {
    static async run(req, res) {
        try {

            const {code} = req.params

            const contentStore = await readFileContent(storePath);
            const store = JSON.parse(contentStore)
            
            const category = store.categories[code]

            if(!category){
                res.status(404).json({
                    error: `Category not found`
                })
                return
            }


            const inventory = await buildProductData()
            const products = inventory.filter(item => item.category === category.name)

            const page = parseInt(req.query.page, 10);

            if (!page){
                res.status(200).json(products)
                return
            }

            const limit = 20;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const paginatedData = products.slice(startIndex, endIndex);

            res.status(200).json({
                currentPage: page,
                totalItems: products.length,
                totalPages: Math.ceil(products.length / limit),
                data: paginatedData
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}
