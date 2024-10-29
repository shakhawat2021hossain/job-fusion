import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../../components/JobCard';
import './Home.css'
import axios from 'axios'

const Categories = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() =>{
        const loadData = async() =>{
            const {data} =  await axios.get('http://localhost:5000/jobs')
            setJobs(data)
        }
        loadData()
    }, [])
    
    const web = jobs.filter(job => job.category === 'Web Development')
    const graphic = jobs.filter(job => job.category === 'Graphics Design')
    const marketing = jobs.filter(job => job.category === 'Digital Marketing')
    // console.log(web, graphic, marketing);
    
    return (
        <Tabs className="max-w-7xl text-center mx-auto my-8">
            <TabList>
                <Tab>Web Development</Tab>
                <Tab>Digital Marketing</Tab>
                <Tab>Graphic Design</Tab>
            </TabList>

            <TabPanel>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {
                        web.map(job => <JobCard key={job._id} job={job}></JobCard>)
                    }
                </div>
            </TabPanel>
            <TabPanel>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {
                        marketing.map(job => <JobCard key={job._id} job={job}></JobCard>)
                    }
                </div>
            </TabPanel>
            <TabPanel>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                    {
                        graphic.map(job => <JobCard key={job._id} job={job}></JobCard>)
                    }
                </div>
            </TabPanel>
        </Tabs>
    );
};

export default Categories;