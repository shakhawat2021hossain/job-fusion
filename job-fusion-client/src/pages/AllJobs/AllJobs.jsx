import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import JobCard from '../../components/JobCard';
import Loading from '../../components/Loading';

const AllJobs = () => {
    const axiosPublic = useAxiosPublic();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');
    const [count, setCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: jobs = [], refetch, isLoading, isFetching } = useQuery({
        queryKey: ['jobs', search, sort, filter, currentPage],
        queryFn: async () => {
            const { data } = await axiosPublic.get(
                `/all-jobs?page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${sort}&filter=${filter}`
            );
            return data;
        },
    });

    useEffect(() => {
        const loadData = async () => {
            const { data } = await axiosPublic.get(`/count-jobs?search=${search}&filter=${filter}`);
            setCount(data.count);
        };
        loadData();
    }, [filter, search, axiosPublic]);

    const totalP = Math.ceil(count / itemsPerPage);
    const pages = [...Array(totalP).keys()].map((ele) => ele + 1);

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
        setCurrentPage(1);
        e.target.reset();
    };

    const handleReset = () => {
        setFilter('');
        setSort('');
        setSearch('');
        setCurrentPage(1);
    };

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        name="category"
                        id="category"
                        className="w-full md:w-auto bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Filter By Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Graphics Design">Graphics Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </select>

                    <form onSubmit={handleSearch} className="w-full md:w-auto flex">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Enter Job Title"
                            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-l-lg text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                        <button
                            type="submit"
                            className="px-4 py-3 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Search
                        </button>
                    </form>

                    <select
                        onChange={(e) => setSort(e.target.value)}
                        value={sort}
                        name="sort"
                        id="sort"
                        className="w-full md:w-auto bg-white border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Sort By Deadline</option>
                        <option value="dsc">Descending Order</option>
                        <option value="asc">Ascending Order</option>
                    </select>

                    <button
                        onClick={handleReset}
                        className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                        Reset
                    </button>
                </div>

                {/* Jobs Grid */}
                <div className="min-h-[450px]">
                    {isFetching || isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loading />
                        </div>
                    ) : jobs.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">No jobs found matching your criteria.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalP > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-indigo-600 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            Prev
                        </button>

                        {pages.map((btnNum) => (
                            <button
                                key={btnNum}
                                onClick={() => handlePagination(btnNum)}
                                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${currentPage === btnNum
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-indigo-600 hover:text-white'
                                    }`}
                            >
                                {btnNum}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalP}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-indigo-600 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllJobs;