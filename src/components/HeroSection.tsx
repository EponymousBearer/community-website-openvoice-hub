import React from 'react'
import Image from 'next/image'
const HeroSection = () => {
    return (
        <div className="relative h-screen">
            {/* Background Image */}
            <Image
                src="https://n.foxdsgn.com/sterling-3/wp-content/uploads/2020/04/african-american-girl-hands-holding-a-marble-made-PH2LYX5.jpg"
                alt={''}
                className="absolute inset-0 h-full w-full object-cover"
                layout="fill"
            />
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
            {/* Content */}
            <div className="absolute text-center inset-0 flex flex-col justify-center items-center text-white z-10">
                <div>
                    <h1 className="text-7xl font-bold mb-4">Blog Metro</h1>
                    <p className="text-lg py-4">We love it, its amazing modern & simple</p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection