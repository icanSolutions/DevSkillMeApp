import { useState, useEffect } from 'react';
import WorkDomainForm from './WorkDomainForm';
import FetchDomain from './DomainFetcher';
import BasicCard from './TryMaterialUi';
import SkillCard from "./SkillCard";
import SearchIcon from '@mui/icons-material/Search';
import { Button, Stack, Box, Typography  } from '@mui/material'; 
import { useSelector } from "react-redux";





function WorkDomainsList() {
    // const [domainsChoice, setDomainsChoice] = useState([{choice: 'Domain 1'}])
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [domains, setDomains] = useState(null)
    const [pageTitle, setPageTitle] = useState(
        <WorkDomainForm getDomains={getDomains} />)
    const [skills, setSkills] = useState([])
    const [displaySkills, setDisplaySkills] = useState(false)
    const [skillsButton, setSkillsButton] = useState(true)


    
    async function getDomains(domainChoice) {
        try {
            const domains_url = `http://localhost:8000/domains/${domainChoice}`;
    
            const response = await fetch(domains_url, {
                method: 'GET',
                credentials: 'include'  // This ensures that cookies are sent with the request
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const jsonResponse = await response.json();
            setDomains(jsonResponse);
        } catch (error) {
            console.error('Error fetching domain:', error);
        }
    }

    async function getSkills(domain){
        try {
            const domain_skills_url = `http://localhost:8000/domains/${domain}/skills`
            const response = await fetch(domain_skills_url);
            const jsonResponse = await response.json();
            setSkills(Array.isArray(jsonResponse) ? jsonResponse : []);
        } catch (error) {
            console.error('Error fetching skills:', error);
            setSkills([]); 
        }
    }

    useEffect(() => {
        if (domains) {
            setPageTitle(null);
            getSkills(domains.name)
        }
    }, [domains]);


    const handleSkillsButton = () => {
        setDisplaySkills(true);
        setSkillsButton(false);
    }
    

    return (
        <Stack direction={'column'}>
            <div style={{width:'auto'}}>
                {pageTitle}
            </div>
    
            {domains ? (
                <Box sx={{width:'auto'}}>
                    <Typography variant="h3" mb={'50px'} textAlign={'center'}>Your Domain Choices</Typography>
                    {/* <h1 style={{ textAlign: 'center'}}>Your Domain Choices</h1> */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BasicCard
                            name={domains.name}
                            average_salary={domains.average_salary}
                            demand={domains.demand}
                            skills={domains.skills}
                            getSkills={handleSkillsButton}
                            skillsButtonDisplay={skillsButton}
                        />
                    </div>
                    {/* {skillsButton && (
                        <Button variant="outlined" color="primary" endIcon={<SearchIcon />} onClick={handleSkillsButton}>Get Skills</Button>

                    )} */}
                    {displaySkills ? (
                        <>
                            <h1 style={{ textAlign:'center' }}>Skills</h1>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
                            {skills.map((skill, index) => (
                                <SkillCard key={index} name={skill.name} type={skill.type} />
                                )) }
                            </div>
                        </>
                    ):(
                        <p></p>
                    )}
                </Box>
            ) : (
                <p></p>
            )}
        </Stack>
    );
            }

export default WorkDomainsList;