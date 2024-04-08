import { React, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import JoblyApi from "./api";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import {v4 as uuid} from 'uuid';

const CompanyDetail = () => {
    const { handle } = useParams()
    const [ company, setCompany ] = useState(null)

    useEffect(() => {
        async function getCompany(handle) {
            let companyDb = await JoblyApi.getCompany(handle)
            setCompany(companyDb)
        }
        getCompany(handle)
    }, [])


   return (<>
                {company &&
                    <div>
                        <h2>{company.name}</h2>
                        <p>{company.description}</p>
                        {company.jobs && company.jobs.map(job =>
                                                            <JobCard key={uuid()} id={job.id} salary={job.salary} equity={job.equity} title={job.title}/>
                        )}
                    </div>}
            </>
    )
}

export default CompanyDetail;