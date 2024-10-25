import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { CompanyData, CreateCompanyOptions } from "../../../types/company";

test('createCompany creates a new company successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    // Define the company data
    const company: CompanyData = {
        company: 'New Tech Solutions Inc',
        fullname: 'New Tech Solutions Inc'
    };

    // Define instructions
    const instructions: CreateCompanyOptions = {
        createcompanyifnotexists: true
    };

    // Call the createCompany method
    const response = await tracker.companies.createCompany(company, instructions);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.message).toEqual("created");
    expect(response.recordName).toEqual(company.fullname);
}, 15000);