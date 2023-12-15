import React,{useEffect, useState} from 'react'
import styles from './JobCard.module.scss'
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import { useNavigate } from 'react-router-dom';
// import Tag from './Tag';

function JobCard({ job,  }) {
  const [skills,setSkills] = useState([])
  const navigate = useNavigate()
  const { id,type, attributes, relationships} = job;
  const { title: jobTitle } = attributes;
  const skillsIds = relationships?.skills;
  

  const handleCardClick = () => {
    navigate(`/job/${id}`);
  };
  
  useEffect( () => {
    return async () => {
      if(skillsIds.length){
        let fetchedSkills = []
        for (let i = 0; i < skillsIds.length; i++) {
          const id = skillsIds[i].id
          const apiUrl = `https://skills-api-zeta.vercel.app/skill/${id}`;
          const request = await fetch(apiUrl)
          const json = await request.json()
          const {skill} = json.data
          fetchedSkills.push(skill.attributes.name)
        }
        setSkills(fetchedSkills)
      } 
    }
  }, [skillsIds]);


  return (
    <>
      <div className={styles.jobs}>
        <div className={styles.job} onClick={handleCardClick}>
          <h3>{jobTitle}</h3>
          <h6>{type}</h6>
          <div className={styles.details}>
            <p>
              Related Skills:
            </p>
           <div className={styles.wrapper}>
           {
                skills.map(skill => (
                  
                  <Tag>{skill}</Tag>
       
                ))
              }
           </div>
          
            <Button>View Job Details</Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default JobCard