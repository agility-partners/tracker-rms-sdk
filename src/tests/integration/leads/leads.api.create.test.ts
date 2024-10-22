import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { LeadData } from "../../../types/lead/leadData";
import type { LeadInstructions } from "../../../types/lead/leadTypes";

test('createLead creates a new lead successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the lead data
  const lead: LeadData = {
    leadname: 'New Lead',
    fullname: 'John Doe',
    department: 'Sales',
    source: 'Website',
    description: 'Lead description',
    leadpersontype: 'N',
    company: 'Example Company',
    email: 'johndoe@example.com'
  };

  // Define any instructions (optional)
  const instructions: LeadInstructions = {
    createpersonifnotexists: true,
    notifydepartment: false
  };

  // Call the createLead method
  try {
    const response = await tracker.leads.createLead(lead, instructions);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.message).toEqual("success");
    expect(response.recordName).toEqual(lead.leadname)
    
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;  // Re-throw the error to fail the test
  }
}, 15000);
