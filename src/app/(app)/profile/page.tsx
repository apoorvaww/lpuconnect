"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import axios from 'axios'

type UserProfile = {
    id: string
    email: string
    role: string | null
    age: number | null
}

export default function Profile() {
    const {user} = useUser();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/profile")
        .then(res => setProfile(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, [])

    // const handleUpdate = async() => {
    //     await axios.put("/api/profile", {
    //         firstName: profile?.firstName,
    //         age: profile?.age,
    //         batchYear: profile.batchYear,
    //         department: profile.d
    //     })
    // }

}