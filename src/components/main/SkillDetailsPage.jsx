import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../ui/Spinner'
import styles from './SkillDetails.module.scss'
import Card from '../ui/Card'
import ErrorLayout from '../layouts/ErrorLayout'
import Button from '../ui/Button'
function SkillDetailsPage() {
    const { id } = useParams()
    //states
    const [skillTitle, setSkillTitle] = useState('');
    const [jobs, setJobs] = useState([])
    const [skills, setSkills] = useState([])
    const [fetchedJob, setFetchedJob] = useState('')
    const [error, setError] = useState(null);
    const [relatedJobsLoading , setRelatedJobsLoading] = useState(false)
    const [relatedSkillsLoading,setRelatedSkillsLoading] = useState(false)
    const [level,setLevel] = useState('')
    const [importance,setImportance] = useState('')

    //fetching data 
    useEffect(() => {
        const fetchData = async () => {
            setRelatedJobsLoading(true); 
            try {
                const apiUrl = `https://skills-api-zeta.vercel.app/skill/${id}`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const title = data.data.skill.attributes.name;
                const level = data.data.skill.attributes.level
                const importance = data.data.skill.attributes.importance
                setSkillTitle(title)
                setLevel(level)
                setImportance(importance)
              
                const jobsIds = data.data.skill.relationships.jobs.map(r => r.id)
                if (jobsIds.length) {
                    let jobsArray = []
                    for (let i = 0; i < jobsIds.length; i++) {
                        const id = jobsIds[i]
                        const apiUrl = `https://skills-api-zeta.vercel.app/job/${id}`
                        const request = await fetch(apiUrl)
                        const json = await request.json();
                        const { job } = json.data;
                        const { relationships } = job
                        jobsArray.push({ id: job.id, relationships: relationships, ...job.attributes })
                    }
                    setJobs(jobsArray)
                    setError(null)

                }
               
            } catch (error) {
                setError(error)
            }
            setRelatedJobsLoading(false)
        };
        fetchData();
    }, [id]);

    const handleJobChange = (e, jobId) => {
        const job = jobs.find(r => r.id === jobId)
        setFetchedJob(job)
        e.stopPropagation()
    }
    useEffect(() => {
        fetchJobData(fetchedJob)
        return
    }, [fetchedJob])

    const fetchJobData = async (job) => {
        if (job) {
          try {
            setRelatedSkillsLoading(true)
            const skillIds = job.relationships.skills.map(r => r.id)
            if (skillIds.length) {
                let fetchedSkills = []
                for (let i = 0; i < skillIds.length; i++) {
                    const id = skillIds[i]
                    const apiUrl = `https://skills-api-zeta.vercel.app/skill/${id}`;
                    const request = await fetch(apiUrl)
                    const json = await request.json()
                    const { skill } = json.data
                    fetchedSkills.push({ id: skill.id, ...skill.attributes })
                }
                setSkills(fetchedSkills)
            }
          } catch (error) {
            console.log(error);
          } finally {
            setRelatedSkillsLoading(false)
          }
           
        }
    }
    return (
        <>
        {
            error ? (
              <ErrorLayout error={error} />
            ) : relatedJobsLoading ? (
           <div>
           <Spinner/> 
           </div>
            ) : (
              <div className={styles.container}>
                <h4>{skillTitle}</h4>
                <div className={styles.cardContainer}>
                  <div className={styles.skillsContainer}>
                    <strong>Related Jobs</strong>
                    <div className={styles.skillCard}>
                      {jobs.map((job, index) => (
                        <Card onClick={(e) => handleJobChange(e, job.id)} key={index} level={level} importance={importance}>
                        <Button>{job.title}</Button>
                        </Card>
                      ))}
                     
                    </div>
                  </div>
                  {
                    relatedSkillsLoading ? <Spinner/> :
                    <div className={styles.relatedSkillsContainer}>
                    <strong>Related Skills for {fetchedJob.title}</strong>
                    <ul>
                    {skills.map((skill) => (
                        <li key={skill.id}>{skill.name}</li>
                    ))}
                    </ul>
                  </div>
                  }
                </div>
              </div>
            )
          }
          
    </>
    )
}

export default SkillDetailsPage