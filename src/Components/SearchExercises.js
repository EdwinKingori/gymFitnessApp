import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';


const SearchExercises = ( {setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('')
  // ading exercises to state for it to be displayed
  const [bodyParts, setBodyParts] =useState([])
// the useEffect hook fetches the categories as soon as the page loads. 
  useEffect(()=>{
    const fetchExercisesData = async ()=> {
      const bodyPartsData = await fetchData('https:exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
      setBodyParts (['all', ...bodyPartsData]);
    }
    //the fetchExercisesdata calls the bodyPartsData as soon as the page loads.
    fetchExercisesData();
  }, [])

  // async means the handleSeacrh func will pull data from the API
  const handleSearch = async () => {
    if(search){
      const exercisesData = await fetchData('https:exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      
      // including an effective search functionality (search exercises)
      const searchedExercises = exercisesData.filter(
        (exercises) => exercises.name.toLowerCase().includes(search)
        || exercises.target.toLowerCase().includes(search)
        || exercises.equipement.toLowerCase().includes(search)
        || exercises.bodyparts.toLowerCase().includes(search)
      );

      // setSearch with an empty string clears the search.
      setSearch('');
      setExercises(searchedExercises);

    }

  }
  return (
    <Stack alignItems ="center" justifyContent ="center" p='20px'> 

    <Typography fontWeight= {700} sx={{
      fontSize: {lg: '44px', xs: '30px'}
    }} mb='50px' textAlign ="center">
      Awesome Exercises You Should Know <br />
    </Typography>
    <Box  position ='relative' mb= '72px'>
      <TextField 
      sx={{
        input: {
          fontWeight:'1000px', 
          border: 'none', 
          borderRadius:'4px'},
        width:{lg: '800px', xs: '350px'},
        backgroundColor: '#FFF',
        borderRadius: '40px'
      }}
      height ="76px"
      value = {search}
      onChange={(e) => setSearch(e.target.value.toLowerCase())} 
      placeholder = "Search Exercises"
      type="text"
      />
     <Button className = "search-btn"
      sx= {{
        bgcolor: '#FF2625',
        color: '#FFF',
        textTransform: 'none',
        width: { lg: '175px', xs: '80px'},
        fontSize:{lg: '20px', xs:'14px'},
        height: '50px',
        position: 'static',
        right: '0'
        
      }}
      onClick ={handleSearch}
      > 
      Search
    </Button>
    </Box>

{/*a new component called HorizontalScrollbar that fetches data equal to bodyparts.*/}
    
    <Box sx={{ position: "relative", width: '100px', p:'20px'}}>
      <HorizontalScrollbar data={bodyParts} bodyPart = {bodyPart} setBodyPart={setBodyPart}/>
    </Box>

    </Stack>
  )
}

export default SearchExercises