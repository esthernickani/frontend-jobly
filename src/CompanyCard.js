import { React, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate, Navigate } from "react-router-dom";
import JoblyApi from "./api";

const CompanyCard = ({ handle }) => {
    //get company from backend
    const [ company, setCompany ] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function getCompany(handle) {
            let company = await JoblyApi.getCompany(handle)
            setCompany(company)
        }
        getCompany(handle)
    }, [])



    const goToDetailed = () => {
        navigate(`/companies/${handle}`)
    }

    return (
        <> {
            company && <div onClick={goToDetailed}>
                            <h2>{company.name}</h2>
                            <p>{company.description}</p>
                        </div>
        }
        </>
    )
}

export default CompanyCard;