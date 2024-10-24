import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { 
  LeadData,
  CreateLeadOptions,

} from "../../../types/lead";

test('createLead creates a new lead successfully', async () => {
    const tracker = new Tracker();

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

    const instructions: CreateLeadOptions = {
        createpersonifnotexists: true,
        notifydepartment: false
    };

    const response = await tracker.leads.createLead(lead, instructions);

    expect(response).toBeTruthy();
    expect(response.message).toEqual("success");
    expect(response.recordName).toEqual(lead.leadname);
}, 15000);