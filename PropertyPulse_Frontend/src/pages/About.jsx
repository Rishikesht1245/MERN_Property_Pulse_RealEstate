const About = () => {
  return (
    <div className="p-20 max-w-7xl max-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        About PropertyPulse
      </h1>
      <p className="mb-6 text-slate-700 text-sm font-semibold">
        Property Pulse is your ultimate real estate companion, designed to
        simplify the process of buying, selling, or investing in properties.
        Whether you're a first-time homebuyer, an experienced real estate
        investor, or a homeowner looking to sell, our platform offers a wide
        range of tools and resources to meet your needs.
      </p>
      <h1 className="text-xl font-bold mb-4 text-slate-800">
        Why choose PropertyPulse ?
      </h1>
      <p className="mb-4 text-slate-700 text-sm font-semibold">
        Property Pulse is not just a real estate platform; it's a partner in
        your real estate journey. With our user-centric approach, vast property
        database, and expert support, we empower you to make confident decisions
        when it comes to buying, selling, or investing in properties. Join our
        community of satisfied users and experience the future of real estate
        today.
      </p>
      <h1 className="text-xl font-bold mb-4 text-slate-800">Features</h1>
      <ul className="flex flex-col gap-5  text-slate-700 text-sm  font-semibold">
        <li>
          <span className="font-bold">Property Search:</span> Explore a vast
          database of properties, from cozy apartments to spacious family homes
          and commercial spaces. Our advanced search filters make it easy to
          find properties that match your preferences.
        </li>
        <li>
          <span className="font-bold">Detailed Listings: </span>Get
          comprehensive property listings with high-quality images, property
          details, neighborhood information, and interactive maps.
        </li>
        <li>
          <span className="font-bold">User-Friendly Interface:</span> Our
          intuitive and user-friendly interface ensures a smooth and hassle-free
          experience for users of all levels of expertise.
        </li>
        <li>
          <span className="font-bold">Expert Guidance:</span> Connect with
          experienced real estate professionals who can provide guidance, answer
          questions, and assist you throughout your real estate journey.
        </li>
      </ul>
      <p className="mt-10 text-sm text-center font-semibold text-slate-800 uppercase">
        &copy; {new Date().getFullYear()} PropertyPulse. All Rights Reserved.
      </p>
      <p className="my-5 text-sm text-center font-semibold text-slate-600 uppercase">
        Made by{" "}
        <a href="https://rishikeshportfolio1245.netlify.app/">Rishikesh T</a>
      </p>
    </div>
  );
};
export default About;
