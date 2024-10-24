import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import { 
  ResponseStatus, 
  type CreateJobOptions, 
  type JobData,  
} from "../../../types";

test('createJob creates a new job opportunity successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the job data
  const jobData: JobData = {
    opportunityname: "Data Center Operations Specialist",
    department: "Sales",
    worktype: "Contract To Hire",
    fullname: "John Brown",
    description: "1 role is day shift and 1 is night shift. This team works twelve hour shifts. 7a-7p and 7p-7a. They alternate 3 days and 4 days a week. So one week is Sun-Tues then Sun-WedÂ \nÂ ",
    company: "Compass Group",
  };
  
  // Define instructions
  const instructions: CreateJobOptions = {
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