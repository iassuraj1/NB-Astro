import React, { useState, useEffect } from 'react';
import { homeAPI } from '../../services/api';
import { Trash2, Edit2, Plus, X, MoveUp, MoveDown, Star } from 'lucide-react';

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        rating: 5,
        text: '',
        service: '',
        image: '',
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const { data } = await homeAPI.getTestimonials();
            setTestimonials(data.data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            alert('Failed to fetch testimonials');
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
            if (editingTestimonial) {
                await homeAPI.updateTestimonial(editingTestimonial._id, formData);
                alert('Testimonial updated successfully');
            } else {
                // Set default order for new testimonial
                const postData = {
                    ...formData,
                    order: testimonials.length
                };
                await homeAPI.createTestimonial(postData);
                alert('Testimonial created successfully');
            }

            resetForm();
            fetchTestimonials();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await homeAPI.deleteTestimonial(id);
                alert('Testimonial deleted successfully');
                fetchTestimonials();
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Failed to delete testimonial');
            }
        }
    };

    const handleEdit = (item) => {
        setEditingTestimonial(item);
        setFormData({
            name: item.name || '',
            location: item.location || '',
            rating: item.rating || 5,
            text: item.text || '',
            service: item.service || '',
            image: item.image || '',
            order: item.order || 0,
            isActive: item.isActive !== undefined ? item.isActive : true
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingTestimonial(null);
        setFormData({
            name: '',
            location: '',
            rating: 5,
            text: '',
            service: '',
            image: '',
            order: 0,
            isActive: true
        });
        setShowModal(false);
    };

    const moveTestimonial = async (index, direction) => {
        const newOrder = [...testimonials];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        if (targetIndex < 0 || targetIndex >= testimonials.length) return;
        
        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        
        try {
            for (let i = 0; i < newOrder.length; i++) {
                // If it's a seeded mock testimonial, it might not have an _id in DB yet, but we will save to database as needed
                if (newOrder[i]._id) {
                    await homeAPI.updateTestimonial(newOrder[i]._id, { order: i });
                }
            }
            fetchTestimonials();
        } catch (error) {
            console.error('Error reordering testimonials:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Testimonials Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
                >
                    <Plus size={20} />
                    Add New Testimonial
                </button>
            </div>

            {loading && !testimonials.length ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3] mx-auto"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    {testimonials.map((item, index) => (
                        <div key={item._id || index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-[#00B7B3] transition">
                            <div className="flex justify-between items-start">
                                <div className="flex-1 flex gap-4">
                                    {item.image && (
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-12 h-12 rounded-full object-cover border border-gray-600 flex-shrink-0"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.name}&background=00B7B3&color=000&size=128`;
                                            }}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                                            {item.location && <span className="text-gray-400 text-xs">({item.location})</span>}
                                            <span className="text-[#00B7B3] text-xs px-2 py-0.5 bg-[#00B7B3]/10 border border-[#00B7B3]/20 rounded-md">
                                                {item.service || 'General'}
                                            </span>
                                            {!item.isActive && (
                                                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 border border-red-500/30 rounded-md">Inactive</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={14} 
                                                    className={i < (item.rating || 5) ? "fill-[#00B7B3] text-[#00B7B3]" : "text-gray-600"} 
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 text-sm italic">"{item.text}"</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => moveTestimonial(index, 'up')}
                                        disabled={index === 0}
                                        className="p-2 text-gray-400 hover:text-[#00B7B3] disabled:opacity-30 disabled:hover:text-gray-400"
                                        title="Move Up"
                                    >
                                        <MoveUp size={18} />
                                    </button>
                                    <button
                                        onClick={() => moveTestimonial(index, 'down')}
                                        disabled={index === testimonials.length - 1}
                                        className="p-2 text-gray-400 hover:text-[#00B7B3] disabled:opacity-30 disabled:hover:text-gray-400"
                                        title="Move Down"
                                    >
                                        <MoveDown size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-[#00B7B3] hover:text-white"
                                        title="Edit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        disabled={!item._id}
                                        className="p-2 text-red-500 hover:text-red-400 disabled:opacity-30"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-gray-800">
                            <h3 className="text-xl font-bold text-white">
                                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-[#00B7B3]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-[#00B7B3]"
                                        placeholder="e.g. Mumbai"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Service/Category</label>
                                    <input
                                        type="text"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-[#00B7B3]"
                                        placeholder="e.g. Vastu Consultation"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Rating</label>
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-[#00B7B3]"
                                    >
                                        <option value={5}>5 Stars</option>
                                        <option value={4}>4 Stars</option>
                                        <option value={3}>3 Stars</option>
                                        <option value={2}>2 Stars</option>
                                        <option value={1}>1 Star</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">User Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-[#00B7B3]"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Review/Testimonial Text *</label>
                                <textarea
                                    name="text"
                                    value={formData.text}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-[#00B7B3] resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 rounded border-gray-700 text-[#00B7B3] focus:ring-[#00B7B3]"
                                />
                                <label htmlFor="isActive" className="text-gray-400 text-sm">Active (visible on website)</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2.5 bg-[#00B7B3] text-black font-semibold rounded-lg hover:bg-[#33C5C2] transition disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialsManager;
