'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react"
import { SearchInput } from "@/components/SearchInput"
import { Blog } from '@/lib/models/BlogModel'
import BlogItem from './BlogItem'
import GetAllProducts from './GetAllProducts'
import { Search } from 'lucide-react'

const SearchPage = () => {
    const [profileData, setProfileData] = useState<Blog[]>([])
    const [blogs, setBlogs] = useState<any[]>([]);
    const searchParams = useSearchParams()
    const searchQuery = searchParams && searchParams.get("q"); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const blogsData = await GetAllProducts();
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (!searchQuery) {
            fetchProducts();
        } else {
            setProfileData([]);
        }
    }, [searchQuery]);


    useEffect(() => {

        const handleSearch = () => {
            const findBlogs = blogs.filter((blog) => {
                if (searchQuery) {
                    const lowerCaseSearchQuery = searchQuery.toLowerCase();
                    return (
                        (blog.title && blog.title.toLowerCase().includes(lowerCaseSearchQuery)) ||
                        (blog.description && blog.description.toLowerCase().includes(lowerCaseSearchQuery)) ||
                        (blog.author && blog.author.toLowerCase().includes(lowerCaseSearchQuery))
                    );
                } else {
                    return true;
                }
            });
            setProfileData(findBlogs);
        };
        handleSearch();

    }, [searchQuery, blogs]);

    const totalUser = profileData.length;

    return (


        <section className="max-w-screen-xl mx-auto w-full">

            <p className="my-4">Showing {totalUser} {totalUser > 1 ? "Blogs" : "Blog"}</p>

            <SearchInput defaultValue={searchQuery} />

            {/* // Conditionally render the profile cards */}

            <div className="mt-8">

                {totalUser === 0 ? <p>No result returned</p> : (

                    // return the profile cards here

                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">

                        {profileData.map((blog, index) => {
                            return (
                                <BlogItem blog={blog} key={index} />
                            )

                        })}


                    </div>

                )}


            </div>

        </section>

    )


}

export default SearchPage


