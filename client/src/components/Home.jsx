import React from "react";
import { Link } from "react-router-dom";
import '../CSS/Home.css' 


const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>One Monthly Payment for Every Streaming Service</h1>
        <p>
          SubCycle is here to simplify your life by revolutionizing the way you
          manage your online streaming subscriptions. Say goodbye to missed
          payments, late fees, and budgeting headaches. With SubCycle, you can
          take control of your subscriptions and your finances like never
          before.
        </p>
        <h2>Features:</h2>
        <ul>
          <li>
            Streamlined Subscription Management: Easily view, add, edit, and
            cancel your streaming subscriptions from one convenient dashboard.
          </li>
          <li>
            Effortless Budgeting: Fund your escrow account once a month and let
            SubCycle handle the rest. Say hello to stress-free budgeting and
            goodbye to unexpected subscription charges.
          </li>
          <li>
            Automatic Payment Dispersal: SubCycle ensures that your subscription
            payments are dispersed on their true due dates, so you never miss a
            payment again.
          </li>
          <li>
            Secure and Reliable: Rest assured that your financial information is
            safe with SubCycle's robust security measures and reliable payment
            processing.
          </li>
        </ul>
        <h2>How It Works:</h2>
        <ol>
          <li>Sign Up: Create your SubCycle account in minutes.</li>
          <li>
            Add Subscriptions: Easily add your streaming subscriptions to
            SubCycle.
          </li>
          <li>
            Fund Your Escrow: Set up automatic funding for your escrow account
            once a month.
          </li>
          <li>
            Sit Back and Relax: Let SubCycle handle the rest. Enjoy hassle-free
            subscription management and budgeting!
          </li>
        </ol>
        <p className="cta">
          Get Started Today! Take the first step towards a stress-free
          subscription experience. Sign up for SubCycle now and start enjoying
          the benefits of effortless subscription management and budgeting.
        </p>
        <div className="button-container">
          <Link to="/signup">
            <button className="primary">Sign Up Now</button>
          </Link>
          <Link to="/subscriptions">
            <button className="secondary">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
