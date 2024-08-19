import productService from '@/lib/services/productService'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from "next-auth";
import Interaction from '@/components/Interaction';
import AddToCart from '@/components/AddToCart';
import GetByIdTest from '@/components/GetAllProducts';
import { Blog } from '@/lib/models/BlogModel';

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  // const product = await productService.getById(params.slug)
  const blog = await productService.getBySlug(params.slug)
  // getBySlug
  if (!blog) {
    return { title: 'Product not found' }
  }
  return {
    title: blog.title,
    description: blog.description,
  }
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  // const { setCart, addToCart } = useContext(AppContext);
  // const product = await productService.getById(params.slug)
  const blog: Blog = await productService.getBySlug(params.slug)
  const session = await getServerSession();

  if (!blog) {
    return <div>Blog not found</div>
  }

  // const handleAddToCart = () => {
  //   addToCart({ productId: product.title, quantity: 1 });
  //   setCart((prevTotal: number) => prevTotal + 1);
  // };
  // console.log(product._id)
  return (
    <>
      <div className="relative h-screen">
        {/* Background Image */}
        <Image
          src={blog.image}
          alt={''}
          className="absolute inset-0 h-full w-full object-cover"
          layout="fill"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="absolute max-w-screen-lg w-full mx-auto text-center inset-0 flex flex-col justify-center items-center text-white z-10">
          <div>
            <h1 className="text-7xl font-bold mb-4">{blog.title}</h1>
            <p className="text-lg py-4">by <b>{blog.author}</b></p>
          </div>
        </div>
      </div>
      <section className='mx-12 flex flex-col'>
        {/* <div className='capitalize px-4 py-2 my-2 text-white bg-black w-fit border'>
          <Link href="/">back to products</Link>
        </div> */}
        <div className='flex flex-col items-end max-w-screen-lg mx-auto w-full'>
          <div className='flex w-full mt-24 font-sans tracking-wide leading-loose'>
            <p>{blog.description}</p>
          </div>
          <Interaction product_id={blog._id.toString()} user_id={session?.user?.email as string} />
          {/* <AddToCart product_id={blog._id.toString()} user_id={session?.user?.email as string} /> */}

        </div>
      </section>
    </>
  )
}