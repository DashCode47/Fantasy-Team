import { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { prominent } from 'color.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import back from '../../assets/back.png'


export const SearchTeamCard = ({team}) => {

  const navigation = useNavigate()
  const [color, setColor] = useState("")
  const [hasCover, setHasCover] = useState(false)

  useEffect(() => {
    getColor()
  }, [])
  
  const getColor = async() =>{
    if(team){
        if(team.strTeamBadge!==""){
          const color = await prominent(team.strTeamBadge, { amount: 1 })
          if(color.toString() === '255,255,255')
          {
            setColor(`RGB(10,10,10)`)
          }
          else{
            setColor(`RGB(${color.toString()})`)
          }
          setHasCover(true)
        }
        else{
          setHasCover(false)
        }
    }
  }

  const handleNavigate = () =>{
    navigation(`/team/${team.idTeam}`)
  }
  
  const header = (
    <img className='image-cover' alt="cover" src={hasCover?team.strTeamBadge:back} />
  );

  return (
    <Box >
    {
      team?
        <Grid 
          xs={2} sm={4} md={2}
          onClick={handleNavigate}
          style={{gap:'15px'}}
        >
            <Card
              className='card-book animate__animated animate__bounceIn'
              title={team.strTeam} 
              style={{ backgroundColor:color}}  
              header={header}
            >
            </Card>
        </Grid>
      :
      <></>
    }
    </Box>
  )
}
