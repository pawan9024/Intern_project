
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PostFeed = ({ posts, currentUserId, onPostDeleted }) => {
    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Authentication required to delete a post.');
                    return;
                }

                await axios.delete(
                    `${process.env.REACT_APP_API_URL}/posts/${postId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success('Post deleted successfully!');
                onPostDeleted(); // Callback to refresh posts in parent component
            } catch (error) {
                console.error('Error deleting post:', error);
                toast.error('Failed to delete post. You might not have permission.');
            }
        }
    };

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post._id} className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-white transition duration-300 ease-in-out">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-blue-600 hover:underline">
                            <Link to={`/profile/${post.author._id}`}>{post.author.name}</Link>
                        </h3>
                        {currentUserId === post.author._id && (
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <p className="text-gray-700 mt-2">{post.content}</p>
                    <p className="text-gray-500 text-sm mt-2">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default PostFeed;
