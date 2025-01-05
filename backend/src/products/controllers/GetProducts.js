import { buildProductData } from '../helpers/index.js';

export default class GetProducts {
    static async run(req, res) {
        try {
            const data = await buildProductData()
            const page = parseInt(req.query.page, 10);

            if (!page) {
                res.status(200).json(data)
                return
            }

            const limit = 20;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const paginatedData = data.slice(startIndex, endIndex);

            res.status(200).json({
                currentPage: page,
                totalItems: data.length,
                totalPages: Math.ceil(data.length / limit),
                data: paginatedData
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}
