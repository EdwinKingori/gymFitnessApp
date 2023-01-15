import React, {useState} from 'react'
import {Box} from '@mui/material'


import SearchExercises from '../Components/SearchExercises';
import HeroBanner from '../Components/HeroBanner';



const Home = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  
  return (
    <Box>
        <HeroBanner />
        <SearchExercises 
          setExercises={setExercises} 
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart}
          />
        <exercises 
          setExercises={setExercises} 
          exercises={exercises}
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart}
          />
    </Box>
  )
}

export default Home