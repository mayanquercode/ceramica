import { buildProductData } from '../helpers/index.js';

export default class GetOneProduct{
    static async run(req, res) {
        try {
            const {code} = req.params

            const data = await buildProductData()

            const product = data.find(item => item.code === code)

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}
