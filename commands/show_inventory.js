const fetch = require('node-fetch');

const name = 'inventory';

const {
  BASE_USER_URL,
  BASE_INSPECT_URL,
} = require('../constants');

const help =
  'To view augs in your inventory, type `!inventory [username]`.';

const execute = async (message) => {
  const username = message.content.split(' ')[1];
  const res = await fetch(`${BASE_USER_URL}${username}`);
  const resp = await res.json();

  if (resp.error) {
    return message.reply(`unable to find a user named \`${username}\`.`);
  }
  // For each inventory item, reply with the item name and xrpackage link
  resp.inventory.forEach((element, i) => {
    message.channel.send({
      embed: {
        title: `${username} Inventory - ${element.name}`,
        url: `${BASE_INSPECT_URL}?p=${element.name}`,
      },
    });
  });
};

module.exports = {name, help, execute};
