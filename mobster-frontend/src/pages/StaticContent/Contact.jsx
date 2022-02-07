import React, { useState } from "react";
import "./StaticContent-styles.css"; 
import emailjs from 'emailjs-com';
import{ init } from '@emailjs/browser';
init("user_nTOKwW2tx2msKjYI9fVvH");
// import { init } from 'emailjs-com';
// init('user_nTOKwW2tx2msKjYI9fVvH');


export const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const submit = () => {
        if (name && email && message) {
            const serviceId = 'service_3cew55j';
            const templateId = 'template_6v2roq9';
            const userId = 'user_nTOKwW2tx2msKjYI9fVvH';
            const templateParams = {
                name,
                email,
                message
            };

            emailjs.send(serviceId, templateId, templateParams, userId)
                .then(response => console.log(response))
                .then(error => console.log(error));
    
            setName('');
            setEmail('');
            setMessage('');
            setEmailSent(true);
        } else {
            alert('Please fill in all fields silly you.');
        }
    }

  return (
    <div className="contact-container">
      <h1>Contact or Report</h1>
      <h6>Contact us or report member or post.</h6>
      <h6>For report we need username and what post it's regarding</h6>
      <div className="contact-form">
            <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submit}>Send Message</button>
            {emailSent && (<span>Thank you for your message, we will be in touch in no time!</span>)}
        </div>
    </div>
  );
};

export default Contact;
