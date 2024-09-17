import fs from 'fs';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano} from "@ton/ton";
import { google } from 'googleapis';

// Load the word list from the JSON file
const loadWordList = (filePath: string): string[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading word list from ${filePath}`);
        return []; // Return empty array if there's an error
    }
};

// Shuffle the array and extract a given number of items
const getRandomWords = (words: string[], count: number): string[] => {
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Convert the array to a space-separated string
const formatWordList = (words: string[]): string => {
    return words.join(' ');
};

async function getInfoWallet(auth:any, mnemonic: string) {
    try {
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    
        // Initialize TON RPC client on mainnet
        const endpoint = await getHttpEndpoint({ network: "mainnet" });
        const client = new TonClient({ endpoint });
        
        // Query balance from chain wallet.address
        const balance = await client.getBalance(wallet.address);
        const balanceMount = fromNano(balance);
        console.log("balance:", balanceMount);

        if(parseFloat(balanceMount)*1000>0){
            // Print wallet address
            const walletAddress = wallet.address.toString({ testOnly: false });
            console.log("address", walletAddress);
            await writeToSheet(auth, mnemonic, walletAddress, balanceMount)
        }
    } catch (error) {
        console.error("Error getting wallet info or writing to sheet");
    }
}

// Authenticate using Service Account JSON key
async function authenticate() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './service_account.json', // Path to your service account JSON key file
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        return await auth.getClient();
    } catch (error) {
        console.error("Error authenticating Google Sheets API");
        throw error; // Re-throw error to allow handling in the calling function
    }
}

// Write to Google Sheets
async function writeToSheet(auth: any, mnemonic: string, walletAddress: string, balanceMount: string) {
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = '1kp1VAy-Rh5r3lPWdlRfDtIlRz5UV1iIpYHYz6-2SGs4'; // Your spreadsheet ID
        const range = 'Sheet1!A1'; // Adjust this range based on where you want to write the data

        const request = {
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            requestBody: {
                values: [['000', mnemonic, walletAddress, balanceMount]],
            },
        };

        await sheets.spreadsheets.values.append(request);
        console.log(`Successfully wrote to Google Sheets for wallet ${walletAddress}`);
    } catch (error) {
        console.error("Error writing to Google Sheets");
    }
}

// Main function
async function main() {
    const wordList = loadWordList('wordList.json');
    let i = 0;
    while (true) {
        try {
            const randomWords = getRandomWords(wordList, 24);
            const result = formatWordList(randomWords);
            console.log("---------------------", i, "---------------------\n", result);
            i = i + 1;
            
            const auth = await authenticate();
            await getInfoWallet(auth, result);
        } catch (error) {
            console.error("An error occurred in the main loop");
            // Add a delay before retrying to avoid rapid error loops
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        // Ensure the loop cycle is approximately 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};

main().catch(console.error);