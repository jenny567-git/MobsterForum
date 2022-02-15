import React from 'react';
import './StaticContent-styles.css';

export const FAQ = () => {
  return <div className="flex-space">
      <div className="faq-container">
          <h1 className='faq-heading'>Frequently asked questions...</h1>
          
          <details>
              <summary className='faq-question'>Is this forum legal?</summary>
              <p className='faq-answer'>Don't worry about it, capeesh?</p>
          </details>

          <details>
              <summary className='faq-question'>How does a crook like me get involved?</summary>
              <p className='faq-answer'>Register a user, get invited to a few families, and start posting. </p>
          </details>

          <details>
              <summary className='faq-question'>Will you rat me out?</summary>
              <p className='faq-answer'>Fuhgeddaboutit! Snitches get stitches! </p>
          </details>

          <details>
              <summary className='faq-question'>Why can't I post anything, boss?!</summary>
              <p className='faq-answer'>You probably got banned. Start behaving a bit more respectfully toward your family members and we'll see. </p>
          </details>

          <details>
              <summary className='faq-question'>Can I take over a family if the boss is in the clink?</summary>
              <p className='faq-answer'>If you have their blessing, sure! Just tell 'em to get their lawyer to transfer leadership to you.</p>
          </details>

          <details>
              <summary className='faq-question'>What are the rules for us mobsters?</summary>
              <ul className='faq-answer'>
                <li>Don't be douchebag</li>
                <li>Choose your language carefully - if the fuzz comes a-knockin we don't know you</li>
                <li>Don't be stingy - share your knowledge!</li>
                <li>Don't ever start a thread called "I heard you paint houses" or something similar</li>
              </ul>
          </details>
          
      </div>
  </div>;
};
