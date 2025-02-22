import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import JobCard from '../../components/JobCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Categories = () => {
    const [jobs, setJobs] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const loadData = async () => {
            const { data } = await axiosPublic.get('/jobs');
            setJobs(data);
        };
        loadData();
    }, [axiosPublic]);

    const web = jobs.filter((job) => job.category === 'Web Development');
    const graphic = jobs.filter((job) => job.category === 'Graphics Design');
    const marketing = jobs.filter((job) => job.category === 'Digital Marketing');

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
                    Explore Jobs by Category
                </h2>
                <Tabs>
                    <TabList className="flex justify-center space-x-4 md:space-x-6 mb-10 border-b border-gray-200">
                        <Tab
                            className="py-3 px-6 text-gray-600 font-semibold cursor-pointer rounded-t-lg focus:outline-none"
                            selectedClassName="bg-indigo-600 text-white"
                        >
                            Web Development
                        </Tab>
                        <Tab
                            className="py-3 px-6 text-gray-600 font-semibold cursor-pointer rounded-t-lg focus:outline-none"
                            selectedClassName="bg-indigo-600 text-white"
                        >
                            Digital Marketing
                        </Tab>
                        <Tab
                            className="py-3 px-6 text-gray-600 font-semibold cursor-pointer rounded-t-lg focus:outline-none"
                            selectedClassName="bg-indigo-600 text-white"
                        >
                            Graphic Design
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {web.length > 0 ? (
                                web.map((job) => <JobCard key={job._id} job={job} />)
                            ) : (
                                <p className="text-gray-500 text-center col-span-full">
                                    No jobs available in this category.
                                </p>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {marketing.length > 0 ? (
                                marketing.map((job) => <JobCard key={job._id} job={job} />)
                            ) : (
                                <p className="text-gray-500 text-center col-span-full">
                                    No jobs available in this category.
                                </p>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {graphic.length > 0 ? (
                                graphic.map((job) => <JobCard key={job._id} job={job} />)
                            ) : (
                                <p className="text-gray-500 text-center col-span-full">
                                    No jobs available in this category.
                                </p>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default Categories;