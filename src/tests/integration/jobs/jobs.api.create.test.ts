import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import { 
  ResponseStatus, 
  type JobData, 
  type JobInstructions 
} from "../../../types";

test('createJob creates a new job opportunity successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the job data
  const jobData: JobData = {
    opportunityname: "New Contact Us Submission",
    department: "Sales",
    worktype: "Permanent",
    source: "Client Request",
    description: "Lorem ipsum dolor sit amet.",
    firstname: "John",
    lastname: "Brown",
    fullname: "John Brown",
    jobtitle: "Managing Director",
    company: "ABC Incorporated",
    address1: "2567 Lexington Avenue",
    address2: "",
    city: "New York",
    state: "NY",
    zipcode: "10263",
    country: "United States",
    businessphone: "555-2387",
    homephone: "555-6890",
    cellphone: "888-3465",
    email: "john.brown@abcincorp.com",
    linkedin: "https://linkedin.com/jbabc/",
    website: ""
  };

  // Define instructions
  const instructions: JobInstructions = {
    createpersonifnotexists: true
  };

  // Call the createJob method
  try {
    const job = await tracker.jobs.createJob(jobData, instructions);

    // Assertions
    expect(job).toBeTruthy();
    expect(job.status).toBe(ResponseStatus.Success); 
    expect(job.message).toEqual("success");
    expect(job.recordName).toEqual(jobData.opportunityname)
    
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;  // Re-throw the error to fail the test
  }
}, 15000); // Increase timeout to 15 seconds