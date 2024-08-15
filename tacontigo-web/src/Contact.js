import React, { useRef, useState } from 'react';
import './Contact.css';
import Footer from './footer.js';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const formData = new FormData(form.current);
        const name = formData.get('user_name');
        const contact = formData.get('user_email');
        const date = formData.get('date');
        const summary = formData.get('message');
    
        let tempErrors = {};
        tempErrors.name = name ? "" : "This field is required.";
        tempErrors.contact = contact ? "" : "This field is required.";
        tempErrors.summary = summary ? "" : "This field is required.";
        
        // Check if date is present and in the future
        if (!date) {
            tempErrors.date = "This field is required.";
        } else if (new Date(date) < new Date()) {
            tempErrors.date = "The date must be in the present or future.";
        } else {
            tempErrors.date = "";
        }
    
        setErrors(tempErrors);
    
        return Object.values(tempErrors).every(x => x === "");
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (validate()) {
            // Log form data for debugging
            const formData = new FormData(form.current);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            emailjs
                .sendForm('service_dnufntp', 'template_sddzfqe', form.current, 'QKjYAq80Vh72D6SD7')
                .then(
                    () => {
                        console.log('SUCCESS!');
                        setIsSubmitted(true);
                        e.target.reset(); // Clear the form
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    }
                );
        }
    };

    return (
        <div className="parent-container">
            <div className="content">
                <div className="faq">
                    <h1>FAQ</h1>
                    <div className="faq-item">
                        <h2>What is the minimum order for catering?</h2>
                        <p>The minimum order for catering is 20 people.</p>
                    </div>
                    <div className="faq-item">
                        <h2>How far in advance do I need to inquire about an event?</h2>
                        <p>We recommend placing your order at least three weeks in advance to ensure availability.</p>
                    </div>
                    <div className="faq-item">
                        <h2>For any other questions please don't hesitate to reach out.</h2>
                    </div>
                </div>
            </div>
            <div className="contact-form">
                <h2>Contact Us</h2>
                {isSubmitted && <div className="success-message">Form submitted successfully! We'll reach out to you as quickly as we can!</div>}
                <form ref={form} onSubmit={sendEmail}>
                    <div className="form-group">
                        <label htmlFor="user_name">Name:</label>
                        <input type="text" id="user_name" name="user_name" />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_email">Contact (Email):</label>
                        <input type="email" id="user_email" name="user_email" />
                        {errors.contact && <div className="error">{errors.contact}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date for Event:</label>
                        <input type="date" id="date" name="date" />
                        {errors.date && <div className="error">{errors.date}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Summary (include expected # of people):</label>
                        <textarea id="message" name="message"></textarea>
                        {errors.summary && <div className="error">{errors.summary}</div>}
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
