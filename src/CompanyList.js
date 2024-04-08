import { React, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";
import {v4 as uuid} from 'uuid';
import CompanyCard from "./CompanyCard";
import UserContext from "./UserContext";


const CompanyList = () => {
    //get all companies in the database
    const [ loading, setLoading ] = useState(true);
    const [ companies, setCompanies ] = useState([]);
    const [ searchInput, setSearchInput ] = useState("");
    const [ filter, setFilter ] = useState(null)


    useEffect(() => {
        async function fetchCompanies() {
            let companiesDb = filter? await JoblyApi.getCompanies(filter) : await JoblyApi.getCompanies();
            setCompanies(companiesDb);
            setLoading(false)
        }

        fetchCompanies()
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

            {companies.length && companies.map(company => <CompanyCard key={uuid()} id={uuid()} handle={company.handle} />)}
        </div>
    )

}

export default CompanyList;