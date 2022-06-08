const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.log(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const idContact = contacts.find((contact) => contact.id === contactId);
  if (!idContact) {
    return null;
  }
  return idContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const ID = contacts.findIndex((contact) => contact.id === contactId);
  if (ID === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(ID, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
