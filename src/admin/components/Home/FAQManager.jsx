// admin/components/FAQManager.jsx
import React, { useState, useEffect } from 'react';
import { faqAPI } from '../../services/api';
import { Trash2, Edit2, Plus, X, MoveUp, MoveDown } from 'lucide-react';

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const { data } = await faqAPI.getFAQs();
            setFaqs(data.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            alert('Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingFAQ) {
                await faqAPI.updateFAQ(editingFAQ._id, formData);
                alert('FAQ updated successfully');
            } else {
                await faqAPI.createFAQ(formData);
                alert('FAQ created successfully');
            }

            resetForm();
            fetchFAQs();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            alert('Failed to save FAQ');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await faqAPI.deleteFAQ(id);
                alert('FAQ deleted successfully');
                fetchFAQs();
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                alert('Failed to delete FAQ');
            }
        }
    };

    const handleEdit = (faq) => {
        setEditingFAQ(faq);
        setFormData({
            question: faq.question || '',
            answer: faq.answer || '',
            order: faq.order || 0,
            isActive: faq.isActive !== undefined ? faq.isActive : true
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingFAQ(null);
        setFormData({
            question: '',
            answer: '',
            order: 0,
            isActive: true
        });
        setShowModal(false);
    };

    const moveFAQ = async (index, direction) => {
        const newOrder = [...faqs];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (targetIndex < 0 || targetIndex >= faqs.length) return;
        
        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        
        try {
            for (let i = 0; i < newOrder.length; i++) {
                await faqAPI.updateFAQ(newOrder[i]._id, { order: i });
            }
            fetchFAQs();
        } catch (error) {
            console.error('Error reordering FAQs:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">FAQ Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
                >
                    <Plus size={20} />
                    Add New FAQ
                </button>
            </div>

            {loading && !faqs.length ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3] mx-auto"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div key={faq._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-[#00B7B3] transition">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-white font-semibold">{faq.question}</h3>
                                        {!faq.isActive && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Inactive</span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(faq)}
                                        className="text-[#00B7B3] hover:text-[#33C5C2] p-1"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq._id)}
                                        className="text-red-500 hover:text-red-400 p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    {index > 0 && (
                                        <button
                                            onClick={() => moveFAQ(index, 'up')}
                                            className="text-gray-400 hover:text-white p-1"
                                        >
                                            ↑
                                        </button>
                                    )}
                                    {index < faqs.length - 1 && (
                                        <button
                                            onClick={() => moveFAQ(index, 'down')}
                                            className="text-gray-400 hover:text-white p-1"
                                        >
                                            ↓
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl max-w-lg w-full">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">
                                {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                            </h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Question</label>
                                <input
                                    type="text"
                                    name="question"
                                    value={formData.question}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Answer</label>
                                <textarea
                                    name="answer"
                                    value={formData.answer}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#00B7B3]"
                                />
                                <label className="text-gray-300">Active</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] transition disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (editingFAQ ? 'Update' : 'Create')}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQManager;