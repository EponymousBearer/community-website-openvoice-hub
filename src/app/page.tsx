import { Metadata } from "next";
import AddProduct from "@/components/AddProduct";
import AllProducts from "@/components/AllProducts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import AllBlogs from "@/components/AllBlogs";
import HeroSection from "@/components/HeroSection";
import AddBlogForm from "@/components/AddBlog";
import SearchPage from "@/components/SearchPage";
import FileUpload from "@/utils/next_fileupload_frontend";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Adnan E Commerce',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs',
}
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <section>
      {/* <SearchPage /> */}
      <FileUpload dirs={[]}/>
      <HeroSection />
      <AllBlogs />
      <AddBlogForm />
    </section>
  );
}
