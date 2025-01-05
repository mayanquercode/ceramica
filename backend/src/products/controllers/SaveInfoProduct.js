import { join } from 'node:path'
import { readJsonFile, overwriteJsonFile } from '../../utils/fs.js';

const stockPath = join(...[process.cwd(), 'data', 'stock.json'])

export default class SaveInfoProduct {
    static async run(req, res) {
        try {
            const {code} = req.params

            const { boxAverage, pieceAverage, piece, image } = req.body;

            if (boxAverage === undefined || pieceAverage === undefined || piece === undefined) {
                return res.status(400).json({
                    error: 'Missing required properties: boxAverage, pieceAverage, and piece are required.'
                });
            }

            const response = {
                boxAverage,
                pieceAverage,
                piece,
                image: image || ''
            };

            // buscar si esta el objeto
            const stock = await readJsonFile(stockPath)
            
            stock[code] = response

            await overwriteJsonFile(stockPath, stock)

            res.status(201).json({
                message: 'Information saved successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }
}