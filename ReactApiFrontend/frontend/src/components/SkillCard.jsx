import { useState, useEffect } from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';


export default function SkillCard({ name, type }) {
return (
    <Card sx={{ width: 310 }}>
    <div>
        <Typography level="title-lg">{ name }</Typography>
        {/* <IconButton
        aria-label="Skills Bookmark Button"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
        <BookmarkAdd />
        </IconButton> */}
    </div>
    {/* <AspectRatio minHeight="120px" maxHeight="200px">
        <img
        src="https://images.unsplash.com/photo-1690683789978-3cf73960d650?q=80&w=3009&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        loading="lazy"
        alt=""
        />
    </AspectRatio> */}
    <CardContent orientation="horizontal">
        <div>
        <Typography level="body-xs">Type:</Typography>
        <Typography fontSize="sm" fontWeight="lg">
            { type }
        </Typography>
        </div>
        <Button
        variant="solid"
        size="md"
        color="primary"
        aria-label="Explore Bahamas Islands"
        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
        Explore
        </Button>
    </CardContent>
    </Card>
);
}
