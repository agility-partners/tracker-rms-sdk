import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import { 
    type CandidateData,
    type CandidateInstructions,
    AssignToList,
    ShortlistedBy
} from "../../../types/candidate";  // Adjust the import path as necessary

test('createCandidate creates a new candidate successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the candidate data
  const candidateData: CandidateData = {
    firstname: "Jane",
    lastname: "Selby",
    fullname: "Jane Selby",
    jobtitle: "Java Programmer",
    company: "Wonderful Java Inc",
    address1: "2245 Jasper Lane",
    address2: "Del Mar",
    city: "San Diego",
    state: "CA",
    zipcode: "92367",
    country: "United States",
    homephone: "555-3748",
    cellphone: "888-3487",
    email: "jane.selby@gmailx.com",
    linkedin: "https://linkedin.com/jsca/",
    dateofbirth: "1984-04-28",
    nationality: "United States",
    languages: "French, English",
    education: "Master's Degree",
    source: "Website",
    jobhistory: [
      {
        company: "Wonderful Java Inc.",
        jobtitle: "Java Programmer",
        startdate: "2016",
        description: "I programmed Java"
      },
      {
        company: "Another Company",
        jobtitle: "Junior JS Developer",
        startdate: "2013",
        enddate: "2017",
        description: "Graduate developer"
      }
    ],
    salary: 33000,
    note: "Lorem ipsum dolor sit amet.",
    image: "http://url.to.image",
    skills: "123,456,789,654",
    status: "Active",
  };

  // Define instructions
  const instructions: CandidateInstructions = {
    overwriteresource: false,
    assigntoopportunity: 1049,
    assigntolist: AssignToList.Short,
    shortlistedby: ShortlistedBy.Resource
  };

  // Call the createCandidate method
  const response = await tracker.candidates.createCandidate(candidateData, instructions);

  // Assertions
  expect(response).toBeTruthy();
  expect(response.message).toEqual("created");
  expect(response.recordName).toEqual(candidateData.fullname);
}, 15000);