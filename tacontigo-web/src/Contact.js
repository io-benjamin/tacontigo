import React, { useState } from 'react';
import './Contact.css';
import Footer from './footer.js';
import emailjs from '@emailjs/browser';


function Contact() {
    const [form, setForm] = useState({ name: '', contact: '', date: '', summary: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setisSubmitted] = useState(false);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = form.name ? "" : "This field is required.";
        tempErrors.contact = form.contact ? "" : "This field is required.";
        tempErrors.date = form.date ? "" : "This field is required.";
        tempErrors.summary = form.summary ? "" : "This field is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    }

    emailjs.init("QKjYAq80Vh72D6SD7");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            emailjs.send("service_dnufntp", "template_sddzfqe", form) 
            .then(function(response){
                console.log("SUCCESS!", response.status, response.text);
                setForm({name: '', contact: '', date: '', summary: ''});
                setisSubmitted(true);
            }, function(error){
                console.log("FAILED...", error);
            });
            console.log(form);
            setForm({ name: '', contact: '', date: '', summary: '' }); 
            setisSubmitted(true);
        }
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

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
          <h2>How far in advance do I need to inquiry about an event?</h2>
          <p>We recommend placing your order at least three weeks in advance to ensure availability.</p>
            </div>
        <div className="faq-item">
            <h2>For any other questions please don't hesitate to reach out.</h2>
        </div>
        </div>
    </div>
        <div className="contact-form">
            <h2>Contact Us</h2>
            {isSubmitted && <div className="success-message">Form submitted successfully! We'll reach out to you as quick as we can!</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact (Email or Phone):</label>
                    <input type="text" id="contact" name="contact" value={form.contact} onChange={handleChange} />
                    {errors.contact && <div className="error">{errors.contact}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date for Event:</label>
                    <input type="date" id="date" name="date" value={form.date} onChange={handleChange} />
                    {errors.date && <div className="error">{errors.date}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary:</label>
                    <textarea id="summary" name="summary" value={form.summary} onChange={handleChange}></textarea>
                    {errors.summary && <div className="error">{errors.summary}</div>}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
        <Footer />
    </div>
    );
}

export default Contact;