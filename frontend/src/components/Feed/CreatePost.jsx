import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to create a post.');
                setLoading(false);
                return;
            }

            await axios.post(
                `${process.env.REACT_APP_API_URL}/posts`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setContent('');
            toast.success('Post created successfully!');
            onPostCreated();
        } catch (err) {
            console.error('Error creating post:', err);
            toast.error('Failed to create post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Create a new post</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white rounded-lg py-3 font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
                    disabled={loading}
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;