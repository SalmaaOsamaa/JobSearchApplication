import React, { useEffect, useState } from 'react'
import styles from './JobPage.module.scss'
import Card from '../ui/Card'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../ui/Button'
import ErrorLayout from '../layouts/ErrorLayout'
import Spinner from '../ui/Spinner'

function JobPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [jobTitle, setJobTitle] = useState('');
    const [skills, setSkills] = useState([])
    const [jobs, setJobs] = useState([])
    const [skill, setskill] = useState('');
    const [error, setError] = useState(null);
    const [relatedJobsLoading, setRelatedJobsLoading] = useState(false)
    const [relatedSkillsLoading, setRelatedSkillsLoading] = useState(false)

    useEffect(() => {
        return async () => {
            setRelatedJobsLoading(true);
            try {

                const apiUrl = `https://skills-api-zeta.vercel.app/job/${id}`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const title = data.data.job.attributes.title;
                setJobTitle(title);
                const skillsIds = data.data.job.relationships.skills.map(r => r.id)
                if (skillsIds.length) {
                    let fetchedSkills = []
                    for (let i = 0; i < skillsIds.length; i++) {
                        const id = skillsIds[i]
                        const apiUrl = `https://skills-api-zeta.vercel.app/skill/${id}`;
                        const request = await fetch(apiUrl)
                        const json = await request.json()
                        const { skill } = json.data
                        const { relationships } = skill
                        fetchedSkills.push({ id: skill.id, relationships: relationships, ...skill.attributes })
                    }
                    setSkills(fetchedSkills)
                }
            } catch (error) {
                setError(error)
            }
            setRelatedJobsLoading(false)
        };
    }, [id]);
    const handleSkillChange = (e, skillId) => {
        const skill = skills.find(r => r.id === skillId)
        setskill(skill)
        e.stopPropagation()


    }
    useEffect(() => {

        fetchSkillData(skill)

        return
    }, [skill])

    const fetchSkillData = async (skill) => {
        if (skill) {
            setRelatedSkillsLoading(true);
            try {
                const jobsIds = skill.relationships.jobs.map(r => r.id)
                if (jobsIds.length) {
                    let fetchedJobs = []
                    for (let i = 0; i < jobsIds.length; i++) {
                        const id = jobsIds[i]
                        const apiUrl = `https://skills-api-zeta.vercel.app/job/${id}`;
                        const request = await fetch(apiUrl)
                        const json = await request.json()
                        const { job } = json.data
                        fetchedJobs.push({ id: job.id, ...job.attributes })
                    }
                    setJobs(fetchedJobs)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setRelatedSkillsLoading(false);

            }

        }
    }


    const handleSkillNavigate = (id) => {
        navigate(`/skill/${id}`);
    }

    return (
        <div>
            {error ? (
                <ErrorLayout error={error} />
            ) : relatedJobsLoading ? (
                <div>
                    <Spinner />
                </div>) : (
                <div className={styles.container}>
                    <h2>{jobTitle}</h2>
                    <div className={styles.cardContainer}>
                        <div className={styles.skillsContainer}>
                            <strong>Related Skills</strong>
                            <div className={styles.skillCard}>
                                {skills.map((skill, index) => (
                                    <Card id={index} onClick={() => handleSkillNavigate(skill.id)} type={skill.type} importance={skill.importance} level={skill.level}>
                                        <Button onClick={(e) => handleSkillChange(e, skill.id)}>{skill.name}</Button>
                                    </Card>
                                ))}
                            </div>

                        </div>

                        {relatedSkillsLoading ? <Spinner /> : <div className={styles.jobsContainer}>
                            <strong>Related Jobs for {skill.name}</strong>
                            <ul>
                                {
                                    jobs.map(job => (


                                        <li key={job.id}>{job.title}</li>


                                    ))
                                }
                            </ul>


                        </div>}

                    </div>
                </div>
            )

            }
        </div>
    );

}

export default JobPage;