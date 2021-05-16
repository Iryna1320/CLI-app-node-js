const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(console.table)
    .catch((erorr) => console.log(erorr.massage));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contact = contacts.find((contact) => contact.id === contactId);
      if (contact) {
        return contact;
      } else {
        return "Такого контакта нет!";
      }
    })
    .then(console.table)
    .catch((erorr) => console.log(erorr.massage));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const allContacts = contacts.filter(
        (contact) => contact.id !== +contactId
      );

      fs.writeFile(
        contactsPath,
        JSON.stringify(allContacts, null, 2),
        console.log("Контакт удален!")
      ).then(console.table(allContacts));
    })
    .catch((erorr) => console.log(erorr.massage));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const allContacts = [
        ...contacts,
        {
          id: contacts.length + 1,
          name: name,
          email: email,
          phone: phone,
        },
      ];

      fs.writeFile(
        contactsPath,
        JSON.stringify(allContacts, null, 2),
        console.log("Контакт добавлен!")
      );
    })
    .catch((erorr) => console.log(erorr.massage));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
