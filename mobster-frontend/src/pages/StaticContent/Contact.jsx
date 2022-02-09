import React, { useState } from "react";
import "./StaticContent-styles.css";
import emailjs from "emailjs-com";
import { init } from "@emailjs/browser";
init("user_nTOKwW2tx2msKjYI9fVvH");
// import { init } from 'emailjs-com';
// init('user_nTOKwW2tx2msKjYI9fVvH');

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const submit = () => {
    if (name && email && message) {
      const serviceId = "service_3cew55j";
      const templateId = "template_6v2roq9";
      const userId = "user_nTOKwW2tx2msKjYI9fVvH";
      const templateParams = {
        name,
        email,
        message,
      };

      emailjs
        .send(serviceId, templateId, templateParams, userId)
        .then((response) => console.log(response))
        .then((error) => console.log(error));

      setName("");
      setEmail("");
      setMessage("");
      setEmailSent(true);

      //show response for 5s
      setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    } else {
      alert("Please fill in all fields silly you.");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact us</h1>
      <h6>If you need the Mobster Family's support or protection</h6>
      <div className="contact-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button onClick={submit}><p>Send Message</p></button>
        {emailSent && (
          <span>
            Thank you for your message, we will be in touch in no time!
          </span>
        )}
      </div>
    </div>
  );
};

export default Contact;
