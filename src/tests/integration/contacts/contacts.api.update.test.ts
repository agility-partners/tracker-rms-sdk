import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { ContactUpdateData } from "../../../types";

test('updateContact updates a contact successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    const contactId = 2001; 
    const updates: Partial<ContactUpdateData> = {
        firstname: 'John',
        department: 'Columbus',
        addressline1: '123 test street',
        businessphone: '4192023773'
    };

    // Call the updateContact method
    const response = await tracker.contacts.updateContact(contactId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}, 15000);