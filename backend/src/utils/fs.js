import fs from 'node:fs/promises'

/**
 * Reads the content of a file given its path.
 * @param {string} filePath - The path of the file to be read.
 * @returns {Promise<string>} - A promise that resolves to the content of the file.
 * @throws {Error} - If the file cannot be read.
 */
export async function readFileContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        throw new Error(`Unable to read file at ${filePath}: ${error.message}`);
    }
}


/**
 * Overwrites the content of a JSON file with new data.
 * @param {string} filePath - The path of the JSON file to be overwritten.
 * @param {Object} newData - The new data to write to the file.
 * @returns {Promise<void>} - A promise that resolves when the file has been overwritten.
 * @throws {Error} - If the file cannot be written.
 */
export async function overwriteJsonFile(filePath, newData) {
    try {
        // Convert the data to a JSON string
        const jsonData = JSON.stringify(newData, null, 2);

        // Write the JSON string to the file, overwriting the existing content
        await fs.writeFile(filePath, jsonData, 'utf-8');
    } catch (error) {
        throw new Error(`Unable to overwrite the file at ${filePath}: ${error.message}`);
    }
}


/**
 * Reads and parses the content of a JSON file.
 * @param {string} filePath - The path of the JSON file to be read.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON data.
 * @throws {Error} - If the file cannot be read or the content is not valid JSON.
 */
export async function readJsonFile(filePath) {
    try {
        // Read the content of the file
        const content = await fs.readFile(filePath, 'utf-8');

        // Parse the JSON content
        const jsonData = JSON.parse(content);

        return jsonData;
    } catch (error) {
        throw new Error(`Unable to read or parse the file at ${filePath}: ${error.message}`);
    }
}
