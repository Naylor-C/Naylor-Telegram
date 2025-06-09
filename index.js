const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const readline = require("readline");

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

    // Checks if it's a private message (from user or bot)
    if (event.isPrivate) {
      // prints sender id
      console.log(message.senderId);
      // read message
      if (message.text == "hello") {
        const sender = await message.getSender();
        console.log("sender is", sender);
        await client.sendMessage(sender, {
          message: `hi your id is ${message.senderId}`
        });
      }
    }
  }
  // adds an event handler for new messages
  client.addEventHandler(eventPrint, new NewMessage({}));






})();