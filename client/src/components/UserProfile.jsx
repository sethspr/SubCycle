import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

function UserProfile() {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState([]);

    const fetchUserProfile = async () => {
        try {
            // is user.id available in the user object
            const response = await fetch('http://127.0.0.1:5555/subscriptions');
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
    }, [user]); // Fetch user profile whenever user data changes

    return (
        <div>
            <h1>User Profile</h1>
            {userProfile.map(profile => (
                <div key={profile.id}>
                    <h2>{profile.user.username}</h2>
                    <p>{profile.service.company_name}</p>
                    <p>${profile.service.amount}</p>
                    <p>Due on day {profile.due_date} of the month</p>
                </div>
            ))}
        </div>
    );
}

export default UserProfile;
