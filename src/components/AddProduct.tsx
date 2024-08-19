// components/AddProductForm.js
"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          slug: slug,
          description: description,
          price: parseFloat(price),
          image: image,
        }),
      });
      if (res.ok) {
        setSuccessMessage("Product Added Successfully");
        setTitle("");
        setSlug("");
        setDescription("");
        setPrice("");
        setImage("");
      } else {
        setError("Failed to add product");
      }
      setSuccessMessage("Product Added Successfully")
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    session ? (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Add Product</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="gap-y-6 flex flex-col">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex w-full"
            />
          </div>
          <div>
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex w-full"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex w-full"
            />
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex w-full"
            />
          </div>
          <div>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="flex w-full"
            />
          </div>
          <button type="submit" className="border-black border max-w-24 mx-auto w-full">Submit</button>
        </form>
        {error && <p style={{ color: 'red' }} className="mt-4">{error}</p>}
        {successMessage && <p style={{ color: 'green' }} className="mt-4">{successMessage}</p>}
      </div>
    ) : (
      <div className="text-bold text-center my-10 text-xl">Login in To Add Products</div>
    )
  );
};

export default AddProductForm;
