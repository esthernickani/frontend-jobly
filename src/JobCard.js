import { React, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import JoblyApi from "./api";

const JobCard = ({title, id, salary, equity, companyName=null}) => {
    const [ job, setJob ] = useState(null);

    const { currentUser, applyJob } = useContext(UserContext)

    //get job from the db
    useEffect(() => {
        async function getJob(id) {
            let job = await JoblyApi.getJob(id)
            setJob(job.job)
        }
        getJob(id)
    }, [])

    const applyToJob = () => {
        applyJob(currentUser.username, id)
    }

    return (
            <>
                <div>
                    <h2>{title}</h2>
                    {companyName && <p>{companyName}</p>}
                    <p>Salary: {salary}</p>
                    <p>Equity: {equity}</p>
                    {currentUser.applications.includes(id) ?
                    <button disabled>Applied</button>:
                    <button onClick={applyToJob}>Apply</button>}
                </div>
            </>
    )
}

export default JobCard;