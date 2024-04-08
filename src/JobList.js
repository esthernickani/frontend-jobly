import { React, useState, useEffect } from "react";
import {v4 as uuid} from 'uuid';
import JobCard from "./JobCard";
import JoblyApi from "./api";

const JobList = () => {
    //get all companies in the database
    const [ loading, setLoading ] = useState(true);
    const [ jobs, setJobs ] = useState([]);
    const [ searchInput, setSearchInput ] = useState("");
    const [ filter, setFilter ] = useState(null)

    useEffect(() => {
        async function fetchJobs() {
            try  {
                let jobsDb = filter? await JoblyApi.getJobs(filter) : await JoblyApi.getJobs();
                setJobs(jobsDb);
                setLoading(false)
            } catch(e) {
                console.log(e)
            }
        }

        fetchJobs()
    }, [filter])

    const handleChange = e => {
        e.preventDefault();
        setSearchInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        setFilter(searchInput)
        setSearchInput('')
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Enter search term..."
                    onChange={handleChange}
                    value={searchInput}
                />
                <button type="submit">Submit</button>
            </form>
            {jobs.length && jobs.map(job => <JobCard key={uuid()} id={job.id} salary={job.salary} equity={job.equity} title={job.title} companyName = {job.companyName}/>)}
        </div>
    )
}

export default JobList;