import { join } from 'node:path';
import { readJsonFile, overwriteJsonFile } from '../../utils/fs.js';

const stockPath = join(...[process.cwd(), 'data', 'stock.json']);

export default class UpdateInfoProduct {
    static async run(req, res) {
        try {
            const { code } = req.params;

            // Validar que el parámetro code esté presente
            if (!code) {
                return res.status(400).json({
                    error: 'Parameter "code" is required.'
                });
            }

            // Lista de propiedades permitidas
            const allowedProperties = ['boxAverage', 'pieceAverage', 'piece', 'image'];

            // Validar que no haya propiedades adicionales en el cuerpo
            const invalidProperties = Object.keys(req.body).filter(
                (key) => !allowedProperties.includes(key)
            );

            if (invalidProperties.length > 0) {
                return res.status(400).json({
                    error: `Invalid properties in request body: ${invalidProperties.join(', ')}. Only allowed properties are: ${allowedProperties.join(', ')}.`
                });
            }

            const { boxAverage, pieceAverage, piece, image } = req.body;

            if (boxAverage === undefined && pieceAverage === undefined && piece === undefined && image === undefined) {
                return res.status(400).json({
                    error: 'At least one property (boxAverage, pieceAverage, piece, or image) is required.'
                });
            }

            const stock = await readJsonFile(stockPath);

            // Verificar si el producto existe
            if (!stock[code]) {
                return res.status(404).json({
                    error: `Product with code "${code}" not found.`
                });
            }

            // Actualizar las propiedades permitidas
            const existingProduct = stock[code];
            const updatedProduct = {
                ...existingProduct,
                ...(boxAverage !== undefined && { boxAverage }),
                ...(pieceAverage !== undefined && { pieceAverage }),
                ...(piece !== undefined && { piece }),
                ...(image !== undefined && { image })
            };

            stock[code] = updatedProduct;

            await overwriteJsonFile(stockPath, stock);

            res.status(200).json({
                message: 'Information updated successfully',
                updatedProduct
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}
