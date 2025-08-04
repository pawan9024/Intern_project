
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import PostFeed from '../components/Feed/PostFeed';
import EditProfile from '../components/Profile/EditProfile'; // Import the new component

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null); // New state for current user ID

    const fetchUserProfile = async (profileId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to view profiles.');
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/users/${profileId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data.user);
            setPosts(response.data.posts);

            // Check if this is the current user's profile
            const decoded = jwtDecode(token);
            setCurrentUserId(decoded.id); // Set current user ID
            if (decoded.id === profileId) {
                setIsCurrentUserProfile(true);
            } else {
                setIsCurrentUserProfile(false);
            }

        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Failed to fetch user profile.');
            setUser(null); // Ensure user is null on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let profileIdToFetch = id;
        if (!id) { // If no ID in URL, try to get from token (current user's profile)
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    profileIdToFetch = decoded.id;
                } catch (error) {
                    console.error('Error decoding token for profile page:', error);
                    toast.error('Invalid token. Please log in again.');
                    setLoading(false);
                    return;
                }
            } else {
                toast.info('Please log in to view your profile.');
                setLoading(false);
                return;
            }
        }

        if (profileIdToFetch) {
            fetchUserProfile(profileIdToFetch);
        } else {
            setLoading(false);
        }
    }, [id]); // Re-fetch if ID in URL changes

    const handleProfileUpdated = (updatedUser) => {
        setUser(updatedUser);
    };

    // Callback to refresh posts after deletion
    const handlePostDeleted = () => {
        // Re-fetch only posts for the current profile
        fetchUserProfile(user._id);
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl bg-gray-50 min-h-screen">
            {loading ? (
                <div className="text-center mt-8 text-lg font-semibold text-gray-700">Loading profile...</div>
            ) : user ? (
                <>
                    {isEditing ? (
                        <EditProfile user={user} onProfileUpdated={handleProfileUpdated} onCancel={() => setIsEditing(false)} />
                    ) : (
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                                {isCurrentUserProfile && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-600 text-lg">{user.bio || 'No bio provided.'}</p>
                        </div>
                    )}

                    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posts by {user.name}</h2>
                        {posts.length > 0 ? (
                            <PostFeed posts={posts} currentUserId={currentUserId} onPostDeleted={handlePostDeleted} />
                        ) : (
                            <p className="text-gray-500">No posts available.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center mt-8 text-red-600 text-lg font-semibold">User not found or an error occurred.</div>
            )}
        </div>
    );
};

export default Profile;
