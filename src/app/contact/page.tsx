'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setSubmitted(true)
        toast.success('Message sent successfully!')
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-20">
                <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-5xl font-extrabold mb-6">Get In Touch</h1>
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                Have questions about our AI models or institutional pricing? Our expert team is here to help.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                    <p className="text-lg text-gray-600 mb-10">
                                        Connect with us through any of these channels. We typically respond within 2-4 business hours.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { icon: Mail, title: 'Email Us', info: 'support@stocksagepro.com', color: 'bg-blue-100 text-blue-600' },
                                        { icon: Phone, title: 'Call Support', info: '+91 92580 39923', color: 'bg-purple-100 text-purple-600' },
                                        { icon: MapPin, title: 'Global HQ', info: 'Tech Park, Bangalore, India', color: 'bg-teal-100 text-teal-600' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${item.color}`}>
                                                <item.icon size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">{item.title}</h4>
                                                <p className="text-xl font-bold text-gray-900">{item.info}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="text-green-600" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                        <p className="text-gray-600">We will get back to you shortly.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="mt-8 text-blue-600 font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Full Name</label>
                                                <input required type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                                <input required type="email" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Subject</label>
                                            <input required type="text" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="How can we help?" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Message</label>
                                            <textarea required rows={5} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Your message here..."></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
