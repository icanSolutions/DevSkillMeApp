import { useState, useEffect } from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { Stack } from "@mui/material";


const domains_url = 'http://localhost:8000/domains/7/'
const domain_skills_url = 'http://localhost:8000/domains/7/skills'


export default function BasicCard({ name, average_salary, demand, getSkills, skillsButtonDisplay }) {
return (
    <Card sx={{ width: 600 }}>
    <div>
        <Typography textAlign={'center'} level="title-lg">{ name }</Typography>
        <Stack mt={'20px'} textAlign={'center'} direction={'row'} justifyContent={'space-around'}>
        <Typography level="body-sm"><b>Demand</b> <br/> { demand }</Typography>
        <Typography level="body-sm"><b>Average Salary</b> <br/>  { average_salary } </Typography>
        </Stack>
        <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
        <BookmarkAdd />
        </IconButton>
    </div>
    <AspectRatio minHeight="120px" maxHeight="200px">
        <img
        src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
        srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
        loading="lazy"
        alt=""
        />
    </AspectRatio>
    <CardContent orientation="horizontal" sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <div>
        <Typography level="body-xs">Average Salary:</Typography>
        <Typography fontSize="lg" fontWeight="lg">
            { average_salary }
        </Typography>
        </div> */}
        <Button
        variant="solid"
        size="md"
        color="primary"
        aria-label="Explore Bahamas Islands"
        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, justifySelf:'center' }}
        onClick={getSkills}
        disabled={!skillsButtonDisplay}
        >
        Explore Skills
        </Button>
    </CardContent>
    </Card>
);
}
