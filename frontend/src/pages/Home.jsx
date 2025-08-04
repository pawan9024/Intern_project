
import React, { useState, useEffect } from 'react';
import PostFeed from '../components/Feed/PostFeed';
import CreatePost from '../components/Feed/CreatePost';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null); // New state for current user ID

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUserProfile = async (userId, token) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCurrentUser(response.data.user);
        } catch (error) {
            console.error('Error fetching current user profile:', error);
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        fetchPosts();

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) { // Check if token is not expired
                    setCurrentUserId(decoded.id); // Set current user ID
                    fetchCurrentUserProfile(decoded.id, token);
                } else {
                    localStorage.removeItem('token'); // Clear expired token
                    setCurrentUserId(null);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
                setCurrentUserId(null);
            }
        }
    }, []);

    const handlePostCreated = () => {
        fetchPosts();
    };

    // Callback to refresh posts after deletion
    const handlePostDeleted = () => {
        fetchPosts();
    };

    return (
        <div className="bg-gray-800 min-h-screen">
            
            <div className="container mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
                {/* Left Sidebar */}
                <aside className="hidden md:block md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                        {currentUser ? (
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-blue-200 rounded-full mb-4 flex items-center justify-center text-blue-800 text-3xl font-bold">
                                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <h2 className="font-semibold text-lg text-gray-800">{currentUser.name || 'User'}</h2>
                                <p className="text-gray-500 text-sm text-center">{currentUser.bio || 'No bio provided.'}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <p>Log in to see your profile summary here.</p>
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-4">Suggestions</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-600">Connect with others!</li>
                            <li className="text-sm text-gray-600">Explore new profiles.</li>
                        </ul>
                    </div>
                </aside>

                {/* Feed */}
                <main className="w-full md:w-2/4">
                    {currentUser && <CreatePost onPostCreated={handlePostCreated} />}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h1 className="text-2xl font-bold mb-6 text-blue-700">Home Feed</h1>
                        {loading ? (
                            <p className="text-center text-gray-500">Loading posts...</p>
                        ) : posts.length > 0 ? (
                            <PostFeed posts={posts} currentUserId={currentUserId} onPostDeleted={handlePostDeleted} />
                        ) : (
                            <p className="text-center text-gray-500">No posts available yet. Be the first to post!</p>
                        )}
                    </div>
                </main>

                
            </div>
        </div>
    );
};

export default Home;
