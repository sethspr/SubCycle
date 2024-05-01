import React, { useEffect, useState } from 'react'

function UserProfile() {
    const [userProfile, setUserProfile] = useState([]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            {userProfile.map(profile => (
                <div key={profile.id}>
                    <h2>{profile.service_id}</h2>
                </div>
            ))}
        </div>
    )
}

export default UserProfile