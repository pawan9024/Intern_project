import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
             
                const response = await axios.get(`/api/users/${userId}`);
               
                setUser(response.data.user);
                setPosts(response.data.posts);  
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.bio}</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="bg-gray-100 p-4 rounded-lg mb-2">
                            <p>{post.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfilePage;