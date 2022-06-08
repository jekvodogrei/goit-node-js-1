const operations = require("./contacts");
const argv = require("yargs/yargs")(process.argv.slice(2)).option("id", {
  type: "string",
}).argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsData = await operations.listContacts();
      console.log("list", contactsData);
      break;

    case "get":
      const nameId = await operations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.log("get", nameId);
      break;

    case "add":
      const newContact = await operations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await operations.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
