import React from 'react'
import BlogItem from './BlogItem'
import productService from '@/lib/services/productService'

export default async function AllBlogs() {
    const blogs = await productService.getAllProducts()
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    <div className="flex flex-col-3 gap-x-8 justify-center">
                        {blogs.map((blog: any, index: number) => (
                            <BlogItem blog={blog} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps() {
    try {
        const blogs = await productService.getAllProducts()
        return {
            props: { blogs },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: { blogs: [] },
        };
    }
}

