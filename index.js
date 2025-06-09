const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const readline = require("readline");

const fs = require("fs");
const path = require("path");


// Sistema de Comandos:
const commands = new Map();
const foldersPath = path.join(__dirname, 'Commands');


// Carregar comandos apenas se a pasta existir
if (fs.existsSync(foldersPath)) {
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
        console.log(`Comando carregado: ${command.data.name}`);
      } else {
        console.log(`[AVISO] O comando em ${filePath} está faltando "data" ou "execute"`);
      }
    }
  }
} else {
  console.log('[AVISO] Pasta de comandos não encontrada. Ignorando sistema de comandos.');
}



// Connect:
const { apiId, apiHash } = require('./config.json');


// fill this later with the value from session.save()
const storeSession = new StoreSession("folder_name");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


//Main:
(async () => {
  //Incio:
  console.log("Loading interactive example...");

  const stringSession = new StringSession('');

  const client = new TelegramClient(
    stringSession,
    apiId,
    apiHash, {
    connectionRetries: 5,
  }
  );

  //Event de Conexão:
  await client.start({

    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),

    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),

    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),

    onError: (err) => console.log(err),

  });

  //Function de Client if good:
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Services On!" });


  client.addEventHandler((update) => {

    console.log("Received new Update");
    console.log(update);

  });

  //Event De Messagens:
  async function eventPrint(event) {

    const message = event.message;
    const text = message.text;
    const jid = message.senderId;
    const sender = await message.getSender();



    // Verificar se é um comando
    if (text.startsWith('/')) {

      const args = text.slice(1).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (commands.has(commandName)) {
        try {
          await commands.get(commandName).execute(client, message, sender);

          // prints sender id
          console.log(jid);
          console.log("sender is", sender);

        } catch (error) {

          console.error('Erro ao executar comando:', error);
          await sock.sendMessage(sender, { text: '❌ Ocorreu um erro ao executar o comando' });

        }
      }
    }


  }

  // adds an event handler for new messages
  client.addEventHandler(eventPrint, new NewMessage({}));






})();