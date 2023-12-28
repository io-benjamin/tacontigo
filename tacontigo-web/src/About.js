import React from 'react';

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are XYZ, a company that does ABC. We are based in City, Country.</p>

      <h2>Contact Us</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default About;