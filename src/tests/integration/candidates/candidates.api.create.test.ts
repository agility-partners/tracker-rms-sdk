import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { 
    CandidateData,
    CreateCandidateOptions
} from "../../../types/candidate";

test('createCandidate creates a new candidate successfully', async () => {
    const tracker = new Tracker();

    const candidate: CandidateData = {
        firstname: "Jane",
        lastname: "Selby",
        fullname: "Jane Selby",
        jobtitle: "Java Programmer",
        company: "Wonderful Java Inc",
        email: "jane.selby@gmailx.com",
        source: "Website",
        address1: "2245 Jasper Lane",
        address2: "Del Mar",
        city: "San Diego",
        state: "CA",
        zipcode: "92367",
        country: "United States",
        workphone: "555-3748",
        homephone: "888-3487",
        cellphone: "555-3748",
        linkedin: "https://linkedin.com/jsca/",
        dateofbirth: "1984-04-28",
        nationality: "United States",
        languages: "French, English",
        education: "Master's Degree",
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
        image: "",
        skills: "123,456,789,654",
        status: "Active",
        customfields: [
            {
                id: 50,
                value: "Custom Value"
            }
        ]
    };

    const response = await tracker.candidates.createCandidate(candidate);

    expect(response).toBeTruthy();
    expect(response.message).toEqual("created");
    expect(response.recordName).toEqual(candidate.fullname);
}, 15000);