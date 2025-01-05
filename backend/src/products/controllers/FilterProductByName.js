import { buildProductData } from '../helpers/index.js';

export default class FilterProductByName {
    static async run(req, res) {
        try {
            const { category, searchTerm } = req.body;

            // Validar que searchTerm esté presente
            if (!searchTerm) {
                return res.status(400).json({
                    error: '"searchTerm" is required in the request body.'
                });
            }

            // Obtener los productos según la categoría
            let products = await buildProductData();

            if (category) {
                products = products.filter(item => item.category === category);
            }

            // Convertir searchTerm a minúsculas para comparación insensible a mayúsculas/minúsculas
            const lowerSearchTerm = searchTerm.toLowerCase();

            // Filtrar productos por el término de búsqueda
            const data = products.filter(product =>
                product.name.toLowerCase().includes(lowerSearchTerm)
            );

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}
