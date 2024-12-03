import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { ContactData, CreateContactOptions } from "../../../types";

test('createContact creates a new contact successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the contact data
  const contact: ContactData = {
    fullname: 'Hello World',
    company: 'Microsoft',
    customfields: [
      {
        id: 50,
        value: 'Custom Value'
      }
    ]
  };

  // Define any instructions (optional)
  const instructions: CreateContactOptions = {
    createcompanyifnotexists: true,
    overwritecontact: false
  };

  // Call the createContact method
  const response = await tracker.contacts.createContact(contact, instructions);

  // Assertions
  expect(response).toBeTruthy();
  expect(response.message).toEqual("created");
  expect(response.recordName).toEqual(contact.fullname);
});