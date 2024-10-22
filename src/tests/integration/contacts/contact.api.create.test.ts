import { test, expect } from "bun:test";
import type { ContactData } from "../../../types/contact/contactData";
import type { ContactInstructions } from "../../../types/contact/contactTypes";
import Tracker from "../../../tracker";

test('createContact creates a new contact successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the contact data
  const contact: ContactData = {
    fullname: 'Hello World',
  };

  // Define any instructions (optional)
  const instructions: ContactInstructions = {
    createCompanyIfNotExists: true,
    overwriteContact: false
  };

  // Call the createContact method
  const response = await tracker.contacts.createContact(contact, instructions);

  // Assertions
  expect(response).toBeTruthy();
  expect(response.message).toEqual("created");
  expect(response.recordName).toEqual(contact.fullname);
});