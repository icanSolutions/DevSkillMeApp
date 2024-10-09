import { useState, useEffect } from "react";
import BasicCard from "./TryMaterialUi";
import SkillCard from "./SkillCard";


// const domains_url = 'http://localhost:8000/domains/7/'
// const domain_skills_url = 'http://localhost:8000/domains/7/skills'


export default function FetchDomain({ domainChoice }) {
    const domains_url = `http://localhost:8000/domains/${domainChoice}/`
    const domain_skills_url = `http://localhost:8000/domains/${domainChoice}/skills`
    const [domain, setDomain] = useState({name:'', age: 0, profitability: 0});
    const [skills, setSkills] = useState([])


    // async function getDomains() {
    //     try {
    //         alert(domains_url)
    //         const response = await fetch(domains_url);
    //         const jsonResponse = await response.json();
    //         setDomain(jsonResponse);
    //     } catch (error) {
    //         console.error('Error fetching domain:', error);
    //     }
    // }

    async function getSkills(){
        try {
            const response = await fetch(domain_skills_url);
            const jsonResponse = await response.json();
            setSkills(jsonResponse);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    }


    return (
        <>
            <button onClick={getDomains}>Get Domain</button>
            
            <br /><br />
            <button onClick={getSkills}>Get Skills</button>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
            {skills.length > 0 ? (
                skills.map((skill, index) => (
                    <SkillCard key={index} name={skill.name} type={skill.type} />
                ))
            ) : (
                <p>Choose Domain First</p>
            )}
            </div>
            
        </>
    );
                }    
                                


