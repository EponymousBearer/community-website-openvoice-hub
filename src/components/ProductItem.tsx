import { Blog } from "@/lib/models/BlogModel"
import Image from "next/image"
import Link from "next/link"

export const ProductItem = ({ product }: { product: Blog }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="max-w-xs">
        <div><Image priority width={300} height={300} alt={product.title} src={product.image} /></div>
        <div>
          <p>Product Title: {product.title}</p>
          <p>Price: {product.description}</p>
        </div>
        <br />
      </div>
    </Link>
  )
}