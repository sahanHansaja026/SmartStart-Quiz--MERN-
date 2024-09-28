// src/components/PrivacyPolicy.js
import React from 'react';
import '../css/privacy.css'; // Make sure you create this CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy for SmartStart Quiz</h1>
      <p><strong>Effective Date: 28/09/2024</strong></p>
      
      <p>
        At SmartStart Quiz, we are committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information that we receive from users of our website and services.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>a. Personal Information</h3>
      <ul>
        <li><strong>Name:</strong> To personalize your experience and for account creation.</li>
        <li><strong>Email Address:</strong> To send you confirmation emails, updates, and promotional materials.</li>
      </ul>

      <h3>b. Non-Personal Information</h3>
      <ul>
        <li><strong>Usage Data:</strong> We collect information on how the service is accessed and used, such as your IP address, browser type, and page views.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We may use cookies and similar tracking technologies to monitor activity on our service and store certain information.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        SmartStart Quiz uses the collected data for various purposes:
      </p>
      <ul>
        <li>To provide and maintain our service.</li>
        <li>To notify you about changes to our service.</li>
        <li>To allow you to participate in interactive features of our service when you choose to do so.</li>
        <li>To provide customer support.</li>
        <li>To gather analysis or valuable information so that we can improve the service.</li>
        <li>To monitor the usage of the service.</li>
        <li>To detect, prevent, and address technical issues.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>
        We do not share your personal information with third parties without your consent, except as required by law or to protect our rights.
      </p>

      <h2>4. Security of Your Information</h2>
      <p>
        The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
      </p>

      <h2>5. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul>
        <li>Email: support@smartstartquiz.com</li>
        <li>Phone: +94 71 77 35 442</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
