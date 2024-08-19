// components/UserForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const UserForm: React.FC = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { data: session } = useSession();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    gender: gender,
                    phoneNumber: phoneNumber,
                    profileImage: profileImage,
                }),
            });
            if (res.ok) {
                setSuccessMessage("Profile Updated Successfully");
                setName("");
                setAge("");
                setGender("");
                setPhoneNumber("");
                setProfileImage(null);
            } else {
                setError("Failed to update profile");
            }
        } catch (error: any) {
            setError(error);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" name="age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" name="gender" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="file" name="profileImage" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
