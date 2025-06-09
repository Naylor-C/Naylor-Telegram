module.exports = {
    data: {
        name: 'ping',
    },

    async execute(client, message, sender) {
        await client.sendMessage(sender, 
            {
              message: `Pong ${message.senderId}`
            }
        );
    
},
};