import { join } from 'node:path'
import { readJsonFile } from '../../utils/fs.js'

const stockPath = join(...[process.cwd(), 'data', 'stock.json'])
const storePath = join(...[process.cwd(), 'data', 'store.json'])
const inventoryPath = join(...[process.cwd(), 'data', 'inventory.json'])



export async function buildProductData(){
    const inventory = await readJsonFile(inventoryPath)
    const stock = await readJsonFile(stockPath)

    return inventory.map(item => {

        const info = stock[item.code]

        if (info){
            return {
                ...item,
                ...info
            }
        }

        return item
    })
}